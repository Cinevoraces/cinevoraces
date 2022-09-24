import type { FastifyInstance } from "fastify";
import { login, register } from "@modules/auth/auth.handler";
import { loginSchema, registerSchema } from "@modules/auth/auth.schema";

export const auth = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/register",
    schema: registerSchema,
    handler: register,
  });

  fastify.route({
    method: "POST",
    url: "/login",
    schema: loginSchema,
    handler: login,
    onRequest: [fastify.auth],
  });
};
