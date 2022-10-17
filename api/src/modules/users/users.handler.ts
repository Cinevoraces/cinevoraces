import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { userMetrics } from '@src/types/Metrics';
import type PrismaQuery from '@src/types/Query';

import { hashPassword } from '@src/utils/bcryptHandler';
import prismaQueryFactory from '@src/utils/prismaQueryFactory';

type Request = FastifyRequest<{
  Querystring: PrismaQuery.Querystring;
  Params: { id: number };
  Body: {
    password: string;
    update_user?: {
      pseudo?: string;
      mail?: string;
      password?: string;
    };
  };
}>;

export const handleGetUsers = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const prismaQuery = prismaQueryFactory(request.query, 'User');

  try {
    const users = await prisma.user.findMany({
      ...prismaQuery,
      orderBy: { id: 'asc' },
    });

    reply.send(users);
  } catch (error) {
    reply.send(error);
  }
};

export const handleGetUserById = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id } = request.params;
  const metrics = request.query.pop?.metrics;
  const prismaQuery = prismaQueryFactory(request.query, 'User');

  try {
    let response;

    const user = await prisma.user.findFirst({
      ...prismaQuery,
      where: { id },
    });

    if (metrics) {
      const rawQuery = await prisma.$queryRaw`
        SELECT * FROM indiv_actions_metrics WHERE id = ${id};
      `;
      response = { 
        ...user,
        metrics: (rawQuery as Array<userMetrics>)[0] 
      };
    } else {
      response = user;
    }

    reply.send(response);
  } catch (error) {
    reply.send(error);
  }
};

export const handlePutUserById = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { update_user } = request.body;
  const { id } = request.user;

  try {
    if (update_user.password) {
      // Test and Hash new password
      if (!update_user.password.match(process.env.PASS_REGEXP)) {
        reply.code(422); // Unprocessable Entity
        throw new Error('Le format du mot de passe est invalide.');
      }
      update_user.password = await hashPassword(update_user.password);
    }
    
    // Update user
    await prisma.user.update({
      where: { id },
      data: { ...update_user },
    });
    
    reply.send('Données utilisateur modifiées avec succés.');
  } catch (error) {
    reply.send(error);
  }
};

// Admin only
export const handleDeleteUserById = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id } = request.params;

  try {
    const user = await prisma.user.delete({ where: { id: Number(id) } });
    if (!user) {
      reply.code(404);
      throw new Error('Utilisateur introuvable.');
    }

    reply.send(`Utilisateur "${user.pseudo}" supprimé avec succés.`);
  } catch (error) {
    reply.send(error);
  }
};
