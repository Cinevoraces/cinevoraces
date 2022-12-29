import type { Query } from '../../types/_index';

/**
 * **getAvailableEpisodes**
 * @description Get episodes next 5 available episodes within 1 month.
 * @returns SQL query object
*/
export const getAvailableEpisodes = (): Query.preparedQuery => {
  return {
    text: ` SELECT ep.id, ep.season_number, ep.episode_number, ep.publishing_date
            FROM "episode" ep
              LEFT JOIN (SELECT "movie".id, "movie".episode_id FROM movie) mv 
                ON mv.episode_id = ep.id
              WHERE mv.id IS NULL
              AND ep.publishing_date <= NOW()
              AND ep.publishing_date > NOW() - INTERVAL '1 month'
              ORDER BY ep.publishing_date ASC
              LIMIT 5
            ;`,
    values: [],
  };
};

// NOTE: This function is a WIP, not currently in use.
// /**
//  * **getEpisodes**
//  * @description Get episodes according to query.
//  * @param querystring URL querystring.
//  * @returns SQL query object
// */
// export const getEpisodes = (
//   querystring: Query.querystring,
//   getAvailable = true
// ): Query.preparedQuery => {
//   const enumerator = ['id', 'season_number'];
//   const { where, limit, sort } = querystring;
//   let values = [] as Array<unknown>,
//     WHERE = { query: '', count: 0, values: [] as Array<unknown> },
//     ORDERBY = '',
//     LIMIT = '';

//   // Build WHERE query
//   if (where) {
//     WHERE = queryBuilder.where(where, 'AND', enumerator);
//     values = WHERE.values as Array<unknown>;
//   }
//   // Build ORDERBY query
//   if (sort === 'asc' || sort === 'desc') {
//     ORDERBY = `ORDER BY id ${sort}`;
//   }
//   // Build LIMIT query
//   if (typeof limit === 'number' && limit > 0) {
//     LIMIT = `LIMIT ${limit}`;
//   }

//   // TODO: Make a is_booked equivalent selector
//   return {
//     text: ` SELECT ep.id, ep.season_number, ep.episode_number, ep.publishing_date, mv.id as movie_id
//             FROM "episode" ep
//               LEFT JOIN (SELECT "movie".id, "movie".episode_id FROM movie) mv 
//                 ON mv.episode_id = ep.id
//               WHERE mv.id ${getAvailable? 'IS NULL' : 'IS NOT NULL'}
//             ${WHERE?.count ? `AND ${WHERE.query}` : ''}
//             ${ORDERBY}
//             ${LIMIT};`,
//     values,
//   };
// };
