import { ESchemasIds } from '../enums/_index';

export const GETSeasons = {
  $id: ESchemasIds.GETSeasons,
  description: `
  **Get seasons objects**
  `,
  tags: ['Seasons'],
  response: {
    '200': {
      type: 'array',
      items: { $ref: `${ESchemasIds.ISeason}#` },
    },
  },
};