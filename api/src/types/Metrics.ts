declare namespace Metrics {
  interface global {
    seasons_count: number;
    movies_count: number;
    countries_count: number;
  }
  interface user {
    id?: number;
    propositions_count: number;
    comments_count: number;
    likes_count: number;
    watchlist_count: number;
    ratings_count: number;
  }
}

export type { Metrics };
