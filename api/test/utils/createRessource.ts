import type { user, proposition_slot, movie } from '../../src/types/_index';
import { faker } from '@faker-js/faker';
import { hashPassword } from '../../src/plugins/bcrypt';
import pgClient from './pgClient';

interface ressourcesCreator {
  user: (
    user?: {
      pseudo?: string;
      mail?: string;
      password?: string;
      role?: string;
    }
  )=>Promise<{ user: user, delete: ()=>void }>;
  slot: (
    slot?: {
      is_booked?: boolean;
      season_number?: number;
      episode?: number;
      publishing_date?: string;
    }
  )=>Promise<{ slot: proposition_slot, delete: ()=>void }>;
  movie: (
    movie?: {
      french_title?: string,
      user_id?: number,
      season_id?: number,
    }, 
    is_published?: boolean
  )=>Promise<{ movie: movie, delete: ()=>void }>;
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

  movie: async (movie, is_published) => {
    let m = {
      french_title: faker.lorem.sentence(),
      original_title: faker.lorem.sentence(),
      poster_url: faker.internet.url(),
      directors: [faker.name.fullName()],
      release_date: faker.date.past(),
      runtime: 150,
      casting: [faker.name.fullName()],
      presentation: faker.lorem.paragraph(2),
      publishing_date: faker.date.past().toISOString(),
      user_id: 1,
      season_id: 3,
      movie_genres: ['Suspense insoutenable'],
      movie_languages: ['Vlams'],
      movie_countries: ['Vlamskétistan'],
    };
    if (movie) m = { ...m, ...movie };
    await pgClient.query({
      text: ' SELECT new_movie($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);',
      values: Object.values(m),
    });
    if (is_published) {
      await pgClient.query({
        text: ` UPDATE "movie"
                SET is_published = true
                WHERE french_title = $1
                AND original_title = $2
                AND user_id = $3
                AND season_id = $4;`,
        values: [m.french_title, m.original_title, m.user_id, m.season_id],
      });
    }
    const { rows } = await pgClient.query({
      text: ` SELECT * FROM "movie"
              WHERE french_title = $1
              AND original_title = $2
              AND user_id = $3
              AND season_id = $4;`,
      values: [m.french_title, m.original_title, m.user_id, m.season_id],
    });
    return {
      movie: rows[0],
      delete: async () => {
        await pgClient.query({
          text: ` DELETE FROM "movie"
                  WHERE id = $1;`,
          values: [rows[0].id],
        });
      },
    };
  },
};
