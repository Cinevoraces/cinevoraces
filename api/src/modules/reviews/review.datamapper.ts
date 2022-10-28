import type { Database } from '@src/types/Database';
import type { Query } from '@src/types/Query';
import { queryBuilder } from '@src/utils/queryBuilder';

/**
 * **updateReview**
 * @description
 * Update one review object with only one given value.
 * @param updateValue - Object containing only one of the following keys: *bookmarked, viewed, liked, rating, comment*.
 * @param ids - Object containing *movie_id, user_id*.
 * @returns SQL query object
 * @securityNote
 * This route is protected with schema validation. 
 * **column** can't be anything else than *'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'*. 
 */
export const updateReview = (
  updateValue: Record<keyof Pick<Database.review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>, boolean | number | string>,
  ids: Record<keyof Pick<Database.review, 'user_id' | 'movie_id'>, number>
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
 * **getOneReview**
 * @description
 * Get one review object containing the following fields: *bookmarked, viewed, liked, rating, comment*.
 * @param ids - Object containing *movie_id, user_id*.
 * @returns SQL query object
 */
export const getOneReview = (
  ids: Record<keyof Pick<Database.review, 'user_id' | 'movie_id'>, number>
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
 * **getReviews**
 * @description
 * Get reviews as admin.
 * @returns SQL query object
 */
export const getReviews = (
  ids?: Partial<Record<'author_id' | 'movie_id', number>>
): Query.preparedQuery => {
  const enumerator = ['author_id', 'movie_id'];
  const query = {
    text: 'SELECT * FROM "reviewview"',
    values: [] as Array<number>,
  };
  if (typeof ids !== 'undefined') {
    const { query: buildedQuery } = queryBuilder(ids, 'AND', enumerator);
    if (buildedQuery !== '') {
      query.text = `${query.text} WHERE ${buildedQuery}`;
      query.values = Object.values(ids);
    }
  }
  return {
    text: `${query.text};`,
    values: query.values,
  };
};
