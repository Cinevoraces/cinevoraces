import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import { comparePassword, hashPassword } from '@src/utils/bcryptHandler';
import { createUser, findUserByPseudoOrMail, getTokenObject } from '@modules/auth/auth.datamapper';

type Request = FastifyRequest<{
  Body: {
    pseudo: string;
    mail: string;
    password: string;
  };
}>;

/**
 * **Register a new user**
 * @description
 * - Check if user exists and password validity
 * - Hash password and create user
 * - Send success message
 * @body { *pseudo*, *mail*, *password* }
 */
export const handleRegister = async (request: Request, reply: Reply) => {
  const { pgClient, body } = request;
  let { pseudo, mail, password } = body;

  try {
    // Duplicate check
    const { rows: user, rowCount: isUser } = await pgClient.query(
      findUserByPseudoOrMail(pseudo, mail)
    );
    
    if (isUser) {
      reply.code(409); // Conflict
      if (mail === user[0].mail) {
        throw new Error('Cette adresse mail est déjà associée à un compte.');
      } else if (pseudo === user[0].pseudo) {
        throw new Error('Ce pseudo est déjà utilisé.');
      }
    }

    // Test and Hash password
    if (!password.match(process.env.PASS_REGEXP)) {
      reply.code(422); // Unprocessable Entity
      throw new Error('Le format du mot de passe est invalide.');
    }
    password = await hashPassword(password);

    // Create user
    await pgClient.query(
      createUser({ pseudo, mail, password })
    );
    reply
      .code(201) // Created
      .send({ message: `Utilisateur "${pseudo}" créé avec succés.` });
  } catch (error) {
    reply.send(error);
  }
};

/**
 * **Login function**
 * @description
 * - Check if user exists and password match
 * - Prepare user data and access/refresh tokens
 * - Send user object, tokens and success message
 * @body { *pseudo*, *password* }
 */
export const handleLogin = async (request: Request, reply: Reply) => {
  const { pgClient, body } = request;
  const { pseudo, password } = body;

  try {
    const { rows: user, rowCount: isUser } = await pgClient.query(
      getTokenObject({ pseudo })
    );

    if (!isUser) {
      reply.code(404); // Not Found
      throw new Error('Utilisateur introuvable.');
    }

    const isPasswordCorrect = await comparePassword(password, user[0].password);
    if (!isPasswordCorrect) {
      reply.code(401); // Unauthorized
      throw new Error('Mot de passe incorrect.');
    }

    const userObject = { 
      id: user[0].id,
      pseudo: user[0].pseudo,
      mail: user[0].mail,
      role: user[0].role,
      avatar_url: user[0].avatar_url,
    };

    // Generate tokens
    const accessToken = await reply.jwtSign(
      { id: user[0].id, pseudo: user[0].pseudo, role: user[0].role, expiresIn: '1m' }
    );
    const refreshToken = await reply.jwtSign(
      { id: user[0].id, expiresIn: '1d' }
    );

    reply
      .setCookie('refresh_token', refreshToken, {
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

/**
 * **Access Token refreshing function**
 * @description
 * - Look for user decoded infos from request.user
 * - Check if user exists in database
 * - Generate new tokens
 * - Send new tokens and success message
 */
export const handleRefreshToken = async (request: Request, reply: Reply) => {
  const { pgClient, user } = request;
  const { id } = user;

  try {
    // Look for user in DB
    const { rows, rowCount: isUser } = await pgClient.query(
      getTokenObject({ id })
    );

    if (!isUser) {
      reply.code(401); // Not Found
      throw new Error('Utilisateur introuvable, token compromis.');
    }

    // Generate new tokens
    const accessToken = await reply.jwtSign(
      { id: rows[0].id, pseudo: rows[0].pseudo, role: rows[0].role, expiresIn: '1m' }
    );
    const refreshToken = await reply.jwtSign(
      { id: rows[0].id, expiresIn: '1d' }
    );

    reply
      .setCookie('refresh_token', refreshToken, {
        signed: true,
      })
      .send({
        user: { ...rows[0] },
        token: accessToken,
        response: 'Tokens régénérés avec succés.',
      });
  } catch (error) {
    reply.send(error);
  }
};
