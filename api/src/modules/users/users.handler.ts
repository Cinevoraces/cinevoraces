import type { FastifyReply as Reply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";

type Request = FastifyRequest<{
  Params: {
    id: number;
  };
  Querystring: {
    pop: { [key: string]: boolean };
  };
  Body: {
    user: {
      password: string;
      pseudo: string;
      mail: string;
      updated_password: string;
    };
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

export async function handlePutUserById(request: Request, reply: Reply) {
  const { prisma } = request;
  const { id } = request.params;
  const { password, pseudo, mail, updated_password } = request.body.user;
  const { token } = request.cookies;

  let updateUser: {
    password?: string;
    pseudo?: string;
    mail?: string;
  } = {};

  try {
    // Verify token
    const decodedToken = this.jwt.decode(token);
    if (decodedToken.id !== id) {
      reply.code(401); // Unauthorized
      throw new Error("Vous n'êtes pas authorisé à modifier cet utilisateur.");
    }

    // User check
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      reply.code(404);
      throw new Error("Utilisateur introuvable.");
    }

    // Password check
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      reply.code(401); // Unauthorized
      throw new Error("Mot de passe incorrect.");
    }

    if (updated_password) {
      // Test and Hash new password
      if (!process.env.PASS_REGEXP) {
        reply.code(500); // Internal Server Error
        throw new Error("Regexp introuvable.");
      } else if (!updated_password.match(process.env.PASS_REGEXP)) {
        reply.code(422); // Unprocessable Entity
        throw new Error("Le format du mot de passe est invalide.");
      }
      const salt = await bcrypt.genSalt(10);
      updateUser.password = await bcrypt.hash(password, salt);
    }
    if (pseudo) {
      updateUser.pseudo = pseudo;
    }
    if (mail) {
      updateUser.mail = mail;
    }

    // Update user
    await prisma.user.update({
      where: { id },
      data: { ...updateUser },
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
  const { password } = request.body.user;
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
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
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
  // TODO
}