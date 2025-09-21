const socket = io('http://localhost:3000/');

function emitAuthUser(userData) {
  socket.emit('user:auth', userData);
}

socket.on('auth:true', () => {
  alert(`Usuario autenticado com sucesso!`)
  window.location.href = '/';
})

socket.on('auth:error', () => {
  alert(`Erro de autenticacao!`)
})

socket.on('auth:false', () => {
  alert(`Usuario nao encontrado!`)
})

export { emitAuthUser };