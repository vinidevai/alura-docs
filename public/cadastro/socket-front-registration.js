const socket = io('http://localhost:3000/');

function emitRegistrationUser(userData) {
  socket.emit('user:register', userData);
}

socket.on('register:true', () => {
  alert(`Usuario cadastrado com sucesso!`)
})

socket.on('register:error', () => {
  alert(`Erro no cadastro!`)
})

socket.on('register:false', () => {
  alert(`Usuario ja existe!`)
})

export { emitRegistrationUser };