import type { PUserMetrics, PReducedMovie } from './_index';

export interface PUser {
  id: number,
  pseudo: string,
  mail: string,
  role: number,
  created_at: string,
  updated_at: string,
  propositions: Array<PReducedMovie>,
  movies: Array<PReducedMovie>,
  reviews: Array<{
    movie_id: number,
    bookmarked: boolean,
    liked: boolean,
    viewed: boolean,
    rating: number,
    comment: string,
    created_at: string,
    updated_at: string,
  }>,
  metrics: PUserMetrics,
}
