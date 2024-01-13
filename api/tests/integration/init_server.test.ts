import { testConfig } from 'src/config';
import { Server } from '../../src/classes/Server';

// TODO: Add specific tests for the catcher
describe('Initiate a Server instance', () => {
    const server = new Server(testConfig);

    it('Should initiate a Server instance with registered dependencies', () => {
        let hasFailed: boolean;
        try {
            server.envCheck();
            server.init();
            server.initErrorCatcher();
        } catch (err) {
            hasFailed = true;
            console.error(err);
        }

        expect(hasFailed).toBeFalsy();
        expect(server.fastify).toBeDefined();
        expect(server.fastify.postgres).toBeDefined();
    });

    it('Should start the server', async () => {
        server.start();

        const res = await server.fastify.inject({
            method: 'GET',
            url: '/ping',
        });

        expect(res.statusCode).toEqual(200);
    });
});
