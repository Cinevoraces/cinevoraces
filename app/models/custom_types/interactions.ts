export default interface Interactions {
  type: 'bookmarked' | 'viewed' | 'liked' | 'rating';
  counterName: 'watchlist_count' | 'views_count' | 'likes_count' | 'ratings_count';
  counter: number;
}
