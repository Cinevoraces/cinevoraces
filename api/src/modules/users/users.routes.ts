import type { FastifyInstance } from "fastify";
import {
  getUsersSchema,
  getUserByIdSchema,
  putUserByIdSchema,
} from "./users.schema";
import {
  handleGetUserById,
  handleGetUsers,
  handlePutUserById,
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

  fastify.route({
    method: "PUT",
    url: "/users",
    schema: putUserByIdSchema,
    handler: handlePutUserById,
    onRequest: [fastify.accessVerify],
  });
};
