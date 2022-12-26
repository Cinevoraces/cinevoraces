import type TestServer from './TestServer';

export async function ROUTES_EPISODES(server: TestServer) {
  describe('EPISODES ENDPOINTS', () => {

    test('BOOK/UNBOOK EPISODES', async () => {
      const logUser = await server.RequestLogin({
        pseudo: server.ressources.users[0].pseudo,
        password: server.ressources.users[0].password.clear,
      });

      const GET_AVAILABLE_EPISODES = await server.RequestEpisodes(
        logUser.tokens.accessToken,
        'where[is_booked]=false'
      );
      expect(GET_AVAILABLE_EPISODES.res).toEqual(
        expect.arrayContaining(
          [expect.objectContaining({ is_booked: false })]
        )
      );

      const SUCCESSFULL_BOOK_EPISODE = await server.RequestBookEpisode(
        logUser.tokens.accessToken,
        server.ressources.episodes[0].id
      );
      expect(SUCCESSFULL_BOOK_EPISODE.statusCode).toEqual(204);

      // Admin unbook episode
      const logAdmin = await server.RequestLogin({
        pseudo: server.ressources.admins[0].pseudo,
        password: server.ressources.admins[0].password.clear,
      });

      const SUCCESSFULL_UNBOOK_EPISODE = await server.RequestUnbookEpisode(
        logAdmin.tokens.accessToken,
        server.ressources.episodes[0].id,
        { password: server.ressources.admins[0].password.clear }
      );

      expect(SUCCESSFULL_UNBOOK_EPISODE.statusCode).toEqual(204);
    });
  });
}
