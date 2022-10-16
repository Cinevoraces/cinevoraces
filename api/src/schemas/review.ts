const reviewSchema = {
  $id: 'review',
  type: 'object',
  properties: {
    user_id: {
      type: 'number',
    },
    movie_id: {
      type: 'number',
    },
    bookmarked: {
      type: 'boolean',
    },
    viewed: {
      type: 'boolean',
    },
    liked: {
      type: 'boolean',
    },
    rating: {
      type: 'number',
    },
    comment: {
      type: 'string',
    },
    created_at: {
      type: 'string',
    },
    updated_at: {
      type: 'string',
    },
  },
  required: [
    'user_id',
    'movie_id',
    'bookmarked',
    'viewed',
    'liked',
    'rating',
    'comment',
    'created_at',
    'updated_at',
  ],
};

export default reviewSchema;
