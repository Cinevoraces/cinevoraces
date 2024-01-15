import { ESchemasIds } from '../enums/ESchemasIds';

export const Error = {
    $id: ESchemasIds.Error,
    type: 'object',
    required: ['message'],
    properties: {
        error: { type: 'string' },
        message: { type: 'string' },
    },
};
