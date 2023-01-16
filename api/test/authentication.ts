import type { TTestServer } from './_index.test';

export default async function (Server: TTestServer) {
  describe('Authentication API', () => {
    const user = {
      pseudo: Server.generateRandomEmail(),
      mail: Server.generateRandomEmail(),
      password: 'Password123!!!',
    };
    const loginResponse = expect.objectContaining({
      user: expect.objectContaining({
        id: expect.any(String),
        pseudo: expect.any(String),
        role: expect.any(Number),
        avatar_url: expect.any(String),
      }),
      token: expect.any(String),
      message: expect.any(String),
    });

    it('Should fail to register a user', async () => {
      const INVALID_PASSWORD_FORMAT = await Server.RequestRegister({
        ...user,
        password: 'testercédouter',
      });
      expect(INVALID_PASSWORD_FORMAT.statusCode).toEqual(422);
    });

    it('Should success to register a user', async () => {
      const SUCCESSFULL_REGISTER = await Server.RequestRegister({
        ...user,
      });
      expect(SUCCESSFULL_REGISTER.statusCode).toEqual(200);
    });

    it('Should success to log a user and refresh his token (Login/RefreshToken)', async () => { 
      const LOGIN_WITH_PSEUDO = await Server.RequestLogin({
        pseudo: user.pseudo,
        password: user.password,
      });
      const LOGIN_WITH_MAIL = await Server.RequestLogin({
        mail: user.mail,
        password: user.password,
      });
      const REFRESH = await Server.RequestRefresh(
        LOGIN_WITH_PSEUDO.tokens.refreshToken
      );
      expect(LOGIN_WITH_PSEUDO.statusCode).toEqual(200);
      expect(LOGIN_WITH_PSEUDO.res).toEqual(loginResponse);
      expect(LOGIN_WITH_MAIL.statusCode).toEqual(200);
      expect(LOGIN_WITH_MAIL.res).toEqual(loginResponse);
      expect(REFRESH.statusCode).toEqual(200);
      expect(REFRESH.res).toEqual(loginResponse);
    });

    it('Should remove test data', async () => { 
      await Server.client.query({
        text: ` DELETE FROM "user"
                WHERE pseudo = $1
                AND mail = $2;`,
        values: [user.pseudo, user.mail],
      });
    });
  });
}
