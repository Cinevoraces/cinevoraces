import type TestServer from './TestServer';

export async function ROUTES_AUTH(Server: TestServer) {
  describe('ROUTES_AUTH', () => {
    
    test('ACCOUNT REGISTRATION', async () => {
      const fakePseudo = Server.faker.internet.userName();
      const fakeMail = Server.faker.internet.email();
      
      const INVALID_PASSWORD_FORMAT = await Server.RequestRegister({
        pseudo: fakePseudo,
        mail: fakeMail,
        password: 'testercédouter',
      });
      const SUCCESSFULL_REGISTER = await Server.RequestRegister({
        pseudo: fakePseudo,
        mail: fakeMail,
        password: '!T3stErC3sTd0ut3R!OcH',
      });

      expect(INVALID_PASSWORD_FORMAT.statusCode).toEqual(422);
      expect(SUCCESSFULL_REGISTER.statusCode).toEqual(201);

      // Remove test user from database
      await Server.fastify.pgClient.query({
        text: ` DELETE FROM "user"
                WHERE pseudo = $1
                AND mail = $2;`,
        values: [fakePseudo, fakeMail]
      });
    });

    test('ACCOUNT LOGIN USING PSEUDO', async () => {
      const LOGIN = await Server.RequestLogin({
        pseudo: Server.ressources.users[0].pseudo,
        password: Server.ressources.users[0].password.clear,
      });

      const REFRESH = await Server.RequestRefresh(LOGIN.tokens.refreshToken);

      expect(LOGIN.statusCode).toEqual(200);
      expect(LOGIN.res).toEqual(Server.expected.loginResponse);
      expect(REFRESH.statusCode).toEqual(200);
      expect(REFRESH.res).toEqual(Server.expected.loginResponse);
    });

    test('ACCOUNT LOGIN USING MAIL', async () => {
      const FAILURE_LOGIN = await Server.RequestLogin({
        mail: Server.ressources.users[0].mail,
        pseudo: Server.ressources.users[0].pseudo,
        password: Server.ressources.users[0].password.clear,
      });
      expect(FAILURE_LOGIN.statusCode).toEqual(400);
      const SUCCESSFULL_LOGIN = await Server.RequestLogin({
        mail: Server.ressources.users[0].mail,
        password: Server.ressources.users[0].password.clear,
      });

      expect(SUCCESSFULL_LOGIN.statusCode).toEqual(200);
    });
  });
}
