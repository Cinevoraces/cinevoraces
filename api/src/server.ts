import 'module-alias/register';
import Fastify from 'fastify';
import qs from 'qs';
import app from '@src/app';

const fastify = Fastify({
  logger: false,
  querystringParser: str => qs.parse(str)
});
const serverConfig = {
  port: Number(process.env.port) || 8080,
  host: '0.0.0.0'
}

fastify.register(app);

fastify.listen({...serverConfig}, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});