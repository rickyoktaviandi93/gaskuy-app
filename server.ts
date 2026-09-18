import 'dotenv/config'; import http from 'http'; import app from './app'; import {setupRealtime} from './realtime';
const server=http.createServer(app); setupRealtime(server);
server.listen(Number(process.env.PORT||3000),()=>console.log('GasKuy API ready'));
