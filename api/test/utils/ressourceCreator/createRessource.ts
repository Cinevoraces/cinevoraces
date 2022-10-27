import type { Database } from '../../../src/types/Database';
import { faker } from '@faker-js/faker';
import { hashPassword } from '../../../src/utils/bcryptHandler';
import pgClient from '../pgClient';

export const ressourcesCreator: {
  user: (
    user?: {
      pseudo?: string, 
      mail?: string, 
      password?: string, 
      role?: string
    }
  )=>Promise<{ user: Database.user, delete: ()=>void }>,
} = {
  user: async (user) => {
    let u = {
      pseudo: faker.internet.userName(),
      mail: faker.internet.email(),
      password: faker.internet.password(),
      role: 'user',
    };
    if (user) u = { ...u, ...user };
    const hashed = await hashPassword(u.password);
    
    await pgClient.query({
      text: ` INSERT INTO "user" (pseudo, mail, password, role)
              VALUES ($1, $2, $3, $4);`,
      values: [u.pseudo, u.mail, hashed, u.role],
    });
    const { rows } = await pgClient.query({
      text: ` SELECT * FROM "user"
              WHERE pseudo = $1
              AND mail = $2;`,
      values: [u.pseudo, u.mail],
    });

    return { 
      user: { ...rows[0], password: u.password },
      delete: async () => {
        await pgClient.query({
          text: ` DELETE FROM "user"
                  WHERE id = $1;`,
          values: [rows[0].id],
        });
      }  
    };
  }
};
