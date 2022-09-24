import type { FastifyReply as Reply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";

type Request = FastifyRequest<{
  Body: {
    user: {
      mail: string;
      pseudo: string;
      password: string;
    };
  };
}>;

export const register = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  let { pseudo, mail, password } = request.body.user;

  try {
    // Duplicate check
    const user = await prisma.user.findFirst({
      where: { OR: [{ mail }, { pseudo }] },
    });
    if (user) {
      // French messages are to be displayed in front
      reply.code(409); // Conflict
      if (mail === user.mail)
        throw new Error("Cette adresse mail est déjà associée à un compte.");
      if (pseudo === user.pseudo)
        throw new Error("Ce pseudo est déjà utilisé.");
    }

    // Test and Hash password
    if (!process.env.PASS_REGEXP) {
      reply.code(500); // Internal Server Error
      throw new Error("No password regexp found.");
    }
    if (!password.match(process.env.PASS_REGEXP)) {
      reply.code(422); // Unprocessable Entity
      throw new Error("Invalid password format.");
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // Create user
    await prisma.user.create({
      data: {
        pseudo,
        mail,
        password,
      },
    });
    reply
      .code(201) // Created
      .send({ message: `Utilisateur "${pseudo}" créé avec succés.` });
  } catch (error) {
    reply.send(error);
  }
};

export const login = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { pseudo, password } = request.body.user;

  try {
    const user = await prisma.user.findUnique({
      where: { pseudo },
      select: {
        id: true,
        pseudo: true,
        mail: true,
        password: true,
        role: true,
        avatar_url: true,
      },
    });

    if (!user) {
      reply.code(404); // Not Found
      throw new Error("Utilisateur introuvable.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      reply.code(401); // Unauthorized
      throw new Error("Mot de passe incorrect.");
    }

    reply.send({
      user: user,
      response: `Utilisateur "${pseudo}" connecté avec succés.`,
    });
  } catch (error) {
    reply.send(error);
  }
};
