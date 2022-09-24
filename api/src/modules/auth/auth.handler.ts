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

  // Duplicate check
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ mail }, { pseudo }] },
    });

    if (user) {
      // French messages are to be displayed in front
      if (mail === user.mail)
        throw new Error("Cette adresse mail est déjà associée à un compte.");
      if (pseudo === user.pseudo)
        throw new Error("Ce pseudo est déjà utilisé.");
    }
  } catch (error) {
    // 409: Conflict
    reply.code(409).send(error);
  }

  // Test and Hash password
  if (!process.env.PASS_REGEXP) {
    // 500: Internal Server Error
    reply.code(500).send(new Error("No password regexp found."));
  }
  if (!password.match(process.env.PASS_REGEXP)) {
    // 422: Unprocessable Entity
    reply.code(422).send(new Error("Invalid password."));
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  // Create user
  try {
    await prisma.user.create({
      data: {
        pseudo,
        mail,
        password,
      },
    });

    // 201: Created
    reply
      .code(201)
      .send({ message: `Utilisateur "${pseudo}" créé avec succés.` });
  } catch (error) {
    reply.send(error);
  }
};

export const login = async (request: Request, reply: Reply) => {
  const { prisma } = request;
};