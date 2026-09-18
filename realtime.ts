import {Server} from 'socket.io'; import {Server as HttpServer} from 'http'; let io:Server;
export function setupRealtime(s:HttpServer){io=new Server(s,{cors:{origin:process.env.CORS_ORIGIN||'*'}});io.on('connection',sock=>{sock.on('join:order',(id:string)=>sock.join('order:'+id));sock.on('join:user',(id:string)=>sock.join('user:'+id));});}
export function emit(event:string,o:any){if(!io)return;io.to('order:'+o.id).emit(event,o);if(o.customer_id)io.to('user:'+o.customer_id).emit(event,o);if(o.driver_id)io.to('user:'+o.driver_id).emit(event,o);}
