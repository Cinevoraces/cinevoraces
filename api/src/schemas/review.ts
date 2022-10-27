const reviewSchema = {
  $id: 'review',
  type: 'object',
  properties: {
    author_id: { type: 'number' },
    author_pseudo: { type: 'number' },
    author_mail: { type: 'boolean' },
    author_role: { type: 'boolean' },
    author_avatar: { type: 'boolean' },
    member_since: { type: 'number' },
    comment: { type: 'string' },
    movie: {
      type: 'object',
      properties: {
        id: { type: 'number' },
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
