import 'module-alias/register';
import Fastify from 'fastify';
import app from '@src/app';
import qs from "qs"
import parseOptions from '@src/utils/parseOptions';



const serverConfig = {
  port: Number(process.env.port) || 8080,
  host: '0.0.0.0'
}

export default async function createServer () {
  try {
    const fastify = Fastify({logger: true, querystringParser: (str) => qs.parse(str, parseOptions)});
    fastify.register(app);

    fastify.listen({...serverConfig})

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createServer()
