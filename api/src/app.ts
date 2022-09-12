import dbconnector from '@plugins/dbconnector';
import root from '@routes/root';

export default async function app(fastify: serverInstance) {

  // Register plugins
  fastify.register(dbconnector);

  // Register routes
  fastify.register(root);
}