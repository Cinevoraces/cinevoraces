import type { FastifyPluginCallback } from 'fastify';
import { ApiError } from 'src/types/_index';
import { v2 } from 'cloudinary';
import plugin from 'fastify-plugin';

/**
 * **Cloudinary**
 * @description
 * This plugin binds a Cloudinary service to the Fastify instance.
 */
const cloudinaryService: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.cloudinary)
    return fastify.log.warn('Cloudinary already registered');

  /**
 * **Upload image**
 * @description
 * Uploads an image to Cloudinary.
 * @param userPseudo - The user's pseudo that will prefix filename.
 * @param filePath - The name of the file to upload.
 */
  const uploadImg = async (userPseudo: string, filePath: string) => {
    v2.config({ cloudinary_url: process.env.CLOUDINARY_URL });
    const { url } = await v2.uploader.upload(filePath, {
      folder: 'cinevoraces',
      tags: 'avatar',
      width: 200,
      height: 200,
      crop: 'fill',
      gravity: 'faces',
      format: 'jpg',
      public_id: userPseudo
    });

    if (!url)
      fastify.error.send(ApiError.CLOUDINARY_FAILURE, 500);
    // TODO: Create file management service
    // TODO: Remove temp file from server
    return url;
  };

  fastify
    .decorate('cloudinary', { uploadImg })
    .decorateRequest('cloudinary', { getter: () => fastify.cloudinary });
  done();
};

export default plugin(cloudinaryService);
