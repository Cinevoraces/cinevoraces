import type { FastifyInstance } from "fastify";
import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import plugin from "fastify-plugin";

const jwt = async (fastify: FastifyInstance) => {
  if (fastify.jwt) {
    return fastify.log.warn("Fastify/jwt already registered");
  }

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
  });
};

export default plugin<FastifyJWTOptions>(jwt);

// handler's request object now has following methods:
// jwtSign()
// jwtVerify()
// jwtDecode()
