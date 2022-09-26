import type { FastifyInstance } from "fastify";
import prismaClient from "@plugins/prismaClient";
import jwt from "@plugins/jwt";
import cookie from "@plugins/cookie";
import { movies } from "@modules/movies/movies.routes";
import { users } from "@modules/users/users.routes";
import { auth } from "@modules/auth/auth.routes";
import schemasRegister from "./schemas";

const app = async (fastify: FastifyInstance) => {
  // Register Schemas
  fastify.register(schemasRegister);

  // Register plugins
  fastify.register(prismaClient);
  fastify.register(cookie);
  fastify.register(jwt);

  // Register routes
  fastify.register(movies);
  fastify.register(users);
  fastify.register(auth);
};

export default app;
