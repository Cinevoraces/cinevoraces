import Fastify from 'fastify';
import qs from 'qs';
import parseOptions from './utils/parseOptions';
import app from './app';

const serverConfig = {
  port: Number(process.env.port) || 3005,
  host: '0.0.0.0',
};

export default async function createServer() {
  try {
    const fastify = Fastify({
      logger: true,
      querystringParser: (str) => qs.parse(str, parseOptions),
    });
    fastify.register(app);

    fastify.setErrorHandler(function (error, request, reply) {
      this.log.error(error);
      if (error.statusCode)
        reply.status(error.statusCode);
      
      reply.send({ message: error.message });
    });
    
    fastify.listen({ ...serverConfig });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createServer();
