import {
  emitirExcluirDocumento,
  emitirRemoverUsuario,
  emitirTextoEditor,
  selecionarDocumento,
} from './socket-front-documento.js';

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get('nome');

const textoEditor = document.getElementById('editor-texto');
const tituloDocumento = document.getElementById('titulo-documento');
const botaoExcluir = document.getElementById('excluir-documento');
const botaoVoltar = document.getElementById('botao-voltar');
const containerUsuarios = document.getElementById('usuarios-conectados'); 

tituloDocumento.textContent = nomeDocumento || 'Documento sem título';

function onAuthSuccess(payload) {
  selecionarDocumento({
    nomeDocumento,
    user: payload.user
  });
}

function voltarPaginaAnterior() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '/';
  }
}

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} excluído!`);
    voltarPaginaAnterior()
  }
}

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

function atualizarListaUsuarios(listaDeUsuarios) {
  containerUsuarios.innerHTML = ''; 
  
  listaDeUsuarios.forEach(usuario => {
    const item = document.createElement('li');
    item.classList.add('list-group-item'); 
    item.textContent = usuario.user; 
    
    containerUsuarios.appendChild(item);
  });
}

textoEditor.addEventListener('keyup', () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento,
  });
});

botaoExcluir.addEventListener('click', () => {
  emitirExcluirDocumento(nomeDocumento);
});

botaoVoltar.addEventListener('click', (event) => {
  event.preventDefault()
  emitirRemoverUsuario(nomeDocumento);
  setTimeout(() => {
    voltarPaginaAnterior(); 
  }, 50);
})

export { atualizaTextoEditor, alertarERedirecionar, onAuthSuccess, atualizarListaUsuarios };
