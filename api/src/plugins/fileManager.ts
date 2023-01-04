import type { FastifyPluginCallback } from 'fastify';
import { fileManager } from 'src/types/_index';
import FastifyMultipart from '@fastify/multipart';
import FastifyStatic from '@fastify/static';
import { fetch } from 'undici';
import fs from 'fs';
import pump from 'pump';
import plugin from 'fastify-plugin';
import { Stream } from 'stream';

/**
 * **File Manager**
 * @description
 * This plugin is used to parse multipart/form-data requests.
 * It also provides a fileManager object that can be used to manage files stored on the server.
 */
const fileManager: FastifyPluginCallback = async (fastify, opts, done) => {
  // Register FastifyMultipart plugin
  if (fastify.multipartErrors) 
    return fastify.log.warn('Fastify/multipart already registered');
  if (fastify.hasDecorator('sendFile'))
    return fastify.log.warn('Fastify/sendFile already registered');
  fastify.register(FastifyMultipart, {
    limits: { // limits in bytes
      fieldNameSize: 100, 
      fieldSize: 100,
      fileSize: 10000000,
    }
  });
  fastify.register(FastifyStatic, { root: '/' } );

  // File Manager object
  const fileManager: fileManager = {
    file: {
      url: null,
      path: null,
      mimetype: null,
      fileName: null,
      file: null,
    },
    pump,
    fs,
    // Generate a random GUID (Globally Unique Identifier) that have length of 36 characters
    generateGuid: () => {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
    },
    saveFileFromExternalApi: async (url: string): Promise<string> => {
      const res = await fetch(url);
      let fileName: string;
      let isUnique = false;

      while (!isUnique) {
        fileName = fileManager.generateGuid(); 
        fs.readdirSync(`/${process.env.STORAGE_POSTER}`).find((file) => file === fileName)
          ? isUnique = false
          : isUnique = true;
      }

      fileName = `${fileName}.${(res.headers.get('content-type') as string).split('/')[1]}`;
      const path = `/${process.env.STORAGE_POSTER}/${fileName}`;
      Stream.Readable.fromWeb(res.body).pipe(fs.createWriteStream(path));
      return fileName;
    }
  };

  fastify.decorate('fileManager', { getter: () => fileManager });
  fastify.decorateRequest('fileManager', { getter: () => fastify.fileManager });

  done();
};

export default plugin(fileManager);
