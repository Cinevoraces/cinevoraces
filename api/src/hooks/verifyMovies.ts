import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import type { Payload } from '../types/Payload';
import plugin from 'fastify-plugin';

export const verifyMoviesHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  /**
   * **Movie existence verification**
   * @preValidation
   * @description
   * This hook verifies if a movie exist in database.
  */
  fastify.decorate('doesMovieExist', async (
    request: Request<{ Params?: { id: number }; }>,
    reply: Reply
  ) => {
    const { pgClient, params } = request;
    try {
      const { rowCount: movies } = await pgClient.query({
        text: ' SELECT * FROM movie WHERE id = $1;',
        values: [params.id],
      });
      if (!movies) {
        reply.code(404);
        throw new Error('Le film demandé n\'a pas été trouvé dans la base de données.');
      }
    } catch (error) {
      reply.send(error);
    }
  });

  /**
   * **Proposition duplicate check**
   * @preValidation
   * @description
   * This hook verifies if a movie already exist before proposition.
  */
  fastify.decorate('doesPropositionExist', async (
    request: Request,
    reply: Reply
  ) => {
    const { pgClient, body } = request;
    const { french_title, original_title } = body as Payload.proposeMovie;
    try {
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
   * **Movie's is_published state verification as user**
   * @preValidation
   * @description
   * This hook verifies if a movie has been published.
  */
  fastify.decorate('isMoviePublished', async (
    request: Request<{ Params?: { id: number }; }>,
    reply: Reply
  ) => {
    const { pgClient, user, body, params } = request;
    const query = { text: '', values: [] as Array<number> };

    try {
      // If 'param' is defined, it means that this is the Admin route.
      if (params) {
        query.text = `SELECT is_published FROM movie
                      WHERE id = $1 
                      AND is_published = false;`;
        query.values = [params.id];
      }
      // If body's 'movie_id' is defined, it means that this is the User route.
      if ((body as Payload.updateProposedMovie).movie_id) {
        query.text = `SELECT is_published FROM movie
                      WHERE user_id = $1 
                      AND is_published = false 
                      AND id = $2;`;
        query.values = [user.id, (body as Payload.updateProposedMovie).movie_id];
      }
      const { rowCount: proposition } = await pgClient.query(query);
      if (!proposition) {
        reply.code(404);
        throw new Error('Le film demandé n\'a pas été trouvé parmis les proposition en cours.');
      }
    } catch (error) {
      reply.send(error);
    }
  });

  /**
   * **Proposition verification**
   * @preValidation
   * @description
   * This hook verifies if the user already has a proposition and
   * throw an error if it's the case.
  */
  fastify.decorate('hasProposition', async (
    request: Request,
    reply: Reply
  ) => {
    const { pgClient, user } = request;
    const { id } = user;

    try {
      const { rowCount: proposedMovie } = await pgClient.query({
        text: ` SELECT id AS movie_id, user_id, is_published
                FROM movie
                WHERE is_published = false AND user_id = $1;`,
        values: [id],
      });
      if (proposedMovie) {
        reply.code(401);
        throw new Error('Vous avez déjà une proposition en attente. Vous pourrez réserver un nouveau créneau une fois votre proposition publiée.');
      }
    } catch (error) {
      reply.send(error);
    }
  });

  /**
   * **Slot state verification**
   * @preValidation
   * @description
   * This hook verifies slots state.
   * It takes care of Admin and User cases.
  */
  fastify.decorate('isSlotBooked', async (
    request: Request<{ Params?: { id: number }; }>,
    reply: Reply
  ) => {
    const { pgClient, params, url } = request;
    const { id: slotId } = params;

    try {
      const { rowCount: bookedSlot } = await pgClient.query({
        text: ` SELECT is_booked
                FROM proposition_slot
                WHERE id = $1 AND is_booked = true;`,
        values: [slotId],
      });

      // If slot booking route is called
      if (url.includes('/slots/book') && bookedSlot) {
        reply.code(401);
        throw new Error('Ce créneau est déjà réservé.');
      }
      // If slot unbooking route is called
      if (url.includes('/admin/slots/unbook') && !bookedSlot) {
        reply.code(406);
        throw new Error('Ce créneau n\'est pas réservé.');
      }

    } catch (error) {
      reply.send(error);
    }
  });

  done();
};

export default plugin(verifyMoviesHooks);
