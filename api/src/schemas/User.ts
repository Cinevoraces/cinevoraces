export const PublicUser = {
    $id: 'PublicUser',
    type: 'object',
    properties: {
        id: { type: 'number' },
        pseudo: { type: 'string' },
        role: { type: 'number' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        propositions: {
            type: 'array',
            items: { $ref: 'ReducedMovie#' },
        },
        movies: {
            type: 'array',
            items: { $ref: 'ReducedMovie#' },
        },
        reviews: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    movie_id: { type: 'number' },
                    bookmarked: { type: 'boolean' },
                    liked: { type: 'boolean' },
                    viewed: { type: 'boolean' },
                    rating: { type: 'number' },
                    comment: { type: 'string' },
                    created_at: { type: 'string' },
                    updated_at: { type: 'string' },
                },
            },
        },
        metrics: { $ref: `Metrics#` },
    },
    required: ['id', 'pseudo', 'role', 'created_at', 'updated_at'],
};

export const PrivateUser = {
    $id: 'PrivateUser',
    type: 'object',
    properties: {
        id: { type: 'number' },
        pseudo: { type: 'string' },
        mail: { type: 'string' },
        role: { type: 'number' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        propositions: {
            type: 'array',
            items: { $ref: 'ReducedMovie#' },
        },
        movies: {
            type: 'array',
            items: { $ref: 'ReducedMovie#' },
        },
        reviews: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    movie_id: { type: 'number' },
                    bookmarked: { type: 'boolean' },
                    liked: { type: 'boolean' },
                    viewed: { type: 'boolean' },
                    rating: { type: 'number' },
                    comment: { type: 'string' },
                    created_at: { type: 'string' },
                    updated_at: { type: 'string' },
                },
            },
        },
        metrics: { $ref: `Metrics#` },
    },
    required: ['id', 'pseudo', 'mail', 'role', 'created_at', 'updated_at'],
};
