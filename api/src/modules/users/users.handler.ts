import type { FastifyReply as Reply, FastifyRequest } from "fastify";

type Request = FastifyRequest<{
  Params: {
    id: number;
  };
  Querystring: {
    pop: { [key: string]: boolean };
  };
}>;

export const handleGetUsers = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { pop } = request.query;

  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "asc" },
      include: pop && { ...pop },
    });

    reply.send(users);
  } catch (error) {
    reply.send(error);
  }
};

export const handleGetUserById = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id } = request.params;
  const { pop } = request.query;

  try {
    const [user, bookmarked, viewed, liked, rating, commented] =
      await prisma.$transaction([
        prisma.user.findFirst({
          where: { id },
          include: pop && {
            movies: pop.movies ? true : false,
            reviews: pop.reviews ? true : false,
          },
        }),
        prisma.review.count({ where: { user_id: id, bookmarked: true } }),
        prisma.review.count({ where: { user_id: id, viewed: true } }),
        prisma.review.count({ where: { user_id: id, liked: true } }),
        prisma.review.count({ where: { user_id: id, rating: { gt: 0 } } }),
        prisma.review.count({ where: { user_id: id, comment: { not: "" } } }),
      ]);

    const response = {
      ...user,
      metrics: {
        bookmarked,
        viewed,
        liked,
        rating,
        commented,
      },
    };

    reply.send(response);
  } catch (error) {
    reply.send(error);
  }
};

export const handlePutUserById = async (request: Request, reply: Reply) => {
  const { prisma } = request;

  try {
    const users = await prisma.user.findMany();

    reply.send(users);
  } catch (error) {
    reply.send(error);
  }
};
