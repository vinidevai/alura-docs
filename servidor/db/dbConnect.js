import { MongoClient } from 'mongodb';
import 'dotenv/config'

const cliente = new MongoClient(process.env.MONGODB_TOKEN);

let documentosColecao, ususariosColecao;

try {
  await cliente.connect();

  const db = cliente.db('alura-websockets');
  documentosColecao = db.collection('documents');
  ususariosColecao = db.collection('users')

  console.log('Conectado ao banco de dados com sucesso!');
} catch (erro) {
  console.log(erro);
}

export { documentosColecao, ususariosColecao };
