const reviewSchema = {
  $id: 'review',
  type: 'object',
  properties: {
    movie_id: { type: 'number' },
    author_id: { type: 'number' },
    author_pseudo: { type: 'string' },
    author_mail: { type: 'string' },
    author_role: { type: 'string' },
    author_avatar: { type: 'string' },
    member_since: { type: 'number' },
    comment: { type: 'string' },
    movie: {
      type: 'object',
      properties: {
        french_title: { type: 'string' },
        original_title: { type: 'string' },
        poster_url: { type: 'string' },
        publishing_date: { type: 'string' },
        season_id: { type: 'number' },
      },
    },
  },
  required: [
    'author_id',
    'author_pseudo',
    'author_mail',
    'author_role',
    'author_avatar',
    'member_since',
    'comment',
    'movie',
  ],
};

export default reviewSchema;
