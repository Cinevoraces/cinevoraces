export default {
  error: expect.objectContaining({
    message: expect.any(String),
    statusCode: expect.any(Number),
  }),
  metricsGlobal: expect.objectContaining({
    seasons_count: expect.any(Number),
    movies_count: expect.any(Number),
    countries_count: expect.any(Number),
  }),
  metricsUser: expect.objectContaining({
    id: expect.any(Number),
    propositions_count: expect.any(Number),
    comments_count: expect.any(Number),
    likes_count: expect.any(Number),
    watchlist_count: expect.any(Number),
    ratings_count: expect.any(Number),
  }),
  movie: expect.objectContaining({
    id: expect.any(Number),
    french_title: expect.any(String),
    original_title: expect.any(String),
    poster_url: expect.any(String),
    directors: expect.arrayContaining([expect.any(String)]),
    release_date: expect.any(String),
    runtime: expect.any(Number),
    casting: expect.arrayContaining([expect.any(String)]),
    presentation: expect.any(String),
    is_published: expect.any(Boolean),
    publishing_date: expect.any(String),
    season_id: expect.any(Number),
    countries: expect.arrayContaining([expect.any(String)]),
    genres: expect.arrayContaining([expect.any(String)]),
    languages: expect.arrayContaining([expect.any(String)]),
    user: expect.objectContaining({
      id: expect.any(Number),
      pseudo: expect.any(String),
      avatar_url: expect.any(String),
    }),
  }),
  moviesFilteredBySeason: expect.objectContaining({
    id: expect.any(Number),
    french_title: expect.any(String),
    original_title: expect.any(String),
    poster_url: expect.any(String),
    directors: expect.arrayContaining([expect.any(String)]),
    release_date: expect.any(String),
    runtime: expect.any(Number),
    casting: expect.arrayContaining([expect.any(String)]),
    presentation: expect.any(String),
    is_published: true,
    publishing_date: expect.any(String),
    season_id: 3,
    countries: expect.arrayContaining([expect.any(String)]),
    genres: expect.arrayContaining([expect.any(String)]),
    languages: expect.arrayContaining([expect.any(String)]),
    user: expect.objectContaining({
      id: expect.any(Number),
      pseudo: expect.any(String),
      avatar_url: expect.any(String),
    }),
  }),
  moviesFilteredByUserId: expect.objectContaining({
    id: expect.any(Number),
    french_title: expect.any(String),
    original_title: expect.any(String),
    poster_url: expect.any(String),
    directors: expect.arrayContaining([expect.any(String)]),
    release_date: expect.any(String),
    runtime: expect.any(Number),
    casting: expect.arrayContaining([expect.any(String)]),
    presentation: expect.any(String),
    is_published: expect.any(Boolean),
    publishing_date: expect.any(String),
    season_id: expect.any(Number),
    countries: expect.arrayContaining([expect.any(String)]),
    genres: expect.arrayContaining([expect.any(String)]),
    languages: expect.arrayContaining([expect.any(String)]),
    user: expect.objectContaining({
      id: expect.any(Number),
      pseudo: expect.any(String),
      avatar_url: expect.any(String),
    }),
  }),
  moviePopulatedWithReview: expect.objectContaining({
    id: expect.any(Number),
    french_title: expect.any(String),
    original_title: expect.any(String),
    poster_url: expect.any(String),
    directors: expect.arrayContaining([expect.any(String)]),
    release_date: expect.any(String),
    runtime: expect.any(Number),
    casting: expect.arrayContaining([expect.any(String)]),
    presentation: expect.any(String),
    is_published: expect.any(Boolean),
    publishing_date: expect.any(String),
    season_id: expect.any(Number),
    countries: expect.arrayContaining([expect.any(String)]),
    genres: expect.arrayContaining([expect.any(String)]),
    languages: expect.arrayContaining([expect.any(String)]),
    reviews: expect.arrayContaining([
      expect.objectContaining({
        user_id: expect.any(Number),
        bookmarked: expect.any(Boolean),
        liked: expect.any(Boolean),
        viewed: expect.any(Boolean),
        rating: expect.any(Number),
        comment: expect.any(String),
      })
    ]),
    user: expect.objectContaining({
      id: expect.any(Number),
      pseudo: expect.any(String),
      avatar_url: expect.any(String),
    }),
  }),
  moviePopulatedWithReviewAsLoggedUser: expect.objectContaining({
    id: expect.any(Number),
    french_title: expect.any(String),
    original_title: expect.any(String),
    poster_url: expect.any(String),
    directors: expect.arrayContaining([expect.any(String)]),
    release_date: expect.any(String),
    runtime: expect.any(Number),
    casting: expect.arrayContaining([expect.any(String)]),
    presentation: expect.any(String),
    is_published: expect.any(Boolean),
    publishing_date: expect.any(String),
    season_id: expect.any(Number),
    countries: expect.arrayContaining([expect.any(String)]),
    genres: expect.arrayContaining([expect.any(String)]),
    languages: expect.arrayContaining([expect.any(String)]),
    user_review: expect.objectContaining({
      bookmarked: expect.any(Boolean),
      liked: expect.any(Boolean),
      viewed: expect.any(Boolean),
      rating: expect.any(Number),
      comment: expect.any(String),
    }),
    reviews: expect.arrayContaining([
      expect.objectContaining({
        user_id: expect.any(Number),
        bookmarked: expect.any(Boolean),
        liked: expect.any(Boolean),
        viewed: expect.any(Boolean),
        rating: expect.any(Number),
        comment: expect.any(String),
      })
    ]),
    user: expect.objectContaining({
      id: expect.any(Number),
      pseudo: expect.any(String),
      avatar_url: expect.any(String),
    }),
  }),
  proposition: expect.objectContaining({
    id: expect.any(Number),
    french_title: expect.any(String),
    poster_url: expect.any(String),
    directors: expect.any(Array),
    genres: expect.any(Array),
    release_date: expect.any(String),
    user_id: expect.any(Number),
    user_pseudo: expect.any(String),
    publishing_date: expect.any(String),
    presentation: expect.any(String),
  }),
  review: expect.objectContaining({
    user_id: expect.any(Number),
    movie_id: expect.any(Number),
    bookmarked: expect.any(Boolean),
    viewed: expect.any(Boolean),
    liked: expect.any(Boolean),
    rating: expect.any(Number),
    comment: expect.any(String),
  }),
  slot: expect.objectContaining({
    id: expect.any(Number),
    season_number: expect.any(Number),
    episode: expect.any(Number),
    publishing_date: expect.any(String),
    is_booked: true,
  }),
  slotsSortedByEpisodes: expect.arrayContaining([
    expect.objectContaining({
      season_number: 2,
      episode: 5,
      is_booked: true,
    }),
    expect.objectContaining({
      season_number: 2,
      episode: 4,
      is_booked: true,
    }),
    expect.objectContaining({
      season_number: 2,
      episode: 3,
      is_booked: true,
    }),
  ]),
  slotsSortedWithAsc: expect.arrayContaining([
    expect.objectContaining({
      season_number: 2,
      episode: 1,
      is_booked: true,
    }),
    expect.objectContaining({
      season_number: 2,
      episode: 2,
      is_booked: true,
    }),
    expect.objectContaining({
      season_number: 2,
      episode: 3,
      is_booked: true,
    }),
  ]),
  user: expect.objectContaining({
    id: expect.any(Number),
    pseudo: expect.any(String),
    mail: expect.any(String),
    avatar_url: expect.any(String),
    role: expect.any(String),
    created_at: expect.anything(),
  }),
  userWithMetrics: expect.objectContaining({
    id: expect.any(Number),
    pseudo: expect.any(String),
    mail: expect.any(String),
    avatar_url: expect.any(String),
    role: expect.any(String),
    created_at: expect.anything(),
    metrics: expect.anything(),
  }),
  userWithMoviesAndReviews: expect.objectContaining({
    id: expect.any(Number),
    pseudo: expect.any(String),
    mail: expect.any(String),
    avatar_url: expect.any(String),
    role: expect.any(String),
    created_at: expect.anything(),
    movies: expect.anything(),
    reviews: expect.anything(),
  }),
  loginResponse: expect.objectContaining({
    user: expect.objectContaining({
      id: expect.any(String),
      pseudo: expect.any(String),
      mail: expect.any(String),
      role: expect.any(String),
      avatar_url: expect.any(String),
    }),
    token: expect.any(String),
    response: expect.any(String)
  }),
  refreshToken: expect.objectContaining({ 
    name: 'refresh_token',
    value: expect.any(String)
  })
};
