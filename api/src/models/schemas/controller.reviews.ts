import { ESchemasIds } from '../enums/_index';

export const PUTReviews = {
  $id: ESchemasIds.PUTReviews,
  summary: '(TOKEN REQUIRED)',
  description: `
  **Update one review by user and movie id**.
  Movie's *id* must be set in *params* and access token in bearer to pass user id.
  `,
  tags: ['Reviews'],
  params: {
    type: 'object',
    properties: {
      movieId: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    maxProperties: 1,
    minProperties: 1,
    properties: {
      bookmarked: { type: 'boolean' },
      viewed: { type: 'boolean' },
      liked: { type: 'boolean' },
      rating: { type: 'number' },
      comment: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        review: {
          type: 'object',
          properties: {
            bookmarked: { type: 'boolean' },
            viewed: { type: 'boolean' },
            liked: { type: 'boolean' },
            rating: { type: 'number' },
            comment: { type: 'string' },
          },
        },
      },
      required: ['message', 'review'],
    },
  },
};
