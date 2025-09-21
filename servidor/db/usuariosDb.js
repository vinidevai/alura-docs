import generateSafeKeys from "../utils/generateSafeKeys.js";
import { ususariosColecao } from "./dbConnect.js";

function findUser(name) {
  return ususariosColecao.findOne({ user: name });
}

function registerUser({ user, password}) {
  const { hashPassword, salPassword } = generateSafeKeys(password);
  return ususariosColecao.insertOne({
    user: user,
    hashPassword,
    salPassword
  })
}

export { registerUser, findUser };