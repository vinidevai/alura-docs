import jwt from 'jsonwebtoken';

function authUser(socket, next) {
  const jwtToken = socket.handshake.auth.token;
  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    socket.userId = payload.user;
    
    socket.emit('authorization:true', payload)
    next()
  } catch (error) {
    next(error);
  }
}

export default authUser;