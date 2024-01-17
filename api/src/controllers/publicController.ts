import { EDocType, EErrorMessages, ESchemasIds } from '@src/types';
import { type FastifyInstance, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';

/**
 * @description File serving API.
 * @prefix /public
 */
export default async (fastify: FastifyInstance) => {
    /**
     * @description Get file.
     * @route GET /:docType/:entityId
     * @param {number} entityId - Entity's id.
     * @param {string} docType - File enum type "avatar" | "poster".
     * @returns file.
     */
    fastify.route({
        method: 'GET',
        url: '/:docType/:entityId',
        schema: fastify.getSchema(ESchemasIds.GETFileByEntityId),
        handler: async function (request: Request<{ Params: { docType: string; entityId: number } }>, reply: Reply) {
            const { docType, entityId } = request.params;
            let type: EDocType;

            if (docType === 'avatar') type = EDocType.AVATAR;
            else if (docType === 'poster') type = EDocType.POSTER;
            else this._errorService.send(`"${docType}" ${EErrorMessages.INVALID_PUBLIC_ENTITY}`, 400);

            const path = await this._fileService.getDocumentByEntityId(type, entityId);
            if (!path) this._errorService.send(EErrorMessages.NOT_FOUND, 404);
            await reply.sendFile(path);
        },
    });
};
