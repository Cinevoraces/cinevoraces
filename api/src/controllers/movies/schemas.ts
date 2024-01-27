export default [
    {
        $id: 'API:GET/movies',
        description:
            '**Get movies:** Use query parameters to filter the results using the following format: */movies?where[is_published]=true&select[metrics]=true&limit=5&sort=desc*. To access users related filters, the accessToken is needed. Using thoses will return only movies where the user has an **review object**.',
        tags: ['Movies'],
        querystring: {
            type: 'object',
            properties: {
                where: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        author_id: { type: 'number' },
                        season_number: { type: 'number' },
                        is_published: { type: 'boolean' },
                        bookmarked: { type: 'boolean' },
                        viewed: { type: 'boolean' },
                        liked: { type: 'boolean' },
                        rating: { type: 'number' || 'null' },
                    },
                },
                select: {
                    type: 'object',
                    properties: {
                        casting: { type: 'boolean' },
                        directors: { type: 'boolean' },
                        runtime: { type: 'boolean' },
                        episode_number: { type: 'boolean' },
                        release_date: { type: 'boolean' },
                        genres: { type: 'boolean' },
                        countries: { type: 'boolean' },
                        languages: { type: 'boolean' },
                        presentation: { type: 'boolean' },
                        metrics: { type: 'boolean' },
                        comments: { type: 'boolean' },
                    },
                },
                limit: { type: 'number' },
                sort: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'array',
                items: { $ref: 'Movie#' },
            },
        },
    },
    {
        $id: 'API:GET/movies/random-posters/:count',
        description: '**Get random movie ids with french title in order to use theme for poster request**.',
        tags: ['Movies'],
        params: {
            type: 'object',
            properties: {
                count: { type: 'number' },
            },
        },
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['id', 'french_title'],
                    properties: {
                        id: { type: 'number' },
                        french_title: { type: 'string' },
                    },
                },
            },
        },
    },
    {
        $id: 'API:POST/movies',
        summary: '(TOKEN REQUIRED)',
        description: '**Propose movie**.',
        tags: ['Movies'],
        body: {
            type: 'object',
            properties: {
                french_title: { type: 'string' },
                original_title: { type: 'string' },
                directors: { type: 'array', items: { type: 'string' } },
                release_date: { type: 'string' },
                runtime: { type: 'number' },
                casting: { type: 'array', items: { type: 'string' } },
                presentation: { type: 'string', maxLength: 2500, minLength: 250 },
                movie_genres: { type: 'array', items: { type: 'string' } },
                movie_languages: { type: 'array', items: { type: 'string' } },
                movie_countries: { type: 'array', items: { type: 'string' } },
                episode_id: { type: 'number' },
            },
            required: [
                'french_title',
                'original_title',
                'directors',
                'release_date',
                'runtime',
                'casting',
                'presentation',
                'movie_genres',
                'movie_languages',
                'movie_countries',
                'episode_id',
            ],
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
                required: ['message'],
            },
        },
    },
    {
        $id: 'API:PUT/movies',
        summary: '(TOKEN REQUIRED)',
        description: '**Propose movie**.',
        tags: ['Movies'],
        body: {
            type: 'object',
            properties: {
                movie_id: { type: 'number' },
                presentation: { type: 'string' },
            },
            required: ['movie_id', 'presentation'],
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
];

declare module 'fastify' {
    interface FastifyInstance {
        getSchema(
            id: 'API:GET/movies' | 'API:GET/movies/random-posters/:count' | 'API:POST/movies' | 'API:PUT/movies',
        ): FastifySchema;
    }
}
