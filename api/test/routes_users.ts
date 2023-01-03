import type TestServer from './TestServer';

export async function ROUTES_USERS(server: TestServer) {
  describe('USERS ENDPOINTS', () => {

    test('USERS AS USER', async () => {
      const logUser = await server.RequestLogin({
        pseudo: server.ressources.users[1].pseudo,
        password: server.ressources.users[1].password.clear,
      });

      const SUCCESSFULL_GET_USERS = await server.RequestGetUsers(
        'select[reviews]=true&select[metrics]=true&select[propositions]=true&select[movies]=true&limit=1'
      );

      console.log(SUCCESSFULL_GET_USERS.res);

      expect(SUCCESSFULL_GET_USERS.res).toEqual(
        expect.arrayContaining([server.expected.userWithMoviesReviewsAndMetrics])
      );

      // Update user as user
      server.ressources.users[1].pseudo = server.faker.internet.userName();
      server.ressources.users[1].mail = server.faker.internet.email();
      const SUCCESSFULL_UPDATE_USER = await server.RequestUpdateUser(
        logUser.tokens.accessToken,
        {
          update_user: {
            pseudo: server.ressources.users[1].pseudo,
            mail: server.ressources.users[1].mail,
            password: 'newPasswordThatMatchPattern12355!!!',
          },
          password: server.ressources.users[1].password.clear,
        }
      );
      expect(SUCCESSFULL_UPDATE_USER.statusCode).toEqual(204);

      // Update user with invalid password     
      const FAILURE_UPDATE_PASSWORD_WITH_INVALID_PASSWORD = await server.RequestUpdateUser(
        logUser.tokens.accessToken,
        {
          update_user: {
            password: 'TesterCestDouter',
          },
          password: 'newPasswordThatMatchPattern12355!!!',
        }
      );
      expect(FAILURE_UPDATE_PASSWORD_WITH_INVALID_PASSWORD.statusCode).toEqual(422);

      server.ressources.users[1].pseudo = 'DROP TABLE "user";';
      const FAILURE_INJECTION = await server.RequestUpdateUser(
        logUser.tokens.accessToken,
        {
          update_user: {
            pseudo: server.ressources.users[1].pseudo,
          },
          password: 'newPasswordThatMatchPattern12355!!!',
        }
      );

      expect(FAILURE_INJECTION.statusCode).toEqual(204);
    });

    test('DELETE USERS AS ADMIN', async () => {
      const logAdmin = await server.RequestLogin({
        pseudo: server.ressources.admins[0].pseudo,
        password: server.ressources.admins[0].password.clear,
      });
      const SUCCESSFULL_DELETE_USER = await server.RequestAdminDeleteUser(
        logAdmin.tokens.accessToken,
        { password: server.ressources.admins[0].password.clear },
        server.ressources.users[1].pseudo,
      );
      expect(SUCCESSFULL_DELETE_USER.statusCode).toEqual(204);
    });
  });
}
