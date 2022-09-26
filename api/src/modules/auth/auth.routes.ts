import type { FastifyInstance } from "fastify";
import {
  handleLogin,
  handleRegister,
  handleRefreshToken,
} from "@modules/auth/auth.handler";
import { loginSchema, registerSchema } from "@modules/auth/auth.schema";

export const auth = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/register",
    schema: registerSchema,
    handler: handleRegister,
  });

  fastify.route({
    method: "POST",
    url: "/login",
    schema: loginSchema,
    handler: handleLogin,
  });

  fastify.route({
    method: "GET",
    url: "/test",
    onRequest: [fastify.auth],
    handler: (request, reply) => {
      reply.send({ message: "ACCESS GRANTED" });
    },
  });

  fastify.route({
    method: "GET",
    url: "/refresh",
    handler: handleRefreshToken,
  });
};
