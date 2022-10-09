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
    accessVerify: (request: Request, reply: Reply) => void;
    refreshVerify: (request: Request, reply: Reply) => void;
  }
}
declare module "@fastify/jwt" {
  interface VerifyOptions {
    onlyCookie: boolean;
  }
  interface FastifyJWT {
		user: {
      id?: number;
    }
	}
}


const jwt: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.jwt) {
    return fastify.log.warn("Fastify/jwt already registered");
  }

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    cookie: {
      cookieName: "refresh_token",
      signed: true,
    }
  } as FastifyJWTOptions);

  fastify.decorate("accessVerify", async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
  fastify.decorate("refreshVerify", async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify({onlyCookie: true});
    } catch (err) {
      reply.send(err);
    }
  });

  done();
};

export default plugin(jwt);
