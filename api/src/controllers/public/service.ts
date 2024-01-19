import { getFolderPath } from '@src/utils';
import { type PoolClient } from 'pg';
import { type GetDocumentByIdFn } from './types';

export default async (postgres: PoolClient) => {
    /**
     * Get document by entity type and id
     */
    const getDocumentById: GetDocumentByIdFn = async (type, entityId) => {
        // FIXME: API parameter should directly ask for EDocType
        if (!['avatar', 'poster'].includes(type))
            throw new ServerError(400, 'INVALID_DOC_TYPE', 'Invalid document type, should be "avatar" or "poster"');

        const tableName = type === 'avatar' ? '"user"' : '"movie"';

        // Get the file path
        const { rows, rowCount } = await postgres.query<{ filename: string; content_type: string }>({
            text: ` 
                    SELECT filename, content_type FROM document 
                    WHERE type = $1 
                    AND document_group_id = 
                    (SELECT document_group_id FROM ${tableName} WHERE id = $2);`,
            values: [type, entityId],
        });

        // issues/168 - FIXME: This should not return the final error message
        if (!rowCount) throw new ServerError(404, 'NOT_FOUND', 'Requested document does not exist');
        return `${getFolderPath('public')}/${type}${entityId}.${rows[0].content_type.split('/')[1]}`;
    };

    return {
        getDocumentById,
    };
};
