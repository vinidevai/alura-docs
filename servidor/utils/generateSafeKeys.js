import { randomBytes, scryptSync } from 'crypto'

function generateSafeKeys(password) {
  const salPassword = randomBytes(16).toString('hex');
  const hashPassword = scryptSync(password, salPassword, 64).toString('hex');

  return { salPassword, hashPassword };
}

export default generateSafeKeys;