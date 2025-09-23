import { findUser } from "../db/usuariosDb.js";
import authUser from "../utils/authUser.js";
import generateJwt from "../utils/generateJwt.js";

function eventosLoginPage(socket, io) {
  socket.on('user:authentication', async ({ user, password }) => {
    const usuario = await findUser(user);

    if(usuario) {
      const autenticado = authUser(password, usuario);
      if (autenticado) {
        const jwtToken = generateJwt({ user: user });   
        socket.emit('authentication:true', jwtToken)
      } else {
        socket.emit('authentication:error')
      }
    } else {
      socket.emit('authentication:false')
    }
  })  
}

export default eventosLoginPage;