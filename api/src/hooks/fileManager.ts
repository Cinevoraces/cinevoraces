import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import { ApiError, MimeType } from '../types/_index';
import plugin from 'fastify-plugin';

export const fileManagerHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  /**
   * **Handle avatar file upload**
   * @preValidation
   * @description
   * Check and save avatar file to server, then pass the file location to the next handler.
  */
  fastify.decorate('handleAvatarMultipartContent', async (
    request: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reply: Reply
  ) => {
    const { error, user, fileManager } = request;
    const { file } = fileManager;
    const avatar = await request.file();

    const allowedMimeTypes = [
      MimeType.PNG,
      MimeType.GIF,
      MimeType.JPEG,
      MimeType.JPG,
      MimeType.WEBP,
      MimeType.ICO,
    ];

    // File validation checks
    if (!allowedMimeTypes.includes(avatar.mimetype as MimeType))
      error.send(ApiError.INVALID_MIME_TYPE, 415);
    avatar.file.on('limit', () => {
      error.send(ApiError.INVALID_FILE_SIZE, 413);
    });
    
    // Update file object
    file.fileName = `${user.id}_${user.pseudo}.${avatar.mimetype.split('/')[1]}`;
    file.mimetype = avatar.mimetype as MimeType;
    file.file = avatar.file;
  });

  done();
};

export default plugin(fileManagerHooks);
