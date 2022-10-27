import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import { getGlobalMetrics, getUsersMetrics } from '@src/dataMapper/metrics.dataMapper';

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
    const { rows } = await pgClient.query(
      getGlobalMetrics()
    );
    reply.send(rows[0]);
  } catch (error) {
    reply.send(error);
  }
};

/**
* **Get users metrics**
* @description
* Get users metrics from database, can be filtered by id
*/
export const handleGetUsersMetrics = async (request: Request, reply: Reply) => {
  const { pgClient, query } = request;
  const { filter } = query;

  try {
    const { rows } = await pgClient.query(
      getUsersMetrics(
        filter?.user_id && Number(filter.user_id)
      ));

    reply.send(rows);
  } catch (error) {
    reply.send(error);
  }
};
