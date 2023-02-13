import type { UserReview, CompleteMovie, MovieWithPresentation } from './index';

export default interface User {
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
