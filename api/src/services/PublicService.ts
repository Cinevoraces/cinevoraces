import { EDocType } from '@src/types';
import { getFolderPath } from '@src/utils';
import Service from './Service';

export type GetDocumentByIdFn = (type: EDocType, id: number) => Promise<string>;

export default class PublicService extends Service {
    /**
     * Get document by entity type and id
     */
    getDocumentById: GetDocumentByIdFn = async (type, entityId) => {
        // FIXME: API parameter should directly ask for EDocType
        const tableName = [
            { type: EDocType.AVATAR, table: 'user' },
            { type: EDocType.POSTER, table: 'movie' },
        ].find(({ type: t }) => t === type)?.table;

        if (!tableName)
            throw new ServerError(400, 'INVALID_DOC_TYPE', 'Invalid document type, should be "avatar" or "poster"');

        // Get the file path
        const { rows, rowCount } = await this.postgres.query<{ filename: string; content_type: string }>({
            text: ` 
                    SELECT filename, content_type FROM document 
                    WHERE type = $1 
                    AND document_group_id = 
                    (SELECT document_group_id FROM ${tableName} WHERE id = $2);`,
            values: [type, entityId],
        });

        if (!rowCount) throw new ServerError(404, 'NOT_FOUND', 'Requested document does not exist'); // issues/168
        return `${getFolderPath('public')}/${type}${entityId}.${rows[0].content_type.split('/')[1]}`;
    };
}
