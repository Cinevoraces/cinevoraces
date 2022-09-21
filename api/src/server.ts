import 'module-alias/register';
import Fastify from 'fastify';
import app from '@src/app';
import qs from "qs"
import parseOptions from '@src/utils/parseOptions';




const fastify = Fastify({logger: true, querystringParser: (str) => qs.parse(str, parseOptions)});
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