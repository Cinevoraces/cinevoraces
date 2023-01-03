import type { FastifyPluginCallback } from 'fastify';
import { fileManager } from 'src/types/_index';
import FastifyMultipart from '@fastify/multipart';
import fetch from 'node-fetch';
import fs from 'fs';
import pump from 'pump';
import plugin from 'fastify-plugin';

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
  fastify.register(FastifyMultipart, {
    limits: {
      fieldNameSize: 100, // Field name size in bytes
      fieldSize: 100, // Field value size in bytes
      fields: 10, // Number of non-file fields
      fileSize: 10000000, // File size in bytes (10Mb)
    }
  });

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
    }
  };

  fastify.decorate('fileManager', { getter: () => fileManager });
  fastify.decorateRequest('fileManager', { getter: () => fastify.fileManager });

  done();
};

export default plugin(fileManager);
