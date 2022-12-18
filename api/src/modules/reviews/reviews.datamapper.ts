import type { review, Query } from '../../types/_index';
import { queryBuilder } from '../../utils/queryBuilder';

// TODO: 2. This function can be deleted once getMovies has been modified.
/**
 * **getReviewsByUserId**
 * @description Get all reviews from a user.
 * @param id user id
 * @returns SQL query object
 */
export const getReviewsByUserId = (
  id: number
): Query.preparedQuery => {
  return {
    text: `
      SELECT movie_id, user_id, bookmarked, liked, viewed, rating
      FROM "review"
      WHERE user_id = $1;`,
    values: [id],
  };
};

/**
 * **getOneReview**
 * @description
 * Get one review object containing the following fields:  
 * *bookmarked, viewed, liked, rating, comment*.
 * @param ids Object containing *movie_id, user_id*.
 * @returns SQL query object
 */
export const getOneReview = (
  ids: Record<keyof Pick<review, 'user_id' | 'movie_id'>, number>
): Query.preparedQuery => {
  const { user_id, movie_id } = ids;
  return {
    text: ` SELECT bookmarked, viewed, liked, rating, comment
            FROM "review"
            WHERE user_id=$1 AND movie_id=$2;`,
    values: [user_id, movie_id],
  };
};

/**
 * **updateReview**
 * @description
 * Update one review object with only one given value.
 * @param updateValue - Object containing only one of the following keys: *bookmarked, viewed, liked, rating, comment*.
 * @param ids Object containing *movie_id, user_id*.
 * @returns SQL query object
 * @securityNote
 * This route is protected with schema validation. 
 * **column** can't be anything else than *'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'*. 
 */
export const updateReview = (
  updateValue: Record<keyof Pick<review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>, boolean | number | string>,
  ids: Record<keyof Pick<review, 'user_id' | 'movie_id'>, number>
): Query.preparedQuery => {
  const { user_id, movie_id } = ids;
  const column = Object.keys(updateValue)[0];
  const value = updateValue[column as keyof typeof updateValue];
  return {
    text: ` UPDATE "review"
            SET ${column} = $3,
            "updated_at" = NOW()
            WHERE user_id=$1 AND movie_id=$2;`,
    values: [user_id, movie_id, value],
  };
};

/**
 * **adminGetReviews**
 * @description Get reviews according to query.
 * @param querystring URL querystring.
 * @returns SQL query object
 */
export const adminGetReviews = (
  querystring: Query.querystring
): Query.preparedQuery => {
  const enumerator = [ 'author_id', 'movie_id'];
  const { where, limit, sort } = querystring;
  let values = [] as Array<unknown>,
    WHERE = { query: '', count: 0, values: [] as Array<unknown> },
    ORDERBY = '',
    LIMIT = '';

  // Build WHERE query
  if (where) {
    WHERE = queryBuilder.where(where, 'AND', enumerator);
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
    text: ` SELECT * FROM reviewview
            ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
            ${ORDERBY}
            ${LIMIT};`,
    values,
  };
};

/**
 * **adminDeleteComment**
 * @description Update one review with comment set to "null".
 * @param ids Object containing *movie_id, user_id*.
 * @returns SQL query object
 */
export const adminDeleteComment = (
  ids: Record<keyof Pick<review, 'user_id' | 'movie_id'>, number>
): Query.preparedQuery => {
  const { user_id, movie_id } = ids;
  return {
    text: ` UPDATE review 
            SET comment = null 
            WHERE user_id=$1 AND movie_id=$2;`,
    values: [user_id, movie_id],
  };
};
