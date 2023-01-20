import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import { EErrorMessages } from '../models/enums/_index';
import plugin from 'fastify-plugin';

export default plugin((async (fastify, opts, done) => {
  /**
   * @preValidation
   * @description This hook verifies if the password is correct.
   */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('verifyPassword', async (request: Request, reply: Reply) => {
    const { user, body } = request;
    const { _errorService, _authService } = fastify;
    const { id: userId } = user;

    if (!body || !(body as { password: string }).password)
      _errorService.send(EErrorMessages.MISSING_PASSWORD, 401);

    const isPasswordCorrect = await _authService.verifyPassword(
      userId, (body as { password: string }).password
    );

    if (!isPasswordCorrect) 
      _errorService.send(EErrorMessages.INVALID_PASSWORD, 401);
  });
  
  done();
}) as FastifyPluginCallback);
