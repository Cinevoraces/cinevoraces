export const userSchema = {
  $id: 'user',
  type: 'object',
  properties: {
    id: { type: 'number' },
    pseudo: { type: 'string' },
    mail: { type: 'string' },
    avatar_url: { type: 'string' },
    role: { type: 'number' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
    propositions: { 
      type: 'array',
      items: { $ref: 'reducedMovie#' },
    },
    movies: {
      type: 'array',
      items: { $ref: 'reducedMovie#' },
    },
    reviews: {
      type: 'array',
      items: { 
        type: 'object',
        properties: {
          movie_id: { type: 'number' },
          bookmarked: { type: 'boolean' },
          liked: { type: 'boolean' },
          viewed: { type: 'boolean' },
          rating: { type: 'number' },
          comment: { type: 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
        },
      },
    },
    metrics: { $ref: 'userMetrics#' },
  },
  required: [
    'id',
    'pseudo',
    'mail',
    'avatar_url',
    'role',
    'created_at',
    'updated_at',
  ],
};
