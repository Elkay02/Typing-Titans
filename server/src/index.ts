import { config } from 'dotenv';

config();

import { server } from './app';

const HOST = process.env.HOST || 'localhost';
const p = parseInt(process.env.PORT || '');
const PORT = Number.isInteger(p) ? p : 3009;

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
