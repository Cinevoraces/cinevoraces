import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import type { FileFilter, Options } from 'fastify-multer/lib/interfaces';
import { MimeType } from '../types/_index';
import { ApiError, ApiStorage } from '../types/_index';
import plugin from 'fastify-plugin';

export const multer: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  // Private function that builds multer's options object
  const buildOpts = (destination: string, allowedMimeTypes: Array<MimeType>, limitsOpts: Options['limits']) => {
    const storage = fastify.multer.diskStorage(
      {
        destination: (req, file, cb) => {
          cb(null, destination);
        },
        filename: (req, file, cb) => {
          req.file.name = file.originalname;
          req.file.location = destination;
          req.file.path = `${destination}/${file.originalname}`;
          cb(null, file.originalname);
        },
      },
    );

    const fileFilter: FileFilter = (req, file, cb) => {
      if (!allowedMimeTypes.includes(file.mimetype as MimeType)) {
        cb(null, false);
        return cb(new Error(ApiError.INVALID_MIME_TYPE));
      }
      return cb(null, true);
    };
    const limits = limitsOpts;

    return { storage, limits, fileFilter };
  };

  /**
   * **Upload User Pic**
   * @preHandler
   * @description 
   * Look for an image file in the request body and upload it to temp.
  */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('uploadUserAvatar', async (request: Request, reply: Reply) => {
    const opts = buildOpts(
      ApiStorage.TEMP,
      [
        MimeType.PNG,
        MimeType.GIF,
        MimeType.JPEG,
        MimeType.JPG,
        MimeType.WEBP,
        MimeType.ICO
      ],
      { fileSize: 1024 * 1024 * 2, }
    );
    fastify.multer({ dest: '/api/src/storage/temp' }).single('avatar');
  });

  done();
};

export default plugin(multer);
