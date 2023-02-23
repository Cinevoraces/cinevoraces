import type {
  FastifyInstance,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from 'fastify';

import {
  ESchemasIds,
  EErrorMessages,
  EResponseMessages,
} from '../models/enums/_index';

const aTokenOptions = { expiresIn: 60 };
const rTokenOptions = { expiresIn: '1d' };

/**
 * @description Auth API.
 * @prefix /
 */
export default async (fastify: FastifyInstance) => {
  /**
   * @description Register a new user.
   * @route POST /register
   */
  fastify.route({
    method: 'POST',
    url: '/register',
    schema: fastify.getSchema(ESchemasIds.POSTRegister),
    handler: async function (
      request: Request<{ Body: { pseudo: string; mail: string; password: string } }>,
      reply: Reply
    ) {
      const { _errorService, _authService } = this;
      const { body } = request;

      // Duplicate check
      const user = await _authService.getUserByPseudoOrMail(body.pseudo, body.mail);
      if (user && body.mail === user.mail)
        _errorService.send(EErrorMessages.DUPLICATE_MAIL, 409);
      if (user && body.pseudo === user.pseudo)
        _errorService.send(EErrorMessages.DUPLICATE_PSEUDO, 409);
      console.log('----------', body.password, '----------');
      // Test and Hash password
      if (!body.password.match(process.env.PASS_REGEXP))
        _errorService.send(EErrorMessages.INVALID_PASSWORD_FORMAT, 422);

      body.password = await _authService.hashString(body.password);

      // Create user
      await _authService.createUser(body);

      reply
        .code(200)
        .send({ message: EResponseMessages.CREATE_USER_SUCCESS });
    },
  });

  /**
   * @description Log a user.
   * @route POST /login
   */
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: fastify.getSchema(ESchemasIds.POSTLogin),
    handler: async function (
      request: Request<{ Body: { pseudo?: string; mail?: string; password: string } }>,
      reply: Reply
    ) {
      const { _errorService, _authService } = this;
      const { mail, pseudo, password } = request.body;

      const privateUser = await _authService.getPrivateUser(pseudo ? { pseudo } : { mail });
      if (!privateUser) // Check if user exists
        _errorService.send(EErrorMessages.INVALID_USER, 404);
      // Check if password match
      const isPasswordCorrect = await _authService.verifyPassword(privateUser.id, password);
      if (!isPasswordCorrect)
        _errorService.send(EErrorMessages.INVALID_PASSWORD, 401);

      const tokensContent = {
        id: privateUser.id,
        pseudo: privateUser.pseudo,
        role: privateUser.role,
      };

      // Generate tokens
      const accessToken = await reply.jwtSign(tokensContent, aTokenOptions);
      const refreshToken = await reply.jwtSign(tokensContent, rTokenOptions);

      reply
        .code(200)
        .setCookie('refresh_token', refreshToken, {
          signed: true,
          httpOnly: false,
          secure: true,
          sameSite: 'strict',
          expires: new Date(new Date().setDate(new Date().getDate() + 1)),
        })
        .send({
          user: privateUser,
          token: accessToken,
          message: `${EResponseMessages.LOGIN_SUCCESS} ${privateUser.pseudo} !`,
        });
    },
  });

  /**
   * @description Refresh access token.
   * @route GET /refresh
   */
  fastify.route({
    method: 'GET',
    url: '/refresh',
    schema: fastify.getSchema(ESchemasIds.GETRefresh),
    onRequest: [fastify.verifyRefreshToken],
    handler: async function (request: Request, reply: Reply) {
      const { _errorService, _authService } = this;
      const { user } = request;

      const privateUser = await _authService.getPrivateUser({ id: user.id });

      if (!privateUser)
        _errorService.send(EErrorMessages.COMPROMISED_SESSION, 401);

      // Generate new tokens
      const tokensContent = {
        id: privateUser.id,
        pseudo: privateUser.pseudo,
        role: privateUser.role,
      };

      // Generate tokens
      const accessToken = await reply.jwtSign(tokensContent, aTokenOptions);
      const refreshToken = await reply.jwtSign(tokensContent, rTokenOptions);

      reply
        .code(200)
        .setCookie('refresh_token', refreshToken, {
          signed: true,
          httpOnly: false,
          secure: true,
          sameSite: 'strict',
          expires: new Date(new Date().setDate(new Date().getDate() + 1)),
        })
        .send({
          user: privateUser,
          token: accessToken,
          message: EResponseMessages.REFRESH_SUCCESS,
        });
    },
  });
};
