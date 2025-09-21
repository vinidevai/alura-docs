import { findUser, registerUser } from "../db/usuariosDb.js";

function eventosRegisterPage(socket, io) {
  socket.on('user:register', async (userData) => {
    const user = await findUser(userData.user);
    
    if (user === null) {
      const newUser = await registerUser(userData)
      if (newUser.acknowledged) {
        socket.emit('register:true')
      } else {
        socket.emit('register:error')
      } 
    } else {
      socket.emit('register:false')
    }
  })  
}

export default eventosRegisterPage;