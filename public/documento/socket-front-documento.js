import { getCookie } from '../utils/cookies.js';
import { alertarERedirecionar, atualizarListaUsuarios, atualizaTextoEditor, onAuthSuccess } from './documento.js';

const socket = io('http://localhost:3000/usuarios', {
  auth: {
    token: getCookie('jwtToken')
  }
});

socket.on('authorization:true', onAuthSuccess)

socket.on('connect_error', (error) => {
  alert(error);
  window.location.href = '/login/index.html';
})

function selecionarDocumento(inputData) {
  socket.emit('selecionar_documento', inputData, (texto) => {
    atualizaTextoEditor(texto); 
  });
}

function emitirTextoEditor(dados) {
  socket.emit('texto_editor', dados);
}

socket.on('texto_editor_clientes', (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(docName) {
  socket.emit('excluir_documento', docName);
}

function emitirRemoverUsuario(docName) {
  socket.emit('doc:user:remove', docName)
}

socket.on('excluir_documento_sucesso', (nome) => {
  alertarERedirecionar(nome);
});

socket.on('usuarios_documento_atualizado', (listaDeNomes) => {
    atualizarListaUsuarios(listaDeNomes);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento, emitirRemoverUsuario };
