import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '../../types/_index';
import { getGlobalMetrics } from './metrics.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
}>;

/**
* **Get global metrics**
* @description Get Website global metrics from database
*/
export const handleGetGlobalMetrics = async (request: Request, reply: Reply) => {
  const { pgClient } = request;

  const { rows: globalMetrics } = await pgClient.query(
    getGlobalMetrics()
  );
    
  reply
    .code(200)
    .send(globalMetrics[0]);
};
