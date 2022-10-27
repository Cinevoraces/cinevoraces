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
    isLogged: (Request: Request, reply: Reply)=>void;
    passwordVerify: (request: Request, reply: Reply)=>void;
    userHasProposition: (request: Request, reply: Reply)=>void;
    isSlotBooked: (request: Request, reply: Reply)=>void;
    findOrCreateReviewObject: (request: Request, reply: Reply)=>void;
  }
}

/**
 * **Hooks**
 * @description
 * This plugin registers all hooks used in the application.
*/
const hooks: FastifyPluginCallback = async (fastify, opts, done) => {

  /**
   * **Access token verification**
   * @onRequest
   * @description
   * This hook verifies the access token then populate request.user with decoded informations.
   */
  fastify.decorate('accessVerify', async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  /**
   * **Refresh token verification**
   * @onRequest
   * @description
   * This hook verifies the refresh token then populate request.user with decoded informations.
  */
  fastify.decorate('refreshVerify', async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify({ onlyCookie: true });
    } catch (err) {
      reply.send(err);
    }
  });

  /**
   * **Admin verification**
   * @onRequest
   * @description
   * This hook verifies if the user is an admin.
  */
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

  /**
   * **Logged verification**
   * @onRequest
   * @description
   * This hook verifies if the user is logged.
  */
  fastify.decorate('isLogged', async (request: Request, reply: Reply) => {
    try {
      if (request.headers.authorization) await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  /**
   * **Proposition verification**
   * @preValidation
   * @description
   * This hook verifies if the user already has a proposition.
  */
  fastify.decorate('userHasProposition', async (
    request: Request<{ Params: { id: number } }>,
    reply: Reply
  ) => {
    const { pgClient, user } = request;
    const { id: userId } = user;

    try {
      const { rowCount: propositions } = await pgClient.query({
        text: ` SELECT * 
                FROM pending_propositions
                WHERE user_id=$1;`,
        values: [userId],
      });
      if (propositions) {
        reply.code(401);
        throw new Error('Vous avez déjà une proposition en attente. Vous pourrez réserver un nouveau créneau une fois votre proposition publiée.');
      }

      // TODO: Define if it's the right place to do that
      // const { id: slotId } = request.params;
      // const slot = await prisma.proposition_slot.findUnique({
      //   where: { id: Number(slotId) },
      //   select: { is_booked: true },
      // });
      // if (slot.is_booked) {
      //   reply.code(401);
      //   throw new Error('Ce créneau est déjà réservé.');
      // }
    } catch (error) {
      reply.send(error);
    }
  });

  /**
   * **Slot state verification**
   * @preValidation
   * @description
   * This hook verifies if a slot is already booked.
   * It is executed before the unBookSlot function.
  */
  fastify.decorate('isSlotBooked', async (
    request: Request<{ Params: { id: number } }>,
    reply: Reply
  ) => {
    const { pgClient, params } = request;
    const { id: slotId } = params;

    try {
      const { rowCount: slot } = await pgClient.query({
        text: ` SELECT *
                FROM proposition_slot
                WHERE id=$1 AND is_booked=true;`,
        values: [slotId],
      });
      if (!slot) {
        reply.code(406);
        throw new Error('Ce créneau n\'est pas réservé.');
      }
    } catch (error) {
      reply.send(error);
    }
  });

  /**
   * **Password verification**
   * @preValidation
   * @description
   * This hook verifies if the password is correct.
   */
  fastify.decorate('passwordVerify', async (
    request: Request<{ Body: { password: string } }>, 
    reply: Reply
  ) => {
    const { pgClient, user, body } = request;
    const { password } = body;
    const { id: userId } = user;

    try {
      const { rows } = await pgClient.query({
        text: ` SELECT password
                FROM "user"
                WHERE id=$1;`,
        values: [userId],
      });
      
      const isPasswordCorrect = await comparePassword(password, rows[0].password);
      if (!isPasswordCorrect) {
        reply.code(401); // Unauthorized
        throw new Error('Mot de passe incorrect.');
      }
    } catch (err) {
      reply.send(err);
    }
  });

  /**
   * **Review object creation**
   * @preHandler
   * @description
   * This hook creates an empty review object if it doesn't exist.
  */
  fastify.decorate('findOrCreateReviewObject', async (
    request: Request<{ Params: { movieId: number } }>, 
    reply: Reply
  ) => {
    const { pgClient, params, user } = request;
    const { movieId } = params;
    const { id: userId } = user;
    const query = { 
      text: ` SELECT comment, rating
                FROM review
                WHERE user_id=$1 AND movie_id=$2;`,
      values: [userId, Number(movieId)],
    };

    try {
      let review = await pgClient.query(query);
      if (!review.rowCount) {
        await pgClient.query({
          ...query,
          text: ' INSERT INTO review (user_id, movie_id) VALUES ($1,$2);',
        });
        review = await pgClient.query(query);
      }
      const { comment, rating } = review.rows[0];
      request.user = { 
        ...user, 
        previous_review: { comment, rating },
      };
    } catch (err) {
      reply.send(err);
    }
  });
  
  done();
};

export default plugin(hooks);
