import type { FastifyPluginCallback } from 'fastify';
import type { Readable } from 'stream';
import type { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import type { MultipartFile } from '@fastify/multipart';
import { EErrorMessages } from '../models/enums/_index';
import plugin from 'fastify-plugin';
import fs from 'fs';
import { v2 } from 'cloudinary';
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
  public cloudinaryConfig = { cloudinary_url: process.env.CLOUDINARY_URL };

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
    return new Promise<void>((resolve, reject) => {
      const ws = fs.createWriteStream(path);
      stream.pipe(ws);
      ws.on('error', reject);
      ws.on('finish', resolve);
      ws.on('close', resolve);
    });
  };

  /**
   * @description Delete a file from disk
   * @param {string} path Path to delete file from
   */
  public async deleteFile(path: string): Promise<void> {
    await fs.promises.unlink(path);
  };

  /**
   * @description Find the first file starting with a given string
   * @param {string} path Path to search in
   * @param {string} startsWith String to search for
   * @returns Promise: string containing the path to the file
   */
  public async findFileById(path: string, startsWith: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) reject(err);
        else {
          for (const file of files) 
            if (file.startsWith(startsWith)) return resolve(`${path}/${file}`);
            
          resolve(null);
        }
      });
    });
  };
    
  /**
   * @description Compress and save new user avatar using Cloudinary.
   * @param {object} user - User's id and pseudo.
   * @param {object} avatar - The file to upload.
   */
  public async UploadAvatar(
    user: { id: number, pseudo: string },
    avatar: MultipartFile
  ): Promise<{ avatar_url: string }> {
    const public_id = `${user.id}-${this.generateGuid()}`;
    const tempFile = `temp_${user.id}-${user.pseudo}.${avatar.mimetype.split('/')[1]}`;
    const tempFilePath = `${this.paths.temp}/${tempFile}`;
    await this.saveFile(tempFilePath, avatar.file);

    // Remove current avatar
    const currentAvatar = await this.findFileById(this.paths.avatar, `${user.id}-`);
    currentAvatar && this.deleteFile(currentAvatar);

    // Upload avatar to Cloudinary for compression
    const cloudinaryRes = await this.cloudinaryUpload(tempFilePath, {
      folder: 'cinevoraces',
      tags: 'avatar',
      width: 200,
      height: 200,
      crop: 'fill',
      gravity: 'faces',
      format: 'jpeg',
      public_id,
    });

    if (!cloudinaryRes)
      throw new Error(EErrorMessages.CLOUDINARY_FAILURE);

    // Download compressed file from Cloudinary
    const { stream, ext } = await this.downloadFile(cloudinaryRes.url);
    await this.saveFile(`${this.paths.avatar}/${public_id}.${ext}`, stream);
    // Delete temp files
    this.deleteFile(tempFilePath);
    await this.cloudinaryDelete(tempFile);
        
    return { avatar_url: `${this.nextPaths.avatar}/${public_id}.${ext}` };
  }

  /**
   * @description Upload image to Cloudinary account.
   * @param {string} filePath - The name of the file to upload.
   * @param {object} UploadApiOptions - The options to pass to the upload API.
   */
  private async cloudinaryUpload(
    filePath: string,
    UploadApiOptions: UploadApiOptions
  ): Promise<UploadApiResponse> {
    v2.config(this.cloudinaryConfig);
    try {
      const res = await v2.uploader.upload(filePath, UploadApiOptions);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  
  /**
   * @description Delete image from Cloudinary account.
   * @param {string} publicId - The public id of the image to delete.
   * @returns {boolean} - True if image is deleted, false otherwise.
   */
  private async cloudinaryDelete(publicId: string): Promise<boolean> {
    v2.config(this.cloudinaryConfig);
    try {
      const cloudinaryRes = await v2.uploader.destroy(publicId);
      return cloudinaryRes.result === 'ok';
    } catch (err) {
      console.error(err);
    }
  }
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
