import { ESchemasIds } from '../enums/_index';

export const PUTMoviesAsAdmin = {
    $id: ESchemasIds.PUTMoviesAsAdmin,
    description: `
  **Publish movie**.
  `,
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
};

export const DELETEMoviesAsAdmin = {
    $id: ESchemasIds.DELETEMoviesAsAdmin,
    description: `
  **Delete movie**.
  `,
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
};

export const GETReviewsAsAdmin = {
    $id: ESchemasIds.GETReviewsAsAdmin,
    description: `
  **Get reviews**.
  Use query parameters to filter the results using the following format: */reviews?select[user_id]=2&select[movie_id]=3*
  **Available filters:**
  - where[movie_id] -> number
  - where[author_id] -> number
  
  **Misc:**
  - limit -> number: *limit the number of results*.
  - sort -> 'asc' | 'desc' as string *(Will sort by id)*
  `,
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
            items: { $ref: `${ESchemasIds.IReview}#` },
        },
    },
};

export const DELETEReviewsAsAdmin = {
    $id: ESchemasIds.DELETEReviewsAsAdmin,
    description: `
  **Delete one review by user and movie id**.
  `,
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
};

export const POSTSeasonsAsAdmin = {
    $id: ESchemasIds.POSTSeasonsAsAdmin,
    description: `
  **Create new season and all associated episodes.**
  `,
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
};

export const DELETEUsersAsAdmin = {
    $id: ESchemasIds.DELETEUsersAsAdmin,
    description: `
  **Delete user by id**.
  Route protected by *admin* role.
  You must provide the password as well.
  `,
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
};

export const PUTMoviesPosterAsAdmin = {
    $id: ESchemasIds.PUTMoviesPosterAsAdmin,
    summary: '(TOKEN REQUIRED)',
    description: `
  **Update movies posters that point to a TMDB url.
    Downloads the poster and update the url in database.**.
  `,
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
};
