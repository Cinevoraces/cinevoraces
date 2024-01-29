import { EDocType } from '@src/types';
import { docTypes } from '@src/types/enums/EDocType';
import { getFolderPath } from '@src/utils';
import Service from './Service';

export type GetDocumentByIdFn = (type: string, id: number) => Promise<string>;

export default class PublicService extends Service {
    /**
     * Get document by entity type and id
     */
    getDocumentById: GetDocumentByIdFn = async (type, entityId) => {
        const docType = this.getDocType(type);
        const table = [
            { type: EDocType.AVATAR, table: 'public.user' },
            { type: EDocType.POSTER, table: 'public.movie' },
        ].find(({ type: t }) => t === docType)?.table;

        const { rows, rowCount } = await this.postgres.query<{ filename: string; content_type: string }>({
            text: ` 
                    SELECT filename, content_type FROM document 
                    WHERE type = $1 AND document_group_id = 
                    (SELECT document_group_id FROM ${table} WHERE id = $2);`,
            values: [docType, entityId],
        });

        if (!rowCount) throw new ServerError(404, 'NOT_FOUND');

        return `${getFolderPath('public')}/${rows[0].filename}.${rows[0].content_type.split('/')[1]}`;
    };

    private getDocType = (entity: string) => {
        const docType = docTypes[entity];
        if (docType === undefined) throw new ServerError(404, 'NOT_FOUND');
        return docType;
    };
}
