import type { EDocType } from '@src/types';

export interface GETPublicRessourceRequest {
    Params: { docType: EDocType; entityId: number };
}
