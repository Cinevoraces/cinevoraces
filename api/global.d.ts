type fastifyInstance = import('fastify').FastifyInstance;
type PrismaClient = import('@prisma/client').PrismaClient;
interface FastifyInstance extends fastifyInstance {
  // Add custom properties to FastifyInstance here
  prisma: PrismaClient;
}