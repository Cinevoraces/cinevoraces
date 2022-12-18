import type { Query } from '../../types/_index';

/**
 * **getGlobalMetrics**
 * @description Get website global metrics.
 */
export const getGlobalMetrics = (): Query.preparedQuery => {
  return {
    text: 'SELECT * FROM metricsView;',
    values: [],
  };
};
