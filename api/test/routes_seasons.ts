import type TestServer from './TestServer';

export async function ROUTES_SEASONS(server: TestServer) {
  describe('SEASONS ENDPOINTS', () => {
    const seasonToCreate = 35;
    const yearToCreate = 2054;

    test('GET SEASONS', async () => {
      const SUCCESSFULL_GET_SEASONS = await server.RequestSeasons();
      expect(SUCCESSFULL_GET_SEASONS.res).toEqual(
        expect.arrayContaining([server.expected.season])
      );
    });

    test('CREATE SEASON', async () => {
      const logAdmin = await server.RequestLogin({
        pseudo: server.ressources.admins[0].pseudo,
        password: server.ressources.admins[0].password.clear,
      });

      const SUCCESSFULL_CREATE_SEASON = await server.RequestAdminCreateSeason(
        logAdmin.tokens.accessToken,
        {
          year: yearToCreate,
          season_number: seasonToCreate,
        },
      );
      expect(SUCCESSFULL_CREATE_SEASON.statusCode).toEqual(201);

      // DELETE TEST ROWS
      server.fastify.pgClient.query(
        `DELETE FROM slot WHERE season_number = ${seasonToCreate}`
      );
      server.fastify.pgClient.query(
        `DELETE FROM season WHERE number = ${seasonToCreate}`
      );
    });
  });
}
