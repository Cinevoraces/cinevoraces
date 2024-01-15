import type { ReducedMovie } from './ReducedMovie';
import type { UserMetrics } from './UserMetrics';

export interface User {
    id: number;
    pseudo: string;
    mail: string;
    role: number;
    created_at: string;
    updated_at: string;
    propositions: Array<ReducedMovie>;
    movies: Array<ReducedMovie>;
    reviews: Array<{
        movie_id: number;
        bookmarked: boolean;
        liked: boolean;
        viewed: boolean;
        rating: number;
        comment: string;
        created_at: string;
        updated_at: string;
    }>;
    metrics: UserMetrics;
}
