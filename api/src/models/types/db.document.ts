import type { EDocType } from '../enums/EDocType';

export interface dbDocument {
    id: number;
    data: string;
    content_type: string;
    type: EDocType;
    created_at: Date;
}
