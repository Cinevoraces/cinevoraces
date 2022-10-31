const userSchema = {
  $id: 'user',
  type: 'object',
  properties: {
    id: { type: 'number' },
    pseudo: { type: 'string' },
    mail: { type: 'string' },
    avatar_url: { type: 'string' },
    role: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
    propositions: {
      type: 'array',
      items: { 
        type: 'object',
        properties: {
          movie_id: { type: 'number' },
          season_number: { type: 'number' },
          french_title: { type: 'string' },
          original_title: { type: 'string' },
          poster_url: { type: 'string' },
          presentation: { type: 'string' },
          publishing_date: { type: 'string' },
          avg_rating: { type: 'number' },
        },
      },
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

export default userSchema;
