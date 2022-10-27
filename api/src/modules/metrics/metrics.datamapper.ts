import type { Query } from '@src/types/Query';

/**
 * **getGlobalMetrics**
 * @description
 * Get website global metrics.
 */
export const getGlobalMetrics = (): Query.preparedQuery => {
  return {
    text: 'SELECT * FROM metricsView;',
    values: [],
  };
};
