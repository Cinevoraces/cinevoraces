import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from "fastify";
import { comparePassword } from "@src/utils/bcryptHandler";
import plugin from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    accessVerify: (request: Request, reply: Reply) => void;
    refreshVerify: (request: Request, reply: Reply) => void;
    isAdmin: (request: Request, reply: Reply) => void;
    passwordVerify: (request: Request, reply: Reply) => void;
  }
}

const hooks: FastifyPluginCallback = async (fastify, opts, done) => {

  // onRequest hook
  fastify.decorate("accessVerify", async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // onRequest hook
  fastify.decorate("refreshVerify", async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify({onlyCookie: true});
    } catch (err) {
      reply.send(err);
    }
  });

  // onRequest hook
  fastify.decorate("isAdmin", async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify();
      const admin = await request.prisma.user.findUnique({
        where: { id: request.user.id },
      });
      if (request.user.role !== "admin" || !admin) {
        reply.status(403)
        throw new Error("accès restreint aux administrateurs.");
      }
    } catch (err) {
      reply.send(err);
    }
  });

  // preValidation hook
  fastify.decorate("passwordVerify", async (request: Request<{Body: {password: string}}>, reply: Reply) => {
    try {
      const user = await request.prisma.user.findUnique({
        where: { id: request.user.id },
      });
      const isPasswordCorrect = await comparePassword(request.body.password, user.password);
      if (!isPasswordCorrect) {
        reply.code(401); // Unauthorized
        throw new Error("Mot de passe incorrect.");
      }
    } catch (err) {
      reply.send(err);
    }
  });

  
  done();
}

export default plugin(hooks);