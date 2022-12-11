import type { Query } from '@src/types/Query';

/**
 * **getSeasons**
 * @description Get all seasons objects.
 */
export const getAllSeasons = (): Query.preparedQuery => {
  return {
    text: 'SELECT * FROM seasonView;',
    values: [],
  };
};
