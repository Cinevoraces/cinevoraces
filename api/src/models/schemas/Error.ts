import { ESchemasIds } from '../enums/_index';

export const Error = {
  $id: ESchemasIds.Error,
  type: 'object',
  required: ['message'],
  properties: {
    error: { type: 'string' },
    message: { type: 'string' },
  },
};
