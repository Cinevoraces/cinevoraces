import type { FastifyInstance } from "fastify";
import { getUsersSchema, getUserByIdSchema } from "./users.schema";
import {
  handleGetUserById,
  handleGetUsers,
} from "@modules/users/users.handler";

export const users = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/users",
    schema: getUsersSchema,
    handler: handleGetUsers,
  });

  fastify.route({
    method: "GET",
    url: "/users/:id",
    schema: getUserByIdSchema,
    handler: handleGetUserById,
  });
};
