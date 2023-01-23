import type { FastifyPluginCallback } from 'fastify';
import type { Readable } from 'stream';
import plugin from 'fastify-plugin';
import fs from 'fs';
import { fetch } from 'undici';
import { Stream } from 'stream';

/**
 * @description File service takes care of downloading/saving/naming files to disk.
 * Any file system related operations should be done through this service.
 */
class FileService {
  public files = [] as Array<{
    filename?: string;
    path?: string;
    contentType?: string;
    ext?: string;
    stream?: Readable;
  }>;
  public paths = {
    root: '/',
    avatar: '/public/avatar',
    poster: '/public/poster',
    temp: '/temp',
    log: '/logs',
  };
  public nextPaths = {
    avatar: '/avatar',
    poster: '/poster',
  };

  /**
   * @description Generate a GUID string
   * @returns GUID
   */
  public generateGuid(): string {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
  };

  /**
   * @description Download a file from a URL
   * @param {string} url URL to download from
   * @returns Promise: object containing stream, content type, and extension
   */
  public async downloadFile(url: string): Promise<{ stream: Readable, contentType: string, ext: string }> {
    const res = await fetch(url);
    return {
      stream: Stream.Readable.fromWeb(res.body),
      contentType: res.headers.get('content-type'),
      ext: res.headers.get('content-type').split('/')[1],
    };
  };

  /**
   * @description Save a file to disk
   * @param {string} path Path to save file to
   * @param {Readable} stream Stream to save
   */
  public async saveFile(path: string, stream: Readable): Promise<void> {
    const ws = fs.createWriteStream(path);
    stream.pipe(ws);

    return new Promise<void>((resolve, reject) => {
      stream.on('error', reject);
      stream.on('finish', resolve);
      stream.on('close', resolve);
    });
  };

  /**
   * @description Delete a file from disk
   * @param {string} path Path to delete file from
   */
  public async deleteFile(path: string): Promise<void> {
    try {
      fs.unlinkSync(path);
    } catch (err) {
      // TODO: SERVER ERROR LOG FILES
      // This is not a critical error, so we don't want to stop the process.
      // We do want to trace it in a log file
    }
  };
};

// Decorate FastifyInstance with FileService
export type TFileService = typeof FileServiceInstance;
const FileServiceInstance = new FileService();
export default plugin((async (fastify, opts, done) => {
  // Check if service is already registered
  if (fastify.hasDecorator('_fileService'))
    return fastify.log.warn('FileService already registered');

  fastify.decorate('_fileService', { getter: () => FileServiceInstance });
  done();
}) as FastifyPluginCallback);
