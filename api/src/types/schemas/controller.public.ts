import { ESchemasIds } from '../enums/ESchemasIds';

export const GETFile = {
    $id: ESchemasIds.GETFileByEntityId,
    description: `
  **Get a file using it's entity's id.**  
  For an avatar use the parameter "avatar" followed by the corresponding userId.
  For a movie poster use the parameter "poster" followed by the corresponding movieId.
  `,
    tags: ['Public'],
    params: {
        type: 'object',
        properties: {
            docType: { type: 'string' },
            entityId: { type: 'number' },
        },
    },
};
