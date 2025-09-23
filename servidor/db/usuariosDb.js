import generateSafeKeys from "../utils/generateSafeKeys.js";
import { ususariosColecao } from "./dbConnect.js";
import { ObjectId } from 'mongodb';

function findUser(name) {
  return ususariosColecao.findOne({ user: name });
}

function findUserById(userId) {
  const id = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;
  return ususariosColecao.findOne({ _id: id })
}

async function getDetalhesUsuarios(listaDeIds) {
  const listaDeObjectIds = listaDeIds.map(id => {
    return new ObjectId(id);
  });
  const usuarios = await ususariosColecao.find(
    { _id: { $in: listaDeObjectIds } },
    { projection: { _id: 0, user: 1 } }
  ).toArray();

  return usuarios;
}

function registerUser({ user, password}) {
  const { hashPassword, salPassword } = generateSafeKeys(password);
  return ususariosColecao.insertOne({
    user: user,
    hashPassword,
    salPassword
  })
}

export { registerUser, findUser, findUserById, getDetalhesUsuarios };