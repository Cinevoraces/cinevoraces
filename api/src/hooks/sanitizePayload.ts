import type {
  FastifyRequest as Request,
  FastifyPluginCallback,
} from 'fastify';
import plugin from 'fastify-plugin';
import sanitizeHtml from 'sanitize-html';

export const sanitizePayloadHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  /**
   * **Sanitize Payload**
   * @preHandler
   * @description 
   * Look for any HTML tags in the payload and remove them.
   * This hook is executed on every endpoints.
   */
  fastify.addHook('preHandler', async (
    request: Request,
  ) => {
    if (request.body) request.body = sanitizeObject(request.body as Record<string, unknown>);
  });
    
  done();
};

/**
 * **sanitizeString**
 * @description Sanitize HTML of a string
 * @param dirty string to sanitize
 * @returns sanitized string
 * @docs https://github.com/apostrophecms/sanitize-html
 */
export const sanitizeString = (
  dirty: string,
): string => {
  return sanitizeHtml(dirty, {
    allowedTags: [],
    disallowedTagsMode: 'discard',
    // Those are for exemple only as they are not allowed in tags
    allowedAttributes: {
      a: [ 'href' ],
      img: [ 'src', 'alt' ]
    },
    selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
    // URL schemes we permit
    allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'tel' ],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false
  });
};

/**
 * **sanitizeObject**
 * @description Sanitize HTML of every strings in an object
 * @param obj Object to sanitize
 * @returns sanitized object
 */
export const sanitizeObject = (
  obj: Record<string, unknown>
): Record<string, unknown> => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = sanitizeString(obj[key] as string);
    } else if (typeof obj[key] === 'object') {
      obj[key] = sanitizeObject(obj[key] as Record<string, unknown>);
    }
  }
  return obj;
};

export default plugin(sanitizePayloadHooks);
