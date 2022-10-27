import type { Database } from '@src/types/Database';
import type { Query } from '@src/types/Query';
import { queryBuilder } from '@src/utils/queryBuilder';

/**
 * **updateReview**
 * @description
 * Update one review object.
 */
export const updateReview = (
  updateValues: Record<keyof Pick<Database.review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>, unknown>,
  ids: Record<keyof Pick<Database.review, 'user_id' | 'movie_id'>, number>
): Query.preparedQuery => {
  const QUERY = queryBuilder([
    { columns: updateValues, operator: 'SET', join: ',' },
    { columns: ids, operator: 'WHERE', join: 'AND' }
  ]);
  return {
    text: ` UPDATE "review"
            ${QUERY[0]},
            "updated_at" = NOW()
            ${QUERY[1]};`,
    values: [...Object.values(updateValues), ...Object.values(ids)],
  };
};

/**
 * **getReviews**
 * @description
 * Get reviews object.
 */
export const getReviews = (
  paramObject?: {
    values?: Partial<Record<keyof Database.review, unknown>>,
    select?: Array<'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>,
  }
): Query.preparedQuery => {
  const { values, select } = paramObject;
  const params = [];
  const returnValues: Array<unknown> = [];
  if (select) {
    params.push({ columns: select, operator: 'SELECT', join: ',' }); 
    returnValues.push(Object.values(select));
  }
  if (values) {
    params.push({ columns: values, operator: 'WHERE', join: 'AND' });
    returnValues.push(Object.values(values));
  }

  return {
    text: ` ${select ? params[0] : 'SELECT *'}
            FROM "full_review"
            ${values ? params[1] ? params[1] : params[0] : ''};`,
    values: returnValues,
  };
};
