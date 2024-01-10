import { ESchemasIds } from '../enums/_index';

export const GETMetrics = {
    $id: ESchemasIds.GETMetrics,
    description: `
  **Get website metrics**
  `,
    tags: ['Metrics'],
    response: {
        200: { $ref: `${ESchemasIds.IGlobalMetrics}#` },
    },
};
