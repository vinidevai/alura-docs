import jwt from 'jsonwebtoken';

function generateJwt(payload) {
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '3 days'
  })
  return jwtToken;
}

export default generateJwt;