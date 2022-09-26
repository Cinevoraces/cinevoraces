import type { FastifyReply as Reply, FastifyRequest } from "fastify";

type Request = FastifyRequest<{
  Params: {
    id: number;
  };
}>;

export const handleGetUsers = async (request: Request, reply: Reply) => {
  const { prisma } = request;

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        pseudo: true,
        mail: true,
        avatar_url: true,
        role: true,
        created_at: true,
        updated_at: true,
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

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        pseudo: true,
        mail: true,
        avatar_url: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    reply.send(user);
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
