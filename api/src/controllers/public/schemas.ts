export default [
    {
        $id: 'API:GET/public/:docType/:entityId',
        description:
            '**Get a file using it\'s entity\'s id:** For an avatar use the parameter "0" followed by the corresponding userId. For a movie poster use the parameter "1" followed by the corresponding movieId.',
        tags: ['Public'],
        params: {
            type: 'object',
            properties: {
                docType: { type: 'number' },
                entityId: { type: 'number' },
            },
        },
    },
    {
        $id: 'API:GET/ping',
        description: '**Ping the API**',
    },
];

declare module 'fastify' {
    interface FastifyInstance {
        getSchema(id: 'API:GET/:docType/:entityId' | 'API:GET/ping'): FastifySchema;
    }
}
