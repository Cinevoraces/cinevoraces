import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { review } from '@prisma/client';
import reviewResponseFactory from '@src/utils/reviewResponseFactory';

type Request = FastifyRequest<{
  Params: { movieId: number };
  Body: review;
}>;

export const handleReviewMovie = async (request: Request, reply: Reply) => {
  const { prisma, body } = request;
  const { movieId } = request.params;
  const { id: userId, previous_review } = request.user;

  try {    
    const review: review = await prisma.review.update({
      where: {
        user_id_movie_id: {
          user_id: userId,
          movie_id: movieId,
        },
      },
      data: { ...body },
    });
    const message = reviewResponseFactory(body, previous_review);

    reply.send({
      message,
      review,
    });
  } catch (error) {
    reply.send(error);
  }
};
