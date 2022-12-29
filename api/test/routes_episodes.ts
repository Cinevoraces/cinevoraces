import type TestServer from './TestServer';

export async function ROUTES_EPISODES(server: TestServer) {
  describe('EPISODES ENDPOINTS', () => {

    test('GET EPISODES', async () => {
      const logUser = await server.RequestLogin({
        pseudo: server.ressources.users[0].pseudo,
        password: server.ressources.users[0].password.clear,
      });

      const GET_AVAILABLE_EPISODES = await server.RequestEpisodes(
        logUser.tokens.accessToken,
      );

      expect(GET_AVAILABLE_EPISODES.statusCode).toEqual(200);
    });
  });
}
