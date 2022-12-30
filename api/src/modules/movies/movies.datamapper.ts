import type {
  Query,
  proposeMovie as TProposeMovie,
  updateProposedMovie as TUpdateProposedMovie
} from '../../types/_index';
import { queryBuilder } from '../../utils/queryBuilder';

/**
 * **getMovies**
 * @description Get movies according to query.
 * @param querystring URL querystring.
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
      'french_title',
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
    ORDERBY = `ORDER BY publishing_date ${sort}`;
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

/**
 * **proposeMovie**
 * @description create a movie.
 * @param payload movie object.
 * @returns SQL query object
 */
export const proposeMovie = (
  payload: TProposeMovie
): Query.preparedQuery => {
  console.log(payload);
  return {
    text: 'SELECT new_movie($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
    values: Object.values(payload)
  };
};

/**
 * **updateProposedMovie**
 * @description update a proposed movie.
 * @param payload updateMovie object.
 * @returns SQL query object
 */
export const updateProposedMovie = (
  payload: TUpdateProposedMovie
): Query.preparedQuery => {
  const { movie_id, presentation } = payload;
  return {
    text: 'UPDATE movie SET presentation = $1 WHERE id = $2;',
    values: [presentation, movie_id]
  };
};

/**
 * **publishMovie**
 * @description publish a proposed movie.
 * @param id movie id.
 * @returns SQL query object
 */
export const publishMovie = (
  id: number
): Query.preparedQuery => {
  return {
    text: 'UPDATE movie SET is_published = true WHERE id = $1;',
    values: [id]
  };
};

/**
 * **deleteMovie**
 * @description delete a movie.
 * @param id movie id.
 * @returns SQL query object
 */
export const deleteMovie = (
  id: number
): Query.preparedQuery => {
  return {
    text: 'DELETE FROM movie WHERE id = $1;',
    values: [id]
  };
};
