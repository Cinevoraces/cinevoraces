import type { UserReview, MinimalMovie } from './index';

export default interface User {
  avatar_url: string;
  created_at: string;
  id: number;
  mail: string;
  pseudo: string;
  role: string;
  updated_at: string;
  propositions: MinimalMovie[];
  reviews: UserReview[];
  metrics: {[key: string]: number };
}
