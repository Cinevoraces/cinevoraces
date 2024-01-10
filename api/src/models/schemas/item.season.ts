import { ESchemasIds } from '../enums/_index';

export const ISeason = {
    $id: ESchemasIds.ISeason,
    type: 'object',
    required: ['season_number', 'year', 'movie_count'],
    properties: {
        season_number: { type: 'number' },
        year: { type: 'number' },
        movie_count: { type: 'number' },
    },
};
