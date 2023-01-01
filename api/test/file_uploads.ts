import type TestServer from './TestServer';
import fs from 'fs';
import path from 'path';

export async function FILE_UPLOADS(server: TestServer) {
  describe('FILE_UPLOADS', () => {

    test('UPDATE USER AVATAR', async () => {
      const logUser = await server.RequestLogin({
        pseudo: server.ressources.users[1].pseudo,
        password: server.ressources.users[1].password.clear,
      });

      const test = await server.RequestUserAvatarUpload(
        logUser.tokens.accessToken,
        fs.createReadStream(path.join(__dirname, 'TestImage.jpg'))
      );

      console.log(test);
    });
  });
}
