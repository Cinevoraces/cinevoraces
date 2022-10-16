const propositionSchema = {
  $id: 'proposition',
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    french_title: {
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
    genres: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    release_date: {
      type: 'string',
    },
    user_id: {
      type: 'number',
    },
    user_pseudo: {
      type: 'string',
    },
    publishing_date: {
      type: 'string',
    },
    presentation: {
      type: 'string',
    },
  },
  required: [
    'id',
    'french_title',
    'poster_url',
    'directors',
    'genres',
    'release_date',
    'user_id',
    'user_pseudo',
    'publishing_date',
    'presentation',
  ],
};

export default propositionSchema;
