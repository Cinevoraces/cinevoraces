import type { UserReview, Proposition, CompleteMovie, MovieWithPresentation } from './index';

export default interface User {
  avatar_url: string;
  created_at: string;
  id: number;
  mail: string;
  pseudo: string;
  role: number;
  updated_at: string;
  reviews: UserReview[];
  metrics?: {[key: string]: number };
  movies?: CompleteMovie[];
  propositions?: MovieWithPresentation[] | [];
}
