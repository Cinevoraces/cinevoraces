export const episodeSchema = {
  $id: 'episode',
  required: [
    'id',
    'season_number',
    'episode_number',
    'publishing_date',
    'is_booked',
  ],
  type: 'object',
  properties: {
    id: { type: 'number' },
    season_number: { type: 'number' },
    episode_number: { type: 'number' },
    publishing_date: { type: 'string' },
    is_booked: { type: 'boolean' },
  },
};
