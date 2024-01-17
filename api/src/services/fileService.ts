import { EDocType } from '@src/types';
import { getFolderPath } from '@src/utils';
import { type FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';
import { type PoolClient } from 'pg';
import DatabaseService from './databaseService';

/**
 * @description File service takes care of downloading/saving/naming files to disk.
 * Any file system related operations should be done through this service.
 */
class FileService extends DatabaseService {
    constructor(client: PoolClient) {
        super(client);
    }

    /**
     * @description Get document using entity id and document type
     * @param {EDocType} type Document type id
     * @param {number} entityId Entity's id
     * @returns Promise: file path
     */
    public async getDocumentByEntityId(type: EDocType, entityId: number): Promise<string> {
        // Define wich type of file to look for
        let tableName: string;
        if (type === EDocType.AVATAR) tableName = '"user"';
        else if (type === EDocType.POSTER) tableName = '"movie"';
        else return null;

        // Get the file path
        const { rows } = (await this.requestDatabase({
            text: ` SELECT filename, content_type FROM document 
              WHERE type = $1 
              AND document_group_id = (SELECT document_group_id FROM ${tableName} WHERE id = $2);`,
            values: [type, entityId],
        })) as { rows: Array<{ filename: string; content_type: string }> };

        // Return file path if found, else return null
        return rows.length === 0
            ? null
            : `${getFolderPath('public')}/${type}${entityId}.${rows[0].content_type.split('/')[1]}`;
    }
}

// Decorate FastifyInstance with FileService
export type TFileService = InstanceType<typeof FileService>;
export default plugin((async (fastify, opts, done) => {
    // Check if service is already registered
    if (fastify.hasDecorator('_fileService')) return fastify.log.warn('FileService already registered');

    fastify.decorate('_fileService', { getter: () => new FileService(fastify.postgres) });
    done();
}) as FastifyPluginCallback);
