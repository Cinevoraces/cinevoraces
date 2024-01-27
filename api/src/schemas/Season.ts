export const Season = {
    $id: 'Season',
    type: 'object',
    required: ['season_number', 'year', 'movie_count'],
    properties: {
        season_number: { type: 'number' },
        year: { type: 'number' },
        movie_count: { type: 'number' },
    },
};
