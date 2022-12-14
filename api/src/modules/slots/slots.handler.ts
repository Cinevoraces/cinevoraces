import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '../../types/_index';
import { ApiError, ApiResponse } from '../../types/_index';
import { getSlots, updateSlot } from './slots.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
  Params: { id: number };
}>;

/**
 * **Get slots**
 * @description Get slots according to query.
*/
export const handleGetSlots = async (request: Request, reply: Reply) => {
  const { error, pgClient, query } = request;

  const { rows: slots, rowCount } = await pgClient.query(
    getSlots(query)
  );

  if (!rowCount)
    error.send(ApiError.NO_SLOT_AVAILABLE, 404);

  reply
    .code(200)
    .send(slots);
};

/**
 * **Book slot**
 * @description Book a slot as user
*/
export const handleBookSlot = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { id: slotId } = params;

  await pgClient.query(
    updateSlot(slotId, true)
  );

  reply
    .code(204)
    .send({ message: ApiResponse.SLOT_BOOKING_SUCCESS });
};

/**
 * **Unbook slot (ADMIN)**
 * @description Unbook a slot as Admin
*/
export const handleAdminUnbookSlot = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { id: slotId } = params;

  await pgClient.query(
    updateSlot(slotId, false)
  );

  reply
    .code(204)
    .send({ message: ApiResponse.SLOT_RELEASE_SUCCESS });
};
