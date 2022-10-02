import type { globalMetrics, userMetrics } from '@src/types/Metrics';
import type { FastifyReply as Reply, FastifyRequest } from 'fastify';

type Request = FastifyRequest<{
  Params: {
    id: number;
  };
}>;

export const handleGetGlobalMetrics = async (request: Request, reply: Reply) => {
  const { prisma } = request;

  try {
    const metrics = await prisma.$queryRaw`SELECT * FROM global_metrics;`;
    const response = (metrics as Array<globalMetrics>)[0];

    reply.send(response);
  } catch (error) {
    reply.send(error);
  }
};

export const handleGetAllUsersMetrics = async (request: Request, reply: Reply) => {
  const { prisma } = request;

  try {
    const metrics = await prisma.$queryRaw`SELECT * FROM indiv_actions_metrics;`;

    reply.send(metrics);
  } catch (error) {
    reply.send(error);
  }
};

export const handleGetUsersMetricsById = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id } = request.params;
  
  try {
    const metrics = await prisma.$queryRaw`SELECT * FROM indiv_actions_metrics WHERE id = ${id};`;
    const response = (metrics as Array<userMetrics>)[0];

    reply.send(response);
  } catch (error) {
    reply.send(error);
  }
};