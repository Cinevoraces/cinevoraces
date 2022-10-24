export interface Review {
  user_id: number;
  movie_id: number;
  bookmarked: boolean;
  viewed: boolean;
  liked: boolean;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
};
