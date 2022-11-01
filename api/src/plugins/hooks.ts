import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import type { Payload } from '@src/types/Payload';
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
    doesMovieExist: (request: Request, reply: Reply)=>void;
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
    const { pgClient, user, params } = request;
    const { id: userId } = user;
    const { id: propositionId } = params;

    try {
      // Check if user already has a pending proposition
      const { rowCount: userHasProposition } = await pgClient.query({
        text: ` SELECT id AS movie_id, user_id, is_published
                FROM movie
                WHERE is_published = false AND user_id = $1;`,
        values: [userId],
      });
      if (userHasProposition) {
        reply.code(401);
        throw new Error('Vous avez déjà une proposition en attente. Vous pourrez réserver un nouveau créneau une fois votre proposition publiée.');
      }
      // Check if target slot is available
      const { rowCount: isPropositionBooked } = await pgClient.query({
        text: ` SELECT is_booked
                FROM proposition_slot
                WHERE id = $1 AND is_booked = true;`,
        values: [propositionId],
      });
      if (isPropositionBooked) {
        reply.code(401);
        throw new Error('Ce créneau est déjà réservé.');
      }
    } catch (error) {
      reply.send(error);
    }
  });

  /**
   * **Movie's existence verification**
   * @preValidation
   * @description
   * This hook verifies if a movie already exist before proposition.
  */
  fastify.decorate('doesMovieExist', async (
    request: Request<{ Body: Payload.proposeMovie }>,
    reply: Reply
  ) => {
    const { pgClient, body } = request;
    const { french_title, original_title } = body;
    try {
      // Check if movie has already been proposed
      const { rowCount: movieExist } = await pgClient.query({
        text: ` SELECT french_title, original_title, release_date
                  FROM movie
                  WHERE french_title = $1 AND original_title = $2;`,
        values: [french_title, original_title],
      });
      if (movieExist) {
        reply.code(422);
        throw new Error('Ce film à déjà été proposé.');
      }
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
                WHERE id=$1 AND is_booked=false;`,
        values: [slotId],
      });
      if (slot) {
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
    const { id: userId } = user;

    if (!body || !body.password) {
      reply.code(401); // Unauthorized
      throw new Error('Mot de passe requis.');
    }

    try {
      const { rows } = await pgClient.query({
        text: ` SELECT password
                FROM "user"
                WHERE id=$1;`,
        values: [userId],
      });
      
      const isPasswordCorrect = await comparePassword(body.password, rows[0].password);
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
