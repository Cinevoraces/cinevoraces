import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import plugin from 'fastify-plugin';

export default plugin((async (fastify, opts, done) => {

  /**
   * **Sanitize Payload**
   * @preHandler
   * @description 
   * Look for any HTML tags in the payload and remove them.
   * This hook is executed on every endpoints.
   */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.addHook('preHandler', async (request: Request, reply: Reply) => {
    if (request.body) request.body = sanitizeObject(request.body as Record<string, unknown>);
  });
    
  done();
}) as FastifyPluginCallback);

/**
 * @description Sanitize HTML tags of a string
 * @param {string} htmlString string to sanitize
 * @param {string[]} exceptions list of tags to exclude from the sanitization
 * @param {string[]} bannedWords list of words to replace with asterisks
 * @returns sanitized string
 */
const sanitizeHTMLString = (
  htmlString: string,
  exceptions: string[] = [],
  bannedWords: string[] = ['con']
): string => {
  //FIXME: exceptions and banned words are not working yet
  const htmlTagRegex = /<[^>]+>/gi;
  const bannedWordsRegex = new RegExp(`\\b(${bannedWords.join('|')})\\b`, 'gi');

  // Banned words
  const sanitizedWords = htmlString.split(' ').map((word) => {
    if (bannedWordsRegex.test(word)) return word.replace(bannedWordsRegex, '****');
    return word;
  });
  
  // HTML tags
  return sanitizedWords.join(' ').replace(htmlTagRegex, (tag) => {
    if (exceptions.includes(tag)) {
      // find any html attributes in that tag and remove them
      const attributesRegex = /(\s+)(\w+)(="[^"]+")/gi;
      return tag.replace(attributesRegex, '');
    }
    return '';
  });
};

/**
 * @description Sanitize HTML of every strings in an object
 * @param {object} obj Object to sanitize
 * @returns sanitized object
 */
const sanitizeObject = (obj: Record<string, unknown>): Record<string, unknown> => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = sanitizeHTMLString(obj[key] as string);
    } else if (typeof obj[key] === 'object') {
      obj[key] = sanitizeObject(obj[key] as Record<string, unknown>);
    }
  }
  return obj;
};
