export interface MinimalMovie {
  id: number;
  author_id: number;
  season_number: number;
  is_published: boolean;
  french_title: string;
  original_title: string;
  poster_url: string;
}

export interface Presentation{
  author_id: number;
  author_pseudo: string;
  author_avatar: string;
  author_role: string;
  presentation: string;
}

export interface Metrics {
  watchlist_count: number;
  views_count: number;
  likes_count: number;
  ratings_count: number;
  avg_rating: number;
  [key: string]: number;
}

export interface Comment {
  author_id: number;
  author_pseudo: string;
  author_avatar: string;
  author_role: string;
  comment: string;
  rating: number;
  created_at: string;
  updated_at: string
}

export interface UserReview {
  bookmarked: boolean;
  viewed: boolean;
  liked: boolean;
  rating: number | null;
  comment: string | null;
}
export interface CompleteMovie extends MinimalMovie {
  casting: string[];
  directors: string[];
  runtime: number;
  publishing_date: string;
  release_date: string;
  genres: string[];
  countries: string[];
  languages: string[];
  presentation: Presentation;
  metrics: Metrics;
  comments: Comment[];
  user_review?: UserReview;
  created_at: string;
  updated_at: string | null;
  [key: string]: string[] | number | string | boolean | Presentation | Metrics | Comment[] | UserReview | null | undefined
}
