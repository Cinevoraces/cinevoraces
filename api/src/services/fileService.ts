import type { PoolClient } from 'pg';
import type { FastifyPluginCallback } from 'fastify';
import type { Readable } from 'stream';
import type { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import type { MultipartFile } from '@fastify/multipart';
import { EDocType } from '../models/enums/_index';
import { EErrorMessages } from '../models/enums/_index';
import DatabaseService from './databaseService';
import plugin from 'fastify-plugin';
import fs from 'fs';
import { v2 } from 'cloudinary';
import { fetch, FileReader } from 'undici';

/**
 * @description File service takes care of downloading/saving/naming files to disk.
 * Any file system related operations should be done through this service.
 */
class FileService extends DatabaseService {
  constructor(client: PoolClient) {
    super(client);
  }
  
  public files = [] as Array<{
    filename?: string;
    path?: string;
    contentType?: string;
    ext?: string;
    stream?: Readable;
  }>;
  public paths = {
    root: '/',
    temp: '/api/temp',
    log: '/api/logs',
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
  public async downloadFile(url: string, retryCount = 0): Promise<{ blob: Blob, contentType: string }> {
    try {
      const res = await fetch(url);
      return {
        blob: await res.blob(),
        contentType: res.headers.get('content-type'),
      };
    } catch (err) {
      if (retryCount < 3)
        return this.downloadFile(url, retryCount + 1);
      else
        return;
    }
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
   * @description Get buffer from blob
   * @param {Blob} blob blob to convert
   * @returns Promise: Buffer
   */
  public async BlobToBuffer(blob: Blob): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(Buffer.from(reader.result as ArrayBuffer));
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };

  /**
   * @description Find the first file starting with a given string
   * @param {string} path Path to search in
   * @param {string} startsWith String to search for
   * @returns Promise: string containing the path to the file
   */
  public async findFileById(path: string, startsWith: string): Promise<string> {
    // NOTE: Currently unused, but might be useful in the future
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
   * @description Get document using entity id and document type
   * @param {EDocType} type Document type id
   * @param {number} entityId Entity's id
   * @returns Promise: Object containing a blob data string of the document and its content type
   */
  public async getDocumentByEntityId(type: EDocType, entityId: number): Promise<Array<{ blob: string, contentType: string }>> {
    let entitySelection: string;
    if (type === EDocType.AVATAR)
      entitySelection = '"user"';
    else if (type === EDocType.POSTER || type === EDocType.SCREENSHOT)
      entitySelection = '"movie"';
    else
      return [];
    
    const { rows } = await this.requestDatabase({
      text: ` SELECT data as blob, content_type as contentType FROM document WHERE type = $1 
              AND document_group_id = (SELECT document_group_id FROM ${entitySelection} WHERE id = $2);`,
      values: [type, entityId],
    }) as { rows: Array<{ blob: string, contentType: string }> };

    return rows;
  };
  
  /**
   * @description Upload a movie poster using an external url.
   * @param {object} movieId - movie's id.
   * @param {object} url - The file to upload.
   */
  public async UploadMoviePoster(
    movieId: number,
    url: string,
  ): Promise<void> {
    // NOTE: It is currently possible for a movie to have multiple posters.
    // This is not a used feature for now, but might be useful in the future.
    const { blob, contentType } = await this.downloadFile(url);

    // Add file to the movie's documents
    await this.requestDatabase({
      text: ` DECLARE l_document_group_id INTEGER;
              BEGIN
                SELECT document_group_id INTO l_document_group_id FROM movie WHERE movie_id = $1;
                INSERT INTO "document" ("document_group_id", "data", "content_type", "type")
                  VALUES (l_document_group_id, $2, $3, $4);
              END;`,
      values: [movieId, blob, contentType, EDocType.POSTER],
    });
  }

  /**
   * @description Compress and save new user avatar using Cloudinary.
   * @param {object} userId - User's id.
   * @param {object} avatar - The file to upload.
   */
  public async UploadAvatar(
    userId: number,
    avatar: MultipartFile
  ): Promise<void> {
    const public_id = this.generateGuid();
    const tempFilePath = `${this.paths.temp}/${public_id}.${avatar.mimetype.split('/')[1]}`;
    await this.saveFile(tempFilePath, avatar.file);

    // Upload avatar to Cloudinary for compression
    const cloudinaryRes = await this.cloudinaryUpload(tempFilePath, {
      folder: 'cinevoraces',
      tags: 'avatar',
      width: 200,
      height: 200,
      crop: 'fill',
      gravity: 'faces',
      format: 'jpeg', //!\ Beware of hard coded mime type below /!\\
      public_id,
    });

    if (!cloudinaryRes)
      throw new Error(EErrorMessages.CLOUDINARY_FAILURE);

    // Download compressed file from Cloudinary and save it to database
    const { blob } = await this.downloadFile(cloudinaryRes.url);
    await this.requestDatabase({
      text: ' SELECT add_or_update_avatar($1, $2, $3);',
      values: [userId, blob, 'image/jpeg'],
    });

    // Delete temp files
    await this.deleteFile(tempFilePath);
    await this.cloudinaryDelete(public_id);
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
export type TFileService = InstanceType<typeof FileService>;
export default plugin((async (fastify, opts, done) => {
  // Check if service is already registered
  if (fastify.hasDecorator('_fileService'))
    return fastify.log.warn('FileService already registered');

  fastify.decorate('_fileService', { getter: () => new FileService(fastify._postgres.client) });
  done();
}) as FastifyPluginCallback);
