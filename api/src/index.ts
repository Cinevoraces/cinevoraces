import { Server, registerServerError } from '@src/classes';
import { defaultConfig } from '@src/config';
import { registerDatePrototypes, registerStringPrototypes } from '@src/prototypes';
import '@src/types';

(async () => {
    try {
        registerServerError();
        registerDatePrototypes();
        registerStringPrototypes();
        const server = new Server(defaultConfig);
        server.envCheck();
        await server.init();
        server.initErrorCatcher();
        server.start();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
