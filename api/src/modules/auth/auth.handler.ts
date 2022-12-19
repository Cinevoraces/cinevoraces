import type { FastifyReply as Reply, FastifyRequest as Request } from 'fastify';
import { ApiError, ApiResponse } from '../../types/_index';
import { 
  createUser, 
  findUserByPseudoOrMail, 
  getPrivateUser 
} from './auth.datamapper';

/**
 * **Register a new user**
 * @description
 * - Check if user exists and password validity
 * - Hash password and create user
 * - Send success message
 */
export const handleRegister = async (
  request: Request<{
    Body: {
      pseudo: string;
      mail: string;
      password: string;
    }
  }>,
  reply: Reply
) => {
  const { error, pgClient, body } = request;
  let { pseudo, mail, password } = body;

  // Duplicate check
  const { rows: user, rowCount: isUser } = await pgClient.query(
    findUserByPseudoOrMail(pseudo, mail)
  );
  if (isUser && mail === user[0].mail)
    error.send(ApiError.DUPLICATE_MAIL, 409);
  if (isUser && pseudo === user[0].pseudo)
    error.send(ApiError.DUPLICATE_PSEUDO, 409);

  // Test and Hash password
  if (!password.match(process.env.PASS_REGEXP))
    error.send(ApiError.INVALID_PASSWORD_FORMAT, 422);
  
  password = await request.bcryptHash(password);

  // Create user
  await pgClient.query(
    createUser({ pseudo, mail, password })
  );
  
  reply
    .code(201)
    .send({ message: ApiResponse.CREATE_USER_SUCCESS });
};

/**
 * **Login function**
 * @description
 * - Check if user exists and password match
 * - Prepare user data and access/refresh tokens
 * - Send user object, tokens and success message
 */
export const handleLogin = async (
  request: Request<{
    Body: {
      pseudo?: string;
      mail?: string;
      password: string;
    }
  }>,
  reply: Reply
) => {
  const { error, pgClient, body } = request;
  const { mail, pseudo, password } = body;

  const { rows: user, rowCount: isUser } = await pgClient.query(
    getPrivateUser(pseudo ? { pseudo } : { mail })
  );

  // Check if user exists
  if (!isUser)
    error.send(ApiError.INVALID_USER, 404);
    // Check if password match
  const isPasswordCorrect = await request.bcryptCompare(password, user[0].password);
  if (!isPasswordCorrect)
    error.send(ApiError.INVALID_PASSWORD, 401);

  const userObject = { 
    id: user[0].id,
    pseudo: user[0].pseudo,
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
    .code(200)
    .setCookie('refresh_token', refreshToken, { signed: true })
    .send({
      user: userObject,
      token: accessToken,
      message: `${ApiResponse.LOGIN_SUCCESS} ${pseudo} !`,
    });
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
  const { error, pgClient, user } = request;
  const { id } = user;

  // Look for user in DB
  const { rows, rowCount: isUser } = await pgClient.query(
    getPrivateUser({ id })
  );

  if (!isUser)
    error.send(ApiError.INVALID_TOKEN, 401);

  // Generate new tokens
  const accessToken = await reply.jwtSign(
    { id: rows[0].id, pseudo: rows[0].pseudo, role: rows[0].role, expiresIn: '1m' }
  );
  const refreshToken = await reply.jwtSign(
    { id: rows[0].id, expiresIn: '1d' }
  );

  reply
    .code(200)
    .setCookie('refresh_token', refreshToken, { signed: true })
    .send({
      user: { ...rows[0] },
      token: accessToken,
      message: ApiResponse.REFRESH_SUCCESS,
    });
};
