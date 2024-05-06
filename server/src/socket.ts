import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

const socket = (server: HttpServer) => {

  const io = new SocketIOServer(server, {
    connectionStateRecovery: {},
    cors: {
      origin: process.env.CLIENT_DOMAIN || 'http://localhost:5173',
    },
  });

  io.on('connection', (socket: Socket) => {
    socket.broadcast.emit('connected');
  });
};

export default socket;
