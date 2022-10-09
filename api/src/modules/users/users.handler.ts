import type { FastifyReply as Reply, FastifyRequest } from "fastify";
import type Filters from "@src/types/Filters";
import { comparePassword, hashPassword } from "@src/utils/bcryptHandler";
import filtersFactoryUsers from "@src/utils/filtersFactoryUsers";

type Request = FastifyRequest<{
  Params: {
    id: number;
  };
  Querystring: {
    pop: Filters.User;
  };
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
  const querystring = filtersFactoryUsers(request.query.pop);

  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "asc" },
      include: querystring.pop,
    });

    reply.send(users);
  } catch (error) {
    reply.send(error);
  }
};

export const handleGetUserById = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id } = request.params;
  const querystring = filtersFactoryUsers(request.query.pop);

  try {
    const user = await prisma.user.findFirst({
      where: { id },
      include: querystring.pop,
    })
    const metrics = querystring.metrics 
      ? prisma.$queryRaw`
          SELECT * FROM indiv_actions_metrics WHERE id = ${id}
        `
      : {};
    const response = { ...user, metrics };

    reply.send(response);
  } catch (error) {
    reply.send(error);
  }
};

export const handlePutUserById = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { password, update_user } = request.body;
  const { id } = request.user;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      reply.code(404); // Not Found
      throw new Error("Utilisateur introuvable.");
    }
    // Password check
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      reply.code(401); // Unauthorized
      throw new Error("Mot de passe incorrect.");
    }

    if (update_user.password) {
      // Test and Hash new password
      if (!update_user.password.match(process.env.PASS_REGEXP)) {
        reply.code(422); // Unprocessable Entity
        throw new Error("Le format du mot de passe est invalide.");
      }
      update_user.password = await hashPassword(password);
    }
    
    // Update user
    await prisma.user.update({
      where: { id },
      data: { ...update_user },
    });
    
    reply.send("Données utilisateur modifiées avec succés.");
  } catch (error) {
    reply.send(error);
  }
}

// Admin only
export async function handleDeleteUserById(request: Request, reply: Reply) {
  const { prisma } = request;
  const { id } = request.params;
  const { password } = request.body;
  const { token } = request.cookies;

  try {
    // Verify token
    const decodedToken = this.jwt.decode(token);
    const admin = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });
    if (!admin) {
      reply.code(401); // Unauthorized
      throw new Error("Vous n'êtes pas authorisé à supprimer cet utilisateur.");
    }

    // Password check
    const isPasswordCorrect = await comparePassword(password, admin.password);
    if (isPasswordCorrect) {
      reply.code(401); // Unauthorized
      throw new Error("Mot de passe incorrect.");
    }

    // User check
    const user = await prisma.user.delete({ where: { id } });
    if (!user) {
      reply.code(404);
      throw new Error("Utilisateur introuvable.");
    }

    reply.send(`Utilisateur "${user.pseudo}" supprimé avec succés.`);
  } catch (error) {
    reply.send(error);
  }
}
