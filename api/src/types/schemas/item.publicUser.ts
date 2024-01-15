import { ESchemasIds } from '../enums/ESchemasIds';

export const IPublicUser = {
    $id: ESchemasIds.IPublicUser,
    type: 'object',
    properties: {
        id: { type: 'number' },
        pseudo: { type: 'string' },
        role: { type: 'number' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        propositions: {
            type: 'array',
            items: { $ref: `${ESchemasIds.IReducedMovie}#` },
        },
        movies: {
            type: 'array',
            items: { $ref: `${ESchemasIds.IReducedMovie}#` },
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
        metrics: { $ref: `${ESchemasIds.IUserMetrics}#` },
    },
    required: ['id', 'pseudo', 'role', 'created_at', 'updated_at'],
};
