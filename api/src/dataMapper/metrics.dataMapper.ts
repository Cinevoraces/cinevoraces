import type { Query } from '@src/types/Query';

/**
 * **getGlobalMetrics**
 * @description
 * Get website global metrics.
 */
export const getGlobalMetrics = (): Query.preparedQuery => {
  return {
    text: 'SELECT * FROM global_metrics;',
    values: [],
  };
};

/**
 * **getGlobalMetrics**
 * @param id - number
 * @description
 * Get All users metrics.
 */
export const getUsersMetrics = (
  id?: number
): Query.preparedQuery => { 
  return {
    text: ` SELECT * FROM indiv_actions_metrics
            ${id ? 'WHERE id=$1' : ''};`,
    values: id ? [id] : [],
  };
};
