import plugin from 'fastify-plugin'; 
import fastifyPg from '@fastify/postgres';

async function dbconnector(server: serverInstance) {
  server.register(fastifyPg, {
    connectionString: process.env.POSTGRES_URL
  });
}

export default plugin(dbconnector);