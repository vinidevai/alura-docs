import { ObjectID, ObjectId } from 'mongodb';
import { documentosColecao } from './dbConnect.js';

function obterDocumentos() {
  const documentos = documentosColecao.find().toArray();
  return documentos;
}

function adicionarDocumento(nome) {
  const resultado = documentosColecao.insertOne({
    nome,
    texto: '',
  });

  return resultado;
}

function encontrarDocumento(nome) {
  const documento = documentosColecao.findOne({
    nome,
  });

  return documento;
}

function atualizaTextoDocumento(nome, texto) {
  const atualizacao = documentosColecao.updateOne(
    {
      nome,
    },
    {
      $set: {
        texto,
      },
    }
  );

  return atualizacao;
}

function addUsuarioDocumento(nome, userId) {
  const atualizacao = documentosColecao.updateOne(
    {
      nome,
    },
    {
      $addToSet: {
            usuarios: userId
        },
    }
  );
  return atualizacao;
}

async function removeUsuarioDocumento(nome, userId) {
  const atualizacao = documentosColecao.updateOne(
    {
      nome,
    },
    {
      $pull: {
        usuarios: new ObjectId(userId)
      },
    }
  );
  return atualizacao;
}

function getUsuariosEmDocumento(docName) {
  const busca = documentosColecao.findOne(
    { nome: docName },
    { projection: { usuarios: 1, _id: 0 } } 
  );
  return busca; 
}

function excluirDocumento(nome) {
  const resultado = documentosColecao.deleteOne({
    nome,
  });

  return resultado;
}

export {
  encontrarDocumento,
  atualizaTextoDocumento,
  removeUsuarioDocumento,
  addUsuarioDocumento,
  getUsuariosEmDocumento,
  obterDocumentos,
  adicionarDocumento,
  excluirDocumento
};
