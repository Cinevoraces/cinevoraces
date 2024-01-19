export default [
    {
        $id: 'API:GET/users',
        description:
            '**Get public users**: Use query parameters to populate the results using the following format: "*/users?select[reviews]=true&where[id]=1*"',
        tags: ['Users'],
        querystring: {
            type: 'object',
            properties: {
                where: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        pseudo: { type: 'string' },
                        mail: { type: 'string' },
                        role: { type: 'string' },
                    },
                },
                select: {
                    type: 'object',
                    properties: {
                        propositions: { type: 'boolean' },
                        movies: { type: 'boolean' },
                        reviews: { type: 'boolean' },
                        metrics: { type: 'boolean' },
                    },
                },
                limit: { type: 'number' },
                sort: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'array',
                items: { $ref: 'PublicUser#' },
            },
        },
    },
    {
        $id: 'API:GET/users/me',
        summary: '(TOKEN REQUIRED)',
        description:
            '**Get users**. Use query parameters to populate the results using the following format: "*/users?select[reviews]=true&where[id]=1*".',
        tags: ['Users'],
        querystring: {
            type: 'object',
            properties: {
                select: {
                    type: 'object',
                    properties: {
                        propositions: { type: 'boolean' },
                        movies: { type: 'boolean' },
                        reviews: { type: 'boolean' },
                        metrics: { type: 'boolean' },
                    },
                },
                limit: { type: 'number' },
                sort: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'array',
                items: { $ref: 'PrivateUser#' },
            },
        },
    },
    {
        $id: 'API:PUT/users',
        summary: '(TOKEN REQUIRED)',
        description:
            '**Modify user by token**: Modify property in *update_user* object sent in the body. *update_user* **can** contain one or more of the following properties: *pseudo*, *mail* or *password*. Password must match the following requirments: *8 Characters, at least 1 Number, at least 1 letter. Max 64 characters* It can contain the following special characters: "!#$&%*+=?|" You must provide the current password as well.',
        tags: ['Users'],
        body: {
            type: 'object',
            required: ['password', 'update_user'],
            properties: {
                password: { type: 'string' },
                update_user: {
                    type: 'object',
                    properties: {
                        pseudo: {
                            type: 'string',
                            maxLength: 32,
                        },
                        mail: {
                            type: 'string',
                            maxLength: 64,
                        },
                        password: {
                            type: 'string',
                            maxLength: 64,
                        },
                    },
                },
            },
        },
        response: {
            201: {
                properties: {
                    message: { type: 'string' },
                },
                required: ['message'],
            },
        },
    },
    {
        $id: 'API:PUT/users/avatar',
        summary: '(TOKEN REQUIRED)',
        description:
            '**Modify user avatar by token:** Send a multipart/form-data request with the following field *avatar: file*',
        tags: ['Users'],
        response: {
            201: {
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
        getSchema(id: 'API:GET/users' | 'API:GET/users/me' | 'API:PUT/users' | 'API:PUT/users/avatar'): FastifySchema;
    }
}
