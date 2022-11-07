import type {
  FastifyRequest,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import plugin from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    findOrCreateReview: (request: Request, reply: Reply)=>void;
  }
}

type Request = FastifyRequest<{
  Params: { movieId: number };
}>;

export const findOrCreateReviewHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  /**
   * **Review object creation**
   * @preHandler
   * @description
   * This hook creates an empty review object if it doesn't exist.
  */
  fastify.decorate('findOrCreateReview', async (
    request: Request, 
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

export default plugin(findOrCreateReviewHooks);
