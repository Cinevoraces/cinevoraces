import type { FastifyInstance } from "fastify";
import {
  handleGetGlobalMetrics,
  handleGetAllUsersMetrics,
  handleGetUsersMetricsById,
} from "@modules/metrics/metrics.handler";
import { getGlobalMetricsSchema, getGetAllUsersMetrics, getUsersMetricsById } from "@modules/metrics/metrics.schema";

export const metrics = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/metrics",
    schema: getGlobalMetricsSchema,
    handler: handleGetGlobalMetrics,
  });

  fastify.route({
    method: "GET",
    url: "/metrics/users",
    schema: getGetAllUsersMetrics,
    handler: handleGetAllUsersMetrics,
  });

  fastify.route({
    method: "GET",
    url: "/metrics/users/:id",
    schema: getUsersMetricsById,
    handler: handleGetUsersMetricsById,
  });
};
