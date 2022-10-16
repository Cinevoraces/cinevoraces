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
    user_id: {
      type: 'number',
    },
    season_id: {
      type: 'number',
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
