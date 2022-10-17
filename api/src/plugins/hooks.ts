import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import { comparePassword } from '@src/utils/bcryptHandler';
import plugin from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    accessVerify: (request: Request, reply: Reply)=>void;
    refreshVerify: (request: Request, reply: Reply)=>void;
    isAdmin: (request: Request, reply: Reply)=>void;
    passwordVerify: (request: Request, reply: Reply)=>void;
    userHasProposition: (request: Request, reply: Reply)=>void;
    isSlotBooked: (request: Request, reply: Reply)=>void;
  }
}

const hooks: FastifyPluginCallback = async (fastify, opts, done) => {

  // onRequest hook
  fastify.decorate('accessVerify', async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // onRequest hook
  fastify.decorate('refreshVerify', async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify({ onlyCookie: true });
    } catch (err) {
      reply.send(err);
    }
  });

  // onRequest hook
  fastify.decorate('isAdmin', async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify();
      if (request.user.role !== 'admin') {
        reply.status(403);
        throw new Error('accès restreint aux administrateurs.');
      }
    } catch (err) {
      reply.send(err);
    }
  });

  // preValidation hook
  fastify.decorate('userHasProposition', async (
    request: Request<{ Params: { id: number } }>,
    reply: Reply
  ) => {
    const { prisma } = request;
    const { id: userId } = request.user;
    const { id: slotId } = request.params;

    try {
      const proposition: Array<unknown> = await prisma.$queryRaw`
        SELECT * FROM pending_propositions WHERE user_id=${userId};
      `;
      if (proposition.length > 0) {
        reply.code(401);
        throw new Error('Vous avez déjà une proposition en attente. Vous pourrez réserver un nouveau créneau une fois votre proposition publiée.');
      }
      
      const slot = await prisma.proposition_slot.findUnique({
        where: { id: Number(slotId) },
        select: { is_booked: true },
      });
      if (slot.is_booked) {
        reply.code(401);
        throw new Error('Ce créneau est déjà réservé.');
      }
    } catch (error) {
      reply.send(error);
    }
  });

  // preValidation hook
  fastify.decorate('isSlotBooked', async (
    request: Request<{ Params: { id: number } }>,
    reply: Reply
  ) => {
    const { prisma } = request;
    const { id: slotId } = request.params;

    try {
      const slot = await prisma.proposition_slot.findUnique({
        where: { id: Number(slotId) },
        select: { is_booked: true },
      });
      if (!slot.is_booked) {
        reply.code(406);
        throw new Error('Ce créneau n\'est pas réservé.');
      }
    } catch (error) {
      reply.send(error);
    }
  });

  // preValidation hook
  fastify.decorate('passwordVerify', async (
    request: Request<{ Body: { password: string } }>, 
    reply: Reply
  ) => {
    try {
      const user = await request.prisma.user.findUnique({
        where: { id: request.user.id },
      });
      const isPasswordCorrect = await comparePassword(request.body.password, user.password);
      if (!isPasswordCorrect) {
        reply.code(401); // Unauthorized
        throw new Error('Mot de passe incorrect.');
      }
    } catch (err) {
      reply.send(err);
    }
  });
  
  done();
};

export default plugin(hooks);
