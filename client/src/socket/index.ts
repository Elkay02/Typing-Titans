import { io } from 'socket.io-client';

const SERVER_DOMAIN = 'http://localhost:3000';

const socket = io(SERVER_DOMAIN);

export default socket;
