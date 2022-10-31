import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import { getGlobalMetrics } from '@modules/metrics/metrics.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
}>;

/**
* **Get global metrics**
* @description
* Get Website global metrics from database
*/
export const handleGetGlobalMetrics = async (request: Request, reply: Reply) => {
  const { pgClient } = request;

  try {
    const { rows: globalMetrics } = await pgClient.query(
      getGlobalMetrics()
    );
    
    reply.send(globalMetrics[0]);
  } catch (error) {
    reply.send(error);
  }
};
