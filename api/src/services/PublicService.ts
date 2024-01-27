import { EDocType } from '@src/types';
import { getFolderPath } from '@src/utils';
import Service from './Service';

export type GetDocumentByIdFn = (type: EDocType, id: number) => Promise<string>;

export default class PublicService extends Service {
    /**
     * Get document by entity type and id
     */
    getDocumentById: GetDocumentByIdFn = async (type, entityId) => {
        const table = [
            { type: EDocType.AVATAR, table: 'public.user' },
            { type: EDocType.POSTER, table: 'public.movie' },
        ].find(({ type: t }) => t === type)?.table;

        if (!table)
            throw new ServerError(
                400,
                'INVALID_DOC_TYPE',
                'Invalid document type, should be "avatar" (0) or "poster" (1)',
            );

        const { rows, rowCount } = await this.postgres.query<{ filename: string; content_type: string }>({
            text: ` 
                    SELECT filename, content_type FROM document 
                    WHERE type = $1 AND document_group_id = 
                    (SELECT document_group_id FROM ${table} WHERE id = $2);`,
            values: [type, entityId],
        });
        if (!rowCount) throw new ServerError(404, 'NOT_FOUND'); // issues/168

        return `${getFolderPath('public')}/${rows[0].filename}.${rows[0].content_type.split('/')[1]}`;
    };
}
