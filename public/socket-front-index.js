import { inserirLinkDocumento, removerLinkDocumento } from './index.js';
import { getCookie } from './utils/cookies.js';

const socket = io('http://localhost:3000/usuarios', {
  auth: {
    token: getCookie('jwtToken')
  }
});

socket.on('connect_error', (error) => {
  alert(error);
  window.location.href = '/login/index.html';
})

socket.emit('obter_documentos', (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nome) {
  socket.emit('adicionar_documento', nome);
}

socket.on('adicionar_documento_interface', (nome) => {
  inserirLinkDocumento(nome);
});

socket.on('documento_existente', (nome) => {
  alert(`O documento ${nome} já existe!`);
});

socket.on('excluir_documento_sucesso', (nome) => {
  removerLinkDocumento(nome);
});

export { emitirAdicionarDocumento };
