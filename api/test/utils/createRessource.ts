import type { Database } from '../../src/types/Database';
import { faker } from '@faker-js/faker';
import { hashPassword } from '../../src/utils/bcryptHandler';
import pgClient from './pgClient';

interface ressourcesCreator {
  user: (
    user?: {
      pseudo?: string;
      mail?: string;
      password?: string;
      role?: string;
    }
  )=>Promise<{ user: Database.user, delete: ()=>void }>;
  slot: (
    slot?: {
      is_booked?: boolean;
      season_number?: number;
      episode?: number;
      publishing_date?: string;
    }
  )=>Promise<{ slot: Database.proposition_slot, delete: ()=>void }>;
}

export const ressourcesCreator: ressourcesCreator = {
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
      },
    };
  },
  slot: async (slot) => {
    let s = {
      is_booked: false,
      season_number: 3,
      episode: 1,
      publishing_date: faker.date.past().toISOString(),
    };
    if (slot) s = { ...s, ...slot };
    await pgClient.query({
      text: ` INSERT INTO "proposition_slot" (is_booked, season_number, episode, publishing_date)
              VALUES ($1, $2, $3, $4);`,
      values: [s.is_booked, s.season_number, s.episode, s.publishing_date],
    });
    const { rows } = await pgClient.query({
      text: ` SELECT * FROM "proposition_slot"
              WHERE is_booked = $1
              AND season_number = $2
              AND episode = $3
              AND publishing_date = $4;`,
      values: [s.is_booked, s.season_number, s.episode, s.publishing_date],
    });

    return {
      slot: rows[0],
      delete: async () => {
        await pgClient.query({
          text: ` DELETE FROM "proposition_slot"
                  WHERE id = $1;`,
          values: [rows[0].id],
        });
      },
    };
  },
};
