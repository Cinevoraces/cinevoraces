export const Error = {
    $id: 'Error',
    type: 'object',
    required: ['message'],
    properties: {
        error: { type: 'string' },
        message: { type: 'string' },
    },
};
