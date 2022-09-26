import type { FastifyReply as Reply, FastifyRequest } from "fastify";

type Request = FastifyRequest<{
  Params: {
    id: number;
  };
  Querystring: {
    pop: string;
  };
}>;

export const handleGetUsers = async (request: Request, reply: Reply) => {
  const { prisma } = request;

  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "asc" },
      include: {
        movies: true,
        reviews: true,
      },
    });

    reply.send(users);
  } catch (error) {
    reply.send(error);
  }
};

export const handleGetUserById = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id } = request.params;
  const populate = request.query.pop;
  console.log(populate);

  try {
    const [user, bookmarked, viewed, liked, rating, commented] =
      await prisma.$transaction([
        prisma.user.findUnique({
          where: { id },
          include: {
            movies: true,
            reviews: true,
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
