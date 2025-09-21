import 'dotenv/config';
import eventosDocsPage from './registro-eventos/docs.js';
import eventosRegisterPage from './registro-eventos/register.js';
import eventosMainPage from './registro-eventos/main.js';
import eventosLoginPage from './registro-eventos/login.js';
import io from './servidor.js';


io.on('connection', (socket) => {
  eventosRegisterPage(socket, io);
  eventosLoginPage(socket, io);
  eventosMainPage(socket, io);
  eventosDocsPage(socket, io);
});
