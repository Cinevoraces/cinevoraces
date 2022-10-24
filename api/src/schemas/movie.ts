const movieSchema = {
  $id: 'movie',
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    french_title: {
      type: 'string',
    },
    original_title: {
      type: 'string',
    },
    poster_url: {
      type: 'string',
    },
    directors: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    release_date: {
      type: 'string',
    },
    runtime: {
      type: 'number',
    },
    casting: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    presentation: {
      type: 'string',
    },
    is_published: {
      type: 'boolean',
    },
    publishing_date: {
      type: 'string',
    },
    season_id: {
      type: 'number',
    },
    countries: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    genres: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    languages: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    user_review: {
      type: 'object',
      properties: {
        bookmarked: { type: 'boolean' },
        liked: { type: 'boolean' },
        viewed: { type: 'boolean' },
        rating: { type: 'number' },
        comment: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    },
    reviews: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          user_id: { type: 'number' },
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
    user: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        pseudo: { type: 'string' },
        avatar_url: { type: 'string' },
      },
    },
    created_at: {
      type: 'string',
    },
    updated_at: {
      type: 'null',
    },
  },
  required: [
    'id',
    'french_title',
    'original_title',
    'poster_url',
    'directors',
    'release_date',
    'runtime',
    'casting',
    'presentation',
    'is_published',
    'publishing_date',
    'user_id',
    'season_id',
    'created_at',
    'updated_at',
  ],
};

export default movieSchema;
