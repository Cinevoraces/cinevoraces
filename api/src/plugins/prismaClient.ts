import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
import { FastifyPluginCallback } from "fastify";
import plugin from 'fastify-plugin'; 

declare module "fastify" {
  interface FastifyRequest {
    prisma: PrismaClient;
  }
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export type FastifyPrismaClientOptions = Omit<
  PrismaClientOptions,
  "__internal"
>;

const prismaClient: FastifyPluginCallback<FastifyPrismaClientOptions> = async (
  fastify,
  opts,
  done
) => {
  if (fastify.prisma) {
    return fastify.log.warn("Prisma client already registered");
  }

  const prisma = new PrismaClient(opts);
  await prisma.$connect();

  fastify
    .decorate("prisma", prisma)
    .decorateRequest("prisma", {getter: () => fastify.prisma})
    .addHook("onClose", async (fastify, done) => {
      await fastify.prisma.$disconnect();
      done();
    });
  done();
};

export default plugin(prismaClient)

// source: https://github.com/balcieren/fastify-prisma-client/blob/master/index.ts