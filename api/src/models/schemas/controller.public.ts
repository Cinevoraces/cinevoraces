import { ESchemasIds } from '../enums/_index';

export const GETPosterImage = {
  $id: ESchemasIds.GETPosterByFileName,
  description: 'Get poster image\'s public URL.',
  tags: ['Public'],
  params: {
    type: 'object',
    properties: {
      fileName: { type: 'string' },
    },
  },
};
