import { FastifyReply as Reply, FastifyRequest } from "fastify";
import { comparePassword, hashPassword } from "@src/utils/bcryptHandler";

type Request = FastifyRequest<{
  Body: {
    pseudo: string;
    mail: string;
    password: string;
  };
}>;

export const handleRegister = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  let { pseudo, mail, password } = request.body;

  try {
    // Duplicate check
    const user = await prisma.user.findFirst({
      where: { OR: [{ mail }, { pseudo }] },
    });
    if (user) {
      reply.code(409); // Conflict
      if (mail === user.mail) {
        throw new Error("Cette adresse mail est déjà associée à un compte.");
      } else if (pseudo === user.pseudo) {
        throw new Error("Ce pseudo est déjà utilisé.");
      }
    }

    // Test and Hash password
    if (!password.match(process.env.PASS_REGEXP)) {
      reply.code(422); // Unprocessable Entity
      throw new Error("Le format du mot de passe est invalide.");
    }
    password = await hashPassword(password);

    // Create user
    await prisma.user.create({
      data: { pseudo, mail, password },
    });
    reply
      .code(201) // Created
      .send({ message: `Utilisateur "${pseudo}" créé avec succés.` });
  } catch (error) {
    reply.send(error);
  }
};


export const handleLogin = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { pseudo, password } = request.body;

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

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      reply.code(401); // Unauthorized
      throw new Error("Mot de passe incorrect.");
    }

    const userObject = { 
      id: user.id,
      pseudo: user.pseudo,
      mail: user.mail,
      role: user.role,
      avatar_url: user.avatar_url,
     };

    // Generate tokens
    const accessToken = await reply.jwtSign(
      { id: user.id, pseudo: user.pseudo, role: user.role, expiresIn: "1m" }
    );
    const refreshToken = await reply.jwtSign(
      { id: user.id, expiresIn: "1d"}
    );

    reply
      .setCookie("refresh_token", refreshToken, {
        signed: true,
      })
      .send({
        user: userObject,
        token: accessToken,
        response: `Utilisateur "${pseudo}" connecté avec succés.`,
      });
  } catch (error) {
    reply.send(error);
  }
};

export const handleRefreshToken = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id } = request.user;

  try {
    // Look for user in DB
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        mail: true,
        pseudo: true,
        role: true,
        avatar_url: true,
      },
    });

    if (!user) {
      reply.code(401); // Not Found
      throw new Error("Utilisateur introuvable, token compromis.");
    }

    // Generate new tokens
    const accessToken = await reply.jwtSign(
      { id: user.id, pseudo: user.pseudo, role: user.role, expiresIn: "1m" }
    );
    const refreshToken = await reply.jwtSign(
      { id: user.id, expiresIn: "1d"}
    );

    reply
      .setCookie("refresh_token", refreshToken, {
        signed: true,
      })
      .send({
        user,
        token: accessToken,
        response: "Tokens régénérés avec succés.",
      });
  } catch (error) {
    reply.send(error);
  }
}
