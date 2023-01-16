import type { FastifyPluginCallback } from 'fastify';
import verifyPassword from './verifyPassword';
import verifyTokens from './verifyTokens';
import preHandlerSanitizePayload from './preHandlerSanitizePayload';
import preHandlerMovies from './preHandlerMovies';
import preHandlerReview from './preHandlerReview';

/**
 * **Hooks Registration _index**
 * Add any new hook to this array.
 */
export default [
  preHandlerSanitizePayload,
  verifyPassword,
  verifyTokens,
  preHandlerMovies,
  preHandlerReview,
] as Array<FastifyPluginCallback>;
