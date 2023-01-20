import type { FastifyError, FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';
import fs from 'fs';

/**
 * @description Error Service manage errors, error messages, and error logs.
 * Any error related operations should be done through this service.
 */
class ErrorService {
  private readonly path = `${process.env.ROOT_PATH='/api'}/logs`;

  public send(message: string, statusCode: number): void {
    throw { message, statusCode };
  }

  public mailTo(): void {
    // TODO: Send error to admin via email
  }

  /**
   * @description Create an error log file with the error message and stack trace.
   */
  public log(error: FastifyError): void {
    const date = new Date().toISOString().split('T')[0];
    const statusCode = String(error.statusCode) ?? '500';
    const log = `${date} - STATUS_CODE: ${statusCode}
      ${error.message}\n${error.stack}\n\n
    `;

    const ws = fs.createWriteStream(`${this.path}/${date}-${statusCode}.txt`);
    ws.write(log);
    ws.end();
  }
}

// Decorate FastifyInstance with ErrorService
const ErrorServiceInstance = new ErrorService();
export type TErrorService = typeof ErrorServiceInstance;
export default plugin((async (fastify, opts, done) => {
  // Check if service is already registered
  if (fastify.hasDecorator('_errorService'))
    return fastify.log.warn('ErrorService already registered');
  
  fastify.decorate('_errorService', ErrorServiceInstance);
  done();
}) as FastifyPluginCallback);
