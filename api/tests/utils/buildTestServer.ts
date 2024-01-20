import { Server } from '../../src/classes/Server';
import '../../src/prototypes';

import { registerServerError } from '@src/classes';
import { testConfig } from '../../src/config';
import { registerDatePrototypes, registerStringPrototypes } from '../../src/prototypes';

export const buildTestServer = () => {
    registerServerError();
    registerDatePrototypes();
    registerStringPrototypes();

    const server = new Server(testConfig);
    server.init();
    server.initErrorCatcher();
    return server;
};
