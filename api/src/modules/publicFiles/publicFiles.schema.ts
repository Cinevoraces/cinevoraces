import type { FastifySchema } from 'fastify';

export const publicFilesPostersSchema: FastifySchema = {
  description: `
  Get a movie poster by its filename.
  `,
  tags: ['FilesAPI'],
  params: {
    type: 'object',
    properties: {
      fileName: { type: 'string' },
    },
  },
};

export const publicFilesAdminGetAllPostersSchema: FastifySchema = {
  description: `
  **THIS ROUTE IS NOT INTENDED TO BE USED IN PRODUCTION.**
  Look for every movie that has a poster stored in TMDB's API,
  fetch the poster and store it locally.
  `,
  tags: ['FilesAPI'],
};
