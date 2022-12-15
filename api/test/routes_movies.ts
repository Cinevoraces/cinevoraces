import type TestServer from './TestServer';

export async function ROUTES_MOVIES(server: TestServer) {
  describe('MOVIES ENDPOINTS', () => {
    
    test('GET MOVIES', async () => {
      const logUser = await server.RequestLogin({
        pseudo: server.ressources.users[0].pseudo,
        password: server.ressources.users[0].password.clear,
      });

      // const SUCCESSFULL_GET_ALL_MOVIES
      // const SUCCESSFULL_GET_MOVIES_ORDERED_AND_LIMITED
      // const SUCCESSFULL_GET_MOVIES_FILTERED_BY_ID
      // const SUCCESSFULL_GET_MOVIES_FILTERED_BY_AUTHOR
      // const SUCCESSFULL_GET_MOVIES_FILTERED_BY_SEASON
      // const SUCCESSFULL_GET_MOVIES_FILTERED_BY_STATUS
      // const SUCCESSFULL_GET_MOVIES_POPULATED_WITH_MANY
      // const SUCCESSFULL_GET_MOVIES_POPULATED_WITH_ONE
    });
  });
}
