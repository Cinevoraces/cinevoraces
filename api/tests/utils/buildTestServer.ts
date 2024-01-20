import { Server } from '../../src/classes/Server';
import '../../src/prototypes';

import { registerServerError } from '@src/classes';
import { testConfig } from '../../src/config';

export const buildTestServer = () => {
    registerServerError();
    const server = new Server(testConfig);
    server.init();
    server.initErrorCatcher();
    return server;
};
