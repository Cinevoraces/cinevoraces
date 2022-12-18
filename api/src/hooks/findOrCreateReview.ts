import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import plugin from 'fastify-plugin';

export const findOrCreateReviewHooks: FastifyPluginCallback = async (
  fastify,
  opts,
  done
) => {
  /**
   * **Review object creation**
   * @preHandler
   * @description
   * This hook creates an empty review object if it doesn't exist.
   */
  fastify.decorate(
    'findOrCreateReview',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (request: Request<{ Params: { movieId: number } }>, reply: Reply) => {
      const { pgClient, params, user } = request;
      const { movieId } = params;
      const { id: userId } = user;
      const query = {
        text: ` SELECT comment, rating
                  FROM review
                  WHERE user_id=$1 AND movie_id=$2;`,
        values: [userId, Number(movieId)],
      };

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
    }
  );

  done();
};

export default plugin(findOrCreateReviewHooks);
