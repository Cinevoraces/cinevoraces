import type { Query } from '@src/types/Query';
import { queryBuilder } from '@src/utils/queryBuilder';

/**
 * **getMovies**
 * @description Get movies according to query.
 * @param querystring - URL querystring.
 * @returns SQL query object
 */
export const getMovies = (
  querystring: Query.querystring
): Query.preparedQuery => {
  const enums = {
    where: [ 
      'id', 
      'author_id', 
      'season_number', 
      'is_published',
    ],
    select: [
      'casting',
      'directors',
      'runtime',
      'release_date',
      'genres',
      'countries',
      'languages',
      'presentation',
      'metrics',
      'comments',
    ]
  };
  const { select, where, limit, sort } = querystring;
  let values = [] as Array<unknown>,
    SELECT: string = undefined,
    WHERE = { query: '', count: 0, values: [] as Array<unknown> },
    ORDERBY = '',
    LIMIT = '';

  // Build SELECT query
  if (select) {
    SELECT = queryBuilder.select(select, enums.select);
  }
  // Build WHERE query
  if (where) {
    WHERE = queryBuilder.where(where, 'AND', enums.where);
    values = WHERE.values as Array<unknown>;
  }
  // Build ORDERBY query
  if (sort === 'asc' || sort === 'desc') {
    ORDERBY = `ORDER BY id ${sort}`;
  }
  // Build LIMIT query
  if (typeof limit === 'number' && limit > 0) {
    LIMIT = `LIMIT ${limit}`;
  }

  return {
    text: ` SELECT id, author_id, season_number, is_published, 
						french_title, original_title, poster_url, publishing_date
            ${SELECT ? `,${SELECT}` : ''}
            FROM movieview
            ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
            ${ORDERBY}
            ${LIMIT}
    ;`,
    values,
  };
};
