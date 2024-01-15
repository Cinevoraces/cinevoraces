import { Server } from '@src/classes';
import { defaultConfig } from '@src/config';
import controllers from '@src/controllers';
import hooks from '@src/hooks';
import '@src/prototypes';
import services from '@src/services';
import '@src/types';
import { schemas } from '@src/types';

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
