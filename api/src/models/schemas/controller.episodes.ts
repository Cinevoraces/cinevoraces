import { ESchemasIds } from '../enums/_index';

export const GETEpisodes = {
  $id: ESchemasIds.GETEpisodes,
  summary: '(TOKEN REQUIRED)',
  description: '**Get episodes**.',
  tags: ['Episodes'],
  response: {
    200: {
      type: 'array',
      items: { $ref: `${ESchemasIds.IEpisode}#` },
    },
  },
};
