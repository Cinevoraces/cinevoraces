export default [
    {
        $id: 'API:GET/metrics',
        description: '**Get website metrics**',
        tags: ['Metrics'],
        response: {
            200: { $ref: 'GlobalMetrics#' },
        },
    },
];

declare module 'fastify' {
    interface FastifyInstance {
        getSchema(id: 'API:GET/metrics'): FastifySchema;
    }
}
