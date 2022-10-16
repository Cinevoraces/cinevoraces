import type { FastifyPluginCallback } from 'fastify';
import type { PrismaClientOptions } from '@prisma/client/runtime';
import { PrismaClient } from '@prisma/client';
import plugin from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyRequest {
    prisma: PrismaClient;
  }
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export type FastifyPrismaClientOptions = Omit<
PrismaClientOptions,
'__internal'
>;

const prismaClient: FastifyPluginCallback<FastifyPrismaClientOptions> = async (
  fastify,
  opts,
  done
) => {
  if (fastify.prisma) {
    return fastify.log.warn('Prisma client already registered');
  }
  const prisma = new PrismaClient(opts);
  await prisma.$connect();

  fastify
    .decorate('prisma', prisma)
    .decorateRequest('prisma', { getter: () => fastify.prisma })
    .addHook('onClose', async (fastify, done) => {
      await fastify.prisma.$disconnect();
      done();
    });
  done();
};

export default plugin(prismaClient);
