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
      // French messages are to be displayed in front
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

    // Generate tokens
    const token = await reply.jwtSign(
      { id: user.id },
      { expiresIn: "1m" }
    );
    const refreshToken = await reply.jwtSign({ ...user, expiresIn: "1d" });

    reply
      .setCookie("token", token, {})
      .setCookie("refreshToken", refreshToken, {})
      .send({
        user: user,
        response: `Utilisateur "${pseudo}" connecté avec succés.`,
      });
  } catch (error) {
    reply.send(error);
  }
};

export async function handleRefreshToken(request: Request, reply: Reply) {
  const { prisma } = request;
  const { refreshToken } = request.cookies;

  try {
    if (!refreshToken) {
      reply.code(401); // Unauthorized
      throw new Error("Missing refreshToken.");
    }

    // Verify token
    const decodedToken = this.jwt.decode(refreshToken);
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });
    if (!user) {
      reply.code(401); // Unauthorized
      throw new Error("Invalid refreshToken.");
    }

    // Generate new tokens
    const newToken = await reply.jwtSign(
      { id: user.id },
      { expiresIn: "1m" }
    );
    const newRefreshToken = await reply.jwtSign({ ...user, expiresIn: "1d" });

    reply
      .setCookie("token", newToken, {})
      .setCookie("refreshToken", newRefreshToken, {})
      .send({
        response: "Tokens successfully refreshed.",
      });
  } catch (error) {
    reply.send(error);
  }
}
