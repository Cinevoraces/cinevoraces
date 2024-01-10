import { ESchemasIds } from '../enums/_index';

export const IEpisode = {
    $id: ESchemasIds.IEpisode,
    required: ['id', 'season_number', 'episode_number', 'publishing_date'],
    type: 'object',
    properties: {
        id: { type: 'number' },
        season_number: { type: 'number' },
        episode_number: { type: 'number' },
        publishing_date: { type: 'string' },
        movie_id: { type: 'number' },
    },
};
