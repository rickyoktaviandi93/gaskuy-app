"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRealtime = setupRealtime;
exports.emit = emit;
const socket_io_1 = require("socket.io");
let io;
function setupRealtime(s) { io = new socket_io_1.Server(s, { cors: { origin: process.env.CORS_ORIGIN || '*' } }); io.on('connection', sock => { sock.on('join:order', (id) => sock.join('order:' + id)); sock.on('join:user', (id) => sock.join('user:' + id)); }); }
function emit(event, o) { if (!io)
    return; io.to('order:' + o.id).emit(event, o); if (o.customer_id)
    io.to('user:' + o.customer_id).emit(event, o); if (o.driver_id)
    io.to('user:' + o.driver_id).emit(event, o); }
