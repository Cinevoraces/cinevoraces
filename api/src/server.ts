import Fastify from 'fastify';
import qs from 'qs';

import parseOptions from './utils/parseOptions';
import schemas from './models/schemas/_index';
import plugins from './plugins/_index';
import services from './services/_index';
import controllers from './controllers/_index';
import hooks from './hooks/_index';

// Check environment variables
([
  'CLOUDINARY_URL',
  'PASS_REGEXP',
  'JWT_SECRET',
  // 'NODEMAILER_HOST',
  // 'NODEMAILER_MAIL',
  // 'NODEMAILER_PASSWORD',
  'COOKIE_SECRET',
]).forEach(env => {
  if (!process.env[env]) throw new Error(`Missing environment variable: ${env}`);
});

export default async function start() {
  try {
    const server = Fastify({
      logger: true,
      querystringParser: (str) => qs.parse(str, parseOptions),
    });

    // Register plugins, services, hooks and routes.
    schemas.forEach(s => server.addSchema(s));
    plugins.forEach(p => server.register(p));
    services.forEach(s => server.register(s));
    hooks.forEach(h => server.register(h));
    controllers.forEach(({ c, opts }) => server.register(c, opts));

    // Set global error catcher
    server.setErrorHandler(function (error, request, reply) {
      this.log.error(error);
      reply
        .status(error.statusCode ?? 500)
        .send({ message: error.message });
    });

    // Start server
    server.listen({ 
      port: Number(process.env.API_PORT) || 3005,
      host: '0.0.0.0',
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
