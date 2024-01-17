import { Server } from '../../src/classes/Server';
import controllers from '../../src/controllers';
import hooks from '../../src/hooks';
import '../../src/prototypes';
import services from '../../src/services';
import { schemas } from '../../src/types';

import { testConfig } from '../../src/config';

export const buildTestServer = () => {
    const server = new Server(testConfig);

    server.init();
    server.initErrorCatcher();

    schemas.forEach(s => server.fastify.addSchema(s));
    services.forEach(s => server.fastify.register(s));
    hooks.forEach(h => server.fastify.register(h));
    controllers.forEach(({ c, opts }) => server.fastify.register(c, opts));

    return server;
};
