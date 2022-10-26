import type { Query } from '@src/types/Query';
import type { Database } from '@src/types/Database';
import objectHandler from './objectHandler';

interface sqlQuery {
  select: string;
  where: string;
}

/**
 * **SQL query factoring**
 * @param querystring - Querystring object
 * @param model - 'movie' | 'user' | 'review' | 'proposition_slot'
 * @param userId - Number
 * @returns sqlQuery object
 */
export default function queryFactory(
  querystring: Query.querystring, 
  model: 'movie' | 'user' | 'review' | 'proposition_slot',
  userId?: number
) {
  const { filter, pop, limit, asc, desc } = querystring;
  const sqlQueries = [];

  if (filter) sqlQueries.push(queryBuilder.where(enumerators[model].select, filter));
  return;
}

const enumerators: {
  review: { select: Array<keyof Database.review> },
  movie: { select: Array<keyof Database.movie> },
  user: { select: Array<keyof Database.user> },  
  proposition_slot: { select: Array<keyof Database.proposition_slot> },
} = {
  review: {
    select: [
      'user_id',
      'movie_id',
    ]
  },
  movie: {
    select: [
      'is_published',
      'publishing_date',
      'season_id',
    ]
  },
  user: {
    select: [
      'id',
      'role',
      'created_at',
    ]
  },
  proposition_slot: {
    select: [
      'is_booked',
      'season_number',
      'episode',
    ]
  }
};

// export default function queryFactory(
//   querystring: Query.querystring, 
//   dataType: 'movie' | 'user' | 'slot' | 'review',
//   userId?: number
// ): sqlQuery {
//   const { filter, pop, limit, asc, desc } = querystring;
//   const sqlQuery: sqlQuery = {
//     select: null,
//     where: '',
//   };
//   switch (dataType) {
//     case 'review': {
//       const filterEnumerator: Array<Prisma.ReviewScalarFieldEnum> = [
//         'user_id',
//         'movie_id'
//       ];
//       const popEnumerator: Array<keyof Prisma.userInclude> = [
//         'movies',
//         'reviews'
//       ];
//       sqlQuery.select = Prisma.sql`
//         SELECT u.id,u.pseudo,u.mail,u.avatar_url,u.role,u.created_at,u.updated_at
//       `;
//       if (pop) sqlQuery.select = Prisma.sql`${sqlQuery.select}, `;
//       if (filter) sqlQuery.where = queryBuilder.where(filterEnumerator, filter);
      
//       break;
//     }
//     case 'user': {
//       const filterEnumerator: Array<Prisma.UserScalarFieldEnum> = [
//         'pseudo',
//         'mail',
//         'role',
//       ];
//       if (filter) {
//         sqlQuery.where = queryBuilder.where(filterEnumerator, filter);
//       }
//       break;
//     }
//   }
//   return sqlQuery;
// }

/**
* **SQL query builder**
* @description
* Build SQL query from querystring
* @method **where** *return string of fields and values joined by 'AND'*
*/
export const queryBuilder: {
  where: (
    enumerator: Array<string>,
    filter: Record<string, unknown>
  )=>string,
  join: (
    enumerator: Array<string>,
    pop: Record<string, unknown>,
    relation: string
  )=>string,
} = {
  where: (enumerator, filter) => {
    const keys = Object.keys(filter);
    const array = (keys as Array<string>).reduce(
      (acc, key) => {
        if (typeof filter[key] === 'undefined') return acc;
        if (enumerator.find((element) => element === key)) {
          return [...acc, `${key}=${filter[key]}`];
        }
        return acc;
      }, []
    ).join(' AND ');
    if (array.length === 0) {
      return '';
    } else {
      return 'WHERE ' + array;
    }
  },

  join: (enumerator, pop, relation) => {
    // const populators = enumerator.map((element) => {
    //   if (pop[element] === true) {
    //     return `
    //       ${joinFields[element].select}
    //       ${joinFields[element][relation]}
    //     `;
    //   };
    // });
    return `
      ${joinFields['movies'].select}
      ${joinFields['movies'][relation]}
    `;
  }
};

const joinFields: Record<string, {[key: string]: string }> = {
  movies: {
    select: `
      (SELECT json_agg(json_build_object(
        'id', m.id,
        'french_title', m.french_title,
        'original_title', m.original_title,
        'poster_url', m.poster_url,
        'directors', m.directors,
        'user_id', m.user_id,
        'release_date', m.release_date,
        'runtime', m.runtime,
        'casting', m.casting,
        'presentation', m.presentation,
        'is_published', m.is_published,
        'publishing_date', m.publishing_date,
        'season_id', m.season_id,
        'created_at', m.created_at,
        'updated_at', m.updated_at
      )) AS movies)
    `,
    joinFromUser: `
        FROM "user" u 
      INNER JOIN movie m 
        ON u.id = m.user_id
    `,
  }
};
