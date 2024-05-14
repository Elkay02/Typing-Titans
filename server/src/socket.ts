import { instrument } from '@socket.io/admin-ui';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

import { fetchShortSentence, fetchShortcuts } from './services/api-service';

let readyPlayers: string[] = [];
let userNames: any = {};

const socket = (server: HttpServer) => {

  const io = new SocketIOServer(server, {
    connectionStateRecovery: {},
    cors: {
      origin: [
        process.env.CLIENT_DOMAIN || 'http://localhost:5173',
        'https://admin.socket.io',
      ],
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    socket.broadcast.emit('connected');

    socket.on('end-competition', (time: number, speed: number, accuracy: number) => {
      const winnerMessage = userNames[socket.id] ? userNames[socket.id] : 'Another player';

      socket.broadcast.emit('winner', winnerMessage + ' has won!', time, speed, accuracy);
      socket.emit('winner', 'You won!', time, speed, accuracy);
    });

    socket.on('username', (username: string) => {
      userNames[socket.id] = username;
    });

    socket.on('isReady', async () => {
      readyPlayers = readyPlayers.includes(socket.id)
      ? readyPlayers.filter(id => id != socket.id)
      : [ ...readyPlayers, socket.id ];

      if (readyPlayers.length > 1) {
        io.emit('countdown');
        io.emit('sentence', await fetchShortSentence());
        io.emit('shortcuts', await fetchShortcuts());

        setTimeout(() => {
          readyPlayers = [];
          io.emit('start-competition');
        }, 5000);
      }
    });
  });

  if (process.env.NODE_ENV === 'development') instrument(io, { auth: false });
};

export default socket;
