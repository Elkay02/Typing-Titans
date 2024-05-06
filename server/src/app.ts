import cors from 'cors';
import express from 'express';
import { createServer } from 'http';

import socket from './socket';
import router from './router';

const app = express();
const server = createServer(app);
socket(server);

app.use(cors())
  .use(express.json())
  .use(router);

export default app;
export { server };
