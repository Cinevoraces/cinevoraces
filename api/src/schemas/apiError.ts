const apiErrorSchema = {
  $id: 'apiError',
  type: 'object',
  required: ['message', 'statusCode'],
  properties: {
    statusCode: { type: 'number' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
};

export default apiErrorSchema;
