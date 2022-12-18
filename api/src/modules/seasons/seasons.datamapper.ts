import type { Query } from '../../types/_index';
import { getFirstMondayOfYear } from '../../utils/datesHandler';

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
  payload: {
    year: number;
    season_number: number;
  }
): Query.preparedQuery => {
  const { year, season_number } = payload;
  const firstMondayOfTheYear = getFirstMondayOfYear(year);

  return {
    text: 'SELECT new_season($1, $2, $3);',
    values: [season_number, year, firstMondayOfTheYear],
  };
};
