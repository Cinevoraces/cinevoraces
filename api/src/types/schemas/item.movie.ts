import { ESchemasIds } from '../enums/ESchemasIds';

export const IMovie = {
    $id: ESchemasIds.IMovie,
    type: 'object',
    properties: {
        id: { type: 'number' },
        author_id: { type: 'number' },
        season_number: { type: 'number' },
        episode_number: { type: 'number' },
        is_published: { type: 'boolean' },
        french_title: { type: 'string' },
        original_title: { type: 'string' },
        document_group_id: { type: 'number' },
        casting: {
            type: 'array',
            items: { type: 'string' },
        },
        directors: {
            type: 'array',
            items: { type: 'string' },
        },
        runtime: { type: 'number' },
        publishing_date: { type: 'string' },
        release_date: { type: 'string' },
        genres: {
            type: 'array',
            items: { type: 'string' },
        },
        countries: {
            type: 'array',
            items: { type: 'string' },
        },
        languages: {
            type: 'array',
            items: { type: 'string' },
        },
        presentation: {
            type: 'object',
            properties: {
                author_id: { type: 'number' },
                author_pseudo: { type: 'string' },
                author_role: { type: 'number' },
                presentation: { type: 'string' },
            },
        },
        metrics: {
            type: 'object',
            properties: {
                watchlist_count: { type: 'number' },
                views_count: { type: 'number' },
                likes_count: { type: 'number' },
                ratings_count: { type: 'number' },
                avg_rating: { type: 'number' },
            },
        },
        comments: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    author_id: { type: 'number' },
                    author_pseudo: { type: 'string' },
                    author_role: { type: 'number' },
                    comment: { type: 'string' },
                    rating: { type: 'number' },
                    created_at: { type: 'string' },
                    updated_at: { type: 'string' },
                },
            },
        },
        user_review: {
            type: 'object',
            properties: {
                bookmarked: { type: 'boolean' },
                viewed: { type: 'boolean' },
                liked: { type: 'boolean' },
                rating: { type: 'number' },
            },
        },
        created_at: { type: 'string' },
        updated_at: { type: 'null' },
    },
    required: ['id', 'author_id', 'season_number', 'is_published', 'french_title', 'original_title', 'publishing_date'],
};

export const IReducedMovie = {
    $id: ESchemasIds.IReducedMovie,
    type: 'object',
    properties: {
        movie_id: { type: 'number' },
        season_number: { type: 'number' },
        french_title: { type: 'string' },
        original_title: { type: 'string' },
        document_group_id: { type: 'number' },
        publishing_date: { type: 'string' },
        release_date: { type: 'string' },
        presentation: {
            type: 'object',
            properties: {
                author_id: { type: 'number' },
                author_pseudo: { type: 'string' },
                author_role: { type: 'number' },
                presentation: { type: 'string' },
            },
        },
    },
};
