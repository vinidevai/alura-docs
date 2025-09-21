import { scryptSync, timingSafeEqual } from 'crypto'

function authUser(password, usuario) {
  const testHash = scryptSync(password, usuario.salPassword, 64);
  const realHash = Buffer.from(usuario.hashPassword, 'hex');

  const autenticado = timingSafeEqual(testHash, realHash);
  return autenticado
}

export default authUser;