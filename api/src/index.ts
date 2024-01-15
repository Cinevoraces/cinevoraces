import { Server } from './classes/Server';
import { defaultConfig } from './config';
import controllers from './controllers/_index';
import hooks from './hooks/_index';
import schemas from './models/schemas/_index';
import './prototypes';
import services from './services/_index';

try {
    const server = new Server(defaultConfig);

    server.envCheck();
    server.init();
    server.initErrorCatcher();

    // TODO: Should be handled by the server class.
    schemas.forEach(s => server.fastify.addSchema(s));
    services.forEach(s => server.fastify.register(s));
    hooks.forEach(h => server.fastify.register(h));
    controllers.forEach(({ c, opts }) => server.fastify.register(c, opts));

    server.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}
