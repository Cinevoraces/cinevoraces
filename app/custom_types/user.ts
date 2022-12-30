import type { UserReview, Proposition } from './index';

export default interface User {
  avatar_url: string;
  created_at: string;
  id: number;
  mail: string;
  pseudo: string;
  role: string;
  updated_at: string;
  propositions: Proposition[];
  reviews: UserReview[];
  metrics: {[key: string]: number };
}
