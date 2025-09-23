import 'dotenv/config';
import eventosDocsPage from './registro-eventos/docs.js';
import eventosRegisterPage from './registro-eventos/register.js';
import eventosMainPage from './registro-eventos/main.js';
import eventosLoginPage from './registro-eventos/login.js';
import io from './servidor.js';
import authUser from './middlewares/authUser.js';

const nspUsers = io.of('/usuarios');

nspUsers.use(authUser)

nspUsers.on('connection', (socket) => {
  eventosMainPage(socket, nspUsers);
  eventosDocsPage(socket, nspUsers);
});

io.of('/').on('connection', (socket) => {
  eventosRegisterPage(socket, io);
  eventosLoginPage(socket, io);
});
