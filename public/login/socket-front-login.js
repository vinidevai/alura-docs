import { setCookie } from "../utils/cookies.js";

const socket = io('http://localhost:3000/');

function emitAuthUser(userData) {
  socket.emit('user:authentication', userData);
}

socket.on('authentication:true', (jwtToken) => {
  setCookie('jwtToken', jwtToken);
  alert(`Usuario autenticado com sucesso!`)
  window.location.href = '/';
})

socket.on('authentication:error', () => {
  alert(`Erro de autenticacao!`)
})

socket.on('authentication:false', () => {
  alert(`Usuario nao encontrado!`)
})

export { emitAuthUser };