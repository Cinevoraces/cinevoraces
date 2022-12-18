import type { FastifyPluginCallback } from 'fastify';
import type { ApiError } from '../types/_index';
import plugin from 'fastify-plugin';

/**
 * **Server Error**
 * @description
 * This plugin binds an Error handler to the Fastify instance.
 */
const serverErrorHandler: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.error) 
    return fastify.log.warn('Error handler already registered');
  
  const sendError = (message: ApiError, statusCode: number, detailedMessage?: string) => {
    throw new ServerError(message, statusCode, detailedMessage);
  };

  fastify
    .decorate('error', { send: sendError })
    .decorateRequest('error', { getter: () => fastify.error });
  done();
};

class ServerError {
  statusCode: number;
  message: string;
  detailedMessage: string;
  
  constructor(message: string, statusCode: number, detailedMessage?: string,) {
    this.message = message;
    this.statusCode = statusCode;
    this.detailedMessage = detailedMessage;
  }
}

export default plugin(serverErrorHandler);
