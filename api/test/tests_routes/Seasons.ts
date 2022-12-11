import type { InjectOptions } from 'fastify';
import type { server } from '../utils/testsType';

export async function ENDPOINTS_SEASONS(server: server) {
  describe('SEASONS ENDPOINTS', () => {
    const { app, res, expectedObjects, pgClient } = server;

    const seasonToCreate = 35;
    const yearToCreate = 2054;

    const inject: Record<string, InjectOptions> = {
      login: {
        method: 'POST',
        url: '/login',
      },
      getSeasons: {
        method: 'GET',
        url: '/seasons',
      },
      createSeason: {
        method: 'POST',
        url: '/admin/seasons',
        payload: {
          year: yearToCreate,
          season_number: seasonToCreate,
        },
      },
    };

    test('GET SEASONS', async () => {
      // GET SEASONS
      const getSeasons = await app.inject(inject.getSeasons);
      expect(await getSeasons.json()).toEqual(
        expect.arrayContaining([expectedObjects.season])
      );
    });

    test('CREATE SEASON', async () => {
      // LOG ADMIN
      inject.login = {
        ...inject.login,
        payload: {
          pseudo: res.users[0].user.pseudo,
          password: res.users[0].user.password,
        },
      };
      const loginAdmin = await app.inject(inject.login);
      const { token: adminToken } = await loginAdmin.json();

      // CREATE SEASON
      inject.createSeason = {
        ...inject.createSeason,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };
      const createSeason = await app.inject(inject.createSeason);

      // DELETE TEST ROWS
      pgClient.query(
        `DELETE FROM proposition_slot WHERE season_number = ${seasonToCreate}`
      );
      pgClient.query(`DELETE FROM season WHERE number = ${seasonToCreate}`);

      expect(await createSeason.json()).toEqual(
        expect.objectContaining({ message: expect.any(String) })
      );
      expect(createSeason.statusCode).toEqual(201);
    });
  });
}
