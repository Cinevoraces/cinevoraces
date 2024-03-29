export interface Movie {
    id: number;
    author_id: number;
    season_number: number;
    episode_number: number;
    is_published: boolean;
    french_title: string;
    original_title: string;
    document_group_id: number;
    casting: Array<string>;
    directors: Array<string>;
    runtime: number;
    publishing_date: string;
    release_date: string;
    genres: Array<string>;
    countries: Array<string>;
    languages: Array<string>;
    presentation: {
        author_id: number;
        author_pseudo: string;
        author_avatar: string;
        author_role: number;
        presentation: string;
    };
    metrics: {
        watchlist_count: number;
        views_count: number;
        likes_count: number;
        ratings_count: number;
        avg_rating: number;
    };
    comments: Array<{
        author_id: number;
        author_pseudo: string;
        author_avatar: string;
        author_role: number;
        comment: string;
        rating: number;
        created_at: string;
        updated_at: string;
    }>;
    user_review: {
        bookmarked: boolean;
        viewed: boolean;
        liked: boolean;
        rating: number;
    };
    created_at: string;
    updated_at: null;
}
