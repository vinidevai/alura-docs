import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import 'dotenv/config';
import { Server } from 'socket.io';

import './db/dbConnect.js';

const app = express();
const serverPort = process.env.SERVER_PORT;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, '../..', 'public');
app.use(express.static(diretorioPublico));

const servidorHttp = http.createServer(app);
servidorHttp.listen(serverPort, () => console.log(`Servidor Main escutando na porta ${serverPort}`));

const io = new Server(servidorHttp, {
  cors: {
    origin: ['http://localhost:5000']
  }
});

export default io;
