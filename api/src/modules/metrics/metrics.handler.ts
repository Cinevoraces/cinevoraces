import type { FastifyReply as Reply, FastifyRequest } from 'fastify';

type Request = FastifyRequest<{
  Params: { id: number };
}>;

/**
* **Get global metrics**
* @description
* Get Website global metrics from database
*/
export const handleGetGlobalMetrics = async (request: Request, reply: Reply) => {
  const { pgClient } = request;

  try {
    const { rows } = await pgClient.query(`
      SELECT * 
      FROM global_metrics;`
    );

    reply.send(rows[0]);
  } catch (error) {
    reply.send(error);
  }
};

/**
* **Get all users metrics**
* @description
* Get all users metrics from database
*/
export const handleGetAllUsersMetrics = async (request: Request, reply: Reply) => {
  const { pgClient } = request;

  try {
    const { rows } = await pgClient.query(`
      SELECT * 
      FROM indiv_actions_metrics;`
    );

    reply.send(rows);
  } catch (error) {
    reply.send(error);
  }
};

/**
* **Get one user metrics**
* @description
* Get one user metrics from database using user id
*/
export const handleGetUsersMetricsById = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { id } = params;
  
  try {
    const { rows } = await pgClient.query({
      text:`  SELECT * 
              FROM indiv_actions_metrics 
              WHERE id = ${id};`,
      values: [id]
    });

    reply.send(rows[0]);
  } catch (error) {
    reply.send(error);
  }
};
