import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from "fastify";
import type { FastifyJWTOptions } from "@fastify/jwt";
import fastifyJwt from "@fastify/jwt";
import plugin from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    auth: (request: Request, reply: Reply) => Promise<void>;
  }
}

const jwt: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.jwt) {
    return fastify.log.warn("Fastify/jwt already registered");
  }

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
  } as FastifyJWTOptions);

  fastify.decorateReply("jwt", fastify.jwt);
  fastify.decorate("auth", async (request: Request, reply: Reply) => {
    try {
      const { token } = request.cookies;
      fastify.jwt.verify(token);
    } catch (err) {
      reply.send(err);
    }
  });

  done();
};

export default plugin(jwt);
