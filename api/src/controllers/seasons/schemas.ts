export default [
    {
        $id: 'API:GET/seasons',
        description: '**Get seasons objects**',
        tags: ['Seasons'],
        response: {
            '200': {
                type: 'array',
                items: { $ref: 'Season#' },
            },
        },
    },
    {
        $id: 'API:GET/seasons/:number',
        description: '**Get a season object**',
        tags: ['Seasons'],
        params: {
            type: 'object',
            properties: {
                number: { type: 'number' },
            },
        },
        response: {
            '200': { $ref: 'Season#' },
        },
    },
];

declare module 'fastify' {
    interface FastifyInstance {
        getSchema(id: 'API:GET/seasons' | 'API:GET/seasons/:number'): FastifySchema;
    }
}
