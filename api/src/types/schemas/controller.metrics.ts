import { ESchemasIds } from '../enums/ESchemasIds';

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
