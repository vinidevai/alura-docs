import {
  atualizaTextoDocumento,
  encontrarDocumento,
  excluirDocumento,
  addUsuarioDocumento,
  removeUsuarioDocumento,
  getUsuariosEmDocumento
} from '../db/documentosDb.js';
import { findUser, getDetalhesUsuarios } from '../db/usuariosDb.js';

async function emitirAtualizacaoUsuarios(io, docName) {
    const documento = await getUsuariosEmDocumento(docName); 
    const listaDeIds = documento?.usuarios || []; 
    const listaDeNomes = await getDetalhesUsuarios(listaDeIds);

    io.to(docName).emit('usuarios_documento_atualizado', listaDeNomes); 
}

function eventosDocsPage(socket, io) {
  socket.on('selecionar_documento', async ({nomeDocumento, user}, devolverTexto) => {
    socket.documentoAtual = nomeDocumento
    socket.online = true;
    const usuario = await findUser(user)
    const userId = usuario._id
    
    const documento = await encontrarDocumento(nomeDocumento);

    if (documento) {
      socket.join(nomeDocumento);
      await devolverTexto(documento.texto);
      await addUsuarioDocumento(nomeDocumento, userId)
      await emitirAtualizacaoUsuarios(io, nomeDocumento)
    }
  });

  socket.on('doc:user:remove', async (docName) => {
    const username = socket.userId;
    const usuario = await findUser(username)
    const userId = usuario._id
    
    if (docName && userId) {
      if (io.sockets.adapter && io.sockets.adapter.rooms) {
        const socketsNaSala = io.sockets.adapter.rooms.get(docName);
        let usuarioAindaPresente = false;
        
        if (socketsNaSala) {
          for (const socketId of socketsNaSala) {
            const socketAtual = io.sockets.sockets.get(socketId);
            
            if (socketAtual && socketAtual.userId === socket.userId && socketAtual.id !== socket.id) {
              usuarioAindaPresente = true;
              break;
            }
          }
        }
        if (!usuarioAindaPresente) {
          await removeUsuarioDocumento(docName, userId);
          await emitirAtualizacaoUsuarios(io, docName);
        }
      }
      socket.leave(docName);
    }
  });

  socket.on('disconnecting', async () => {
    const docName = socket.documentoAtual;
    const username = socket.userId;

    if (docName && username) {
      const usuario = await findUser(username);

      if (usuario) {
        const userId = usuario._id;
        
        if (io.sockets.adapter && io.sockets.adapter.rooms) {
          const socketsNaSala = io.sockets.adapter.rooms.get(docName);
          let usuarioAindaPresente = false;
          
          if (socketsNaSala) {
            for (const socketId of socketsNaSala) {
              const socketAtual = io.sockets.sockets.get(socketId);
              
              if (socketAtual && socketAtual.userId === socket.userId && socketAtual.id !== socket.id) {
                usuarioAindaPresente = true;
                break;
              }
            }
          }
          if (!usuarioAindaPresente) {
            await removeUsuarioDocumento(docName, userId);
            await emitirAtualizacaoUsuarios(io, docName);
          }
        }
      }
    }
  });

  socket.on('texto_editor', async ({ texto, nomeDocumento }) => {
    const atualizacao = await atualizaTextoDocumento(nomeDocumento, texto);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit('texto_editor_clientes', texto);
    }
  });

  socket.on('excluir_documento', async (nome) => {
    const resultado = await excluirDocumento(nome);

    if (resultado.deletedCount) {
      io.emit('excluir_documento_sucesso', nome);
    }
  });
}

export default eventosDocsPage;
