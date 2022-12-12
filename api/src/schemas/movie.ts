export const movieSchema = {
  $id: 'movie',
  type: 'object',
  properties: {
    id: { type: 'number' },
    author_id: { type: 'number' },
    season_number: { type: 'number' },
    is_published: { type: 'boolean' },
    french_title: { type: 'string' },
    original_title: { type: 'string' },
    poster_url: { type: 'string' },
    casting: {
      type: 'array',
      items: { type: 'string' },
    },
    directors: {
      type: 'array',
      items: { type: 'string' },
    },
    runtime: { type: 'number' },
    publishing_date: { type: 'string' },
    release_date: { type: 'string' },
    genres: {
      type: 'array',
      items: { type: 'string' },
    },
    countries: {
      type: 'array',
      items: { type: 'string' },
    },
    languages: {
      type: 'array',
      items: { type: 'string' },
    },
    presentation: {
      type: 'object',
      properties: {
        author_id: { type: 'number' },
        author_pseudo: { type: 'string' },
        author_avatar: { type: 'string' },
        author_role: { type: 'string' },
        presentation: { type: 'string' },
      },
    },
    metrics: {
      type: 'object',
      properties: {
        watchlist_count: { type: 'number' },
        views_count: { type: 'number' },
        likes_count: { type: 'number' },
        ratings_count: { type: 'number' },
        avg_rating: { type: 'number' },
      },
    },
    comments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          author_id: { type : 'number' },
          author_pseudo: { type : 'string' },
          author_avatar: { type : 'string' },
          author_role: { type : 'string' },
          comment: { type : 'string' },
          rating: { type : 'number' },
          created_at: { type : 'string' },
          updated_at: { type : 'string' },
        },
      },
    },
    user_review: {
      type: 'object',
      properties: {
        bookmarked: { type: 'boolean' },
        viewed: { type: 'boolean' },
        liked: { type: 'boolean' },
        rating: { type: 'number' },
      },
    },
    created_at: { type: 'string' },
    updated_at: { type: 'null' },
  },
  required: [
    'id',
    'author_id',
    'season_number',
    'is_published',
    'french_title',
    'original_title',
    'poster_url',
    'publishing_date',
  ],
};
