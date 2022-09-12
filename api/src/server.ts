import 'module-alias/register';
import fastify from 'fastify';
import app from '@src/app';

const server = fastify({logger: true});
const serverConfig = {
  port: Number(process.env.port) || 8080,
  host: '0.0.0.0'
}

server.register(app);

server.listen({...serverConfig}, err => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});