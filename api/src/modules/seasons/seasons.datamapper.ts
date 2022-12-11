import type { Query } from '@src/types/Query';
import type { Payload } from '@src/types/Payload';
import { getFirstMondayOfYear } from '@src/utils/datesHandler';

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

/**
 * **getOneSeasonBySeasonNumber**
 * @description Get one season object by season number.
 */
export const getOneSeasonBySeasonNumber = (
  seasonNumber: number
): Query.preparedQuery => {
  return {
    text: 'SELECT * FROM season WHERE number = $1;',
    values: [seasonNumber],
  };
};

/**
 * **createNewSeason**
 * @description Create new season and all associated episodes.
 */
export const createNewSeason = (
  payload: Payload.createSeason
): Query.preparedQuery => {
  const { year, season_number } = payload;
  const firstMondayOfTheYear = getFirstMondayOfYear(year);

  return {
    text: 'SELECT new_season($1, $2, $3);',
    values: [season_number, year, firstMondayOfTheYear],
  };
};
