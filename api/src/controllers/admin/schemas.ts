export default [
    {
        $id: 'API:PUT/admin/movies/publish/:id',
        summary: '(TOKEN REQUIRED)',
        description: '**Publish movie**.',
        tags: ['Admin'],
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' },
            },
            required: ['id'],
        },
        body: {
            type: 'object',
            properties: {
                password: { type: 'string' },
            },
            required: ['password'],
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
                required: ['message'],
            },
        },
    },
    {
        $id: 'API:DELETE/admin/movies/:id',
        summary: '(TOKEN REQUIRED)',
        description: '**Delete movie**.',
        tags: ['Admin'],
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' },
            },
            required: ['id'],
        },
        body: {
            type: 'object',
            properties: {
                password: { type: 'string' },
            },
            required: ['password'],
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
                required: ['message'],
            },
        },
    },
    {
        $id: 'API:GET/admin/reviews',
        summary: '(TOKEN REQUIRED)',
        description:
            '**Get reviews:** Use query parameters to filter the results using the following format: **/reviews?select[user_id]=2&select[movie_id]=3**',
        tags: ['Admin'],
        querystring: {
            type: 'object',
            properties: {
                where: {
                    type: 'object',
                    properties: {
                        movie_id: { type: 'number' },
                        author_id: { type: 'number' },
                    },
                },
                limit: { type: 'number' },
                sort: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'array',
                items: { $ref: 'Review#' },
            },
        },
    },
    {
        $id: 'API:DELETE/admin/reviews/:movieId/:userId',
        summary: '(TOKEN REQUIRED)',
        description: '**Delete one review by user and movie id**.',
        tags: ['Admin'],
        params: {
            type: 'object',
            properties: {
                movieId: { type: 'number' },
                userId: { type: 'number' },
            },
            required: ['movieId', 'userId'],
        },
        body: {
            type: 'object',
            required: ['password'],
            properties: {
                password: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
                required: ['message'],
            },
        },
    },
    {
        $id: 'API:POST/seasons',
        summary: '(TOKEN REQUIRED)',
        description: '**Create new season and all associated episodes.**',
        tags: ['Admin'],
        body: {
            type: 'object',
            properties: {
                year: { type: 'number', minimum: 1, maximum: 3000 },
                season_number: { type: 'number', minimum: 1, maximum: 99 },
            },
        },
        response: {
            '200': {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    {
        $id: 'API:DELETE/admin/users/:id',
        summary: '(TOKEN REQUIRED)',
        description: '**Delete user by id:** Route protected by *admin* role. You must provide the password as well.',
        tags: ['Admin'],
        body: {
            type: 'object',
            required: ['password'],
            properties: {
                password: { type: 'string' },
            },
        },
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' },
            },
            required: ['id'],
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
                required: ['message'],
            },
        },
    },
    {
        $id: 'API:PUT/admin/movies/update-posters',
        summary: '(TOKEN REQUIRED)',
        description:
            '**Update movies posters that point to a TMDB url. Downloads the poster and update the url in database.**.',
        tags: ['Admin'],
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
                required: ['message'],
            },
        },
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
            required: ['message'],
        },
    },
];

declare module 'fastify' {
    interface FastifyInstance {
        getSchema(
            id:
                | 'API:PUT/admin/movies/publish/:id'
                | 'API:DELETE/admin/movies/:id'
                | 'API:GET/admin/reviews'
                | 'API:DELETE/admin/reviews/:movieId/:userId'
                | 'API:POST/seasons'
                | 'API:DELETE/admin/users/:id'
                | 'API:PUT/admin/movies/update-posters',
        ): FastifySchema;
    }
}
