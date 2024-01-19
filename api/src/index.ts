import { Server, registerServerError } from '@src/classes';
import { defaultConfig } from '@src/config';
import '@src/prototypes';
import '@src/types';

try {
    registerServerError();
    const server = new Server(defaultConfig);
    server.envCheck();
    server.init();
    server.initErrorCatcher();
    server.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}
