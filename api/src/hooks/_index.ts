import { verifyTokensHooks } from './verifyTokens';
import { verifyRolesHooks } from './verifyRoles';
import { verifyMoviesHooks } from './verifyMovies';
import { verifyPasswordHooks } from './verifyPassword';
import { findOrCreateReviewHooks } from './findOrCreateReview';
import { sanitizePayloadHooks } from './sanitizePayload';
import { multer } from './multer';

/**
 * **Hooks _index**
 * @description
 * Hooks are functions to call before a route handler.
 * Add any new hook to this array.
 */
export const hooks = [
  findOrCreateReviewHooks,
  sanitizePayloadHooks,
  verifyTokensHooks,
  verifyRolesHooks,
  verifyMoviesHooks,
  verifyPasswordHooks,
  multer
];
