declare namespace Database {
  type dataEnum = 
  'country' 
  | 'genre' 
  | 'language' 
  | 'movie' 
  | 'comment'
  | 'movie_has_country'
  | 'movie_has_genre'
  | 'movie_has_language'
  | 'proposition_slot'
  | 'review'
  | 'season'
  | 'user';
  
  interface country {
    id: number
    name: string
    created_at: Date
  }

  interface genre {
    id: number
    name: string
    created_at: Date
  }

  interface language {
    id: number
    name: string
    created_at: Date
  }
  
  interface movie {
    id: number
    french_title: string
    original_title: string
    poster_url: string
    directors: string[]
    release_date: Date
    runtime: number
    casting: string[]
    presentation: string
    is_published: boolean | null
    publishing_date: Date
    user_id: number
    season_id: number
    created_at: Date
    updated_at: Date | null
  }
  
  interface movie_has_country {
    movie_id: number
    country_id: number
    created_at: Date
  }
  
  interface movie_has_genre {
    movie_id: number
    genre_id: number
    created_at: Date
  }
  
  interface movie_has_language {
    movie_id: number
    language_id: number
    created_at: Date
  }
  
  interface proposition_slot {
    id: number
    season_number: number
    episode: number
    publishing_date: Date
    is_booked: boolean | null
  }
  
  interface review {
    user_id: number
    movie_id: number
    bookmarked: boolean
    viewed: boolean
    liked: boolean
    rating: number | null
    comment: string | null
    created_at: Date
    updated_at: Date | null
  }
  
  interface season {
    id: number
    number: number
    year: number
    created_at: Date
  }
  
  interface user {
    id: number
    pseudo: string
    mail: string
    password: string
    avatar_url: string | null
    mail_sub: boolean | null
    role: string
    created_at: Date
    updated_at: Date | null
  }
}

export type { Database };
