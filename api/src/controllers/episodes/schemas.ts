export default [
    {
        $id: 'API:GET/episodes',
        summary: '(TOKEN REQUIRED)',
        description: '**Get episodes**.',
        tags: ['Episodes'],
        response: {
            200: {
                type: 'array',
                items: { $ref: 'Episode#' },
            },
        },
    },
];

declare module 'fastify' {
    interface FastifyInstance {
        getSchema(id: 'API:GET/episodes'): FastifySchema;
    }
}
