import type { Review } from '@src/types';

export interface PUTReviewsBody {
    Params: { movieId: number; userId: number };
    Body: Record<
        keyof Pick<Review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>,
        boolean | number | string
    >;
}
