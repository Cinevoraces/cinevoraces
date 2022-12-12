export const slotSchema = {
  $id: 'slot',
  required: [
    'id',
    'season_number',
    'episode',
    'publishing_date',
    'is_booked',
  ],
  type: 'object',
  properties: {
    id: { type: 'number' },
    season_number: { type: 'number' },
    episode: { type: 'number' },
    publishing_date: { type: 'string' },
    is_booked: { type: 'boolean' },
  },
};
