import { ESchemasIds } from '../enums/_index';

export const GETPosterImage = {
  $id: ESchemasIds.GETPosterById,
  description: 'Get movie poster file.',
  tags: ['Public'],
  params: {
    type: 'object',
    properties: {
      movieId: { type: 'number' },
    },
  },
};

export const GETAvatarImage = {
  $id: ESchemasIds.GETAvatarById,
  description: 'Get user avatar.',
  tags: ['Public'],
  params: {
    type: 'object',
    properties: {
      userId: { type: 'number' },
    },
  },
};
