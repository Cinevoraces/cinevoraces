import type { InjectOptions } from 'fastify';
import type { server } from '../utils/testsType';

export async function ENDPOINTS_SEASONS(server: server) {
  describe('SEASONS ENDPOINTS', () => {
    const { app, res, expectedObjects } = server;
    const inject: Record<string, InjectOptions> = {
      login: {
        method: 'POST',
        url: '/login',
      },
      getSeasons: {
        method: 'GET',
        url: '/seasons',
      },
    };

    test('GET SEASONS', async () => {
      // Login as user
      // inject.login = {
      //   ...inject.login,
      //   payload: {
      //     pseudo: res.users[1].user.pseudo,
      //     password: res.users[1].user.password,
      //   },
      // };
      // const login = await app.inject(inject.login);
      // const { token } = await login.json();

      // GET SEASONS
      const getSeasons = await app.inject(inject.getSeasons);
      expect(await getSeasons.json()).toEqual(
        expect.arrayContaining([expectedObjects.season])
      );
    });
  });
}
