import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import { getSlots, updateSlot } from '@modules/slots/slots.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
  Params: { id: number };
}>;

/**
 * **Get slots**
 * @description
 * Get all users from database
 * @query
 * - where[id]: filter by id
 * - where[is_booked]: filter by booked status
 * - where[season_number]: filter by season number
 * - where[episode]: filter by episode number
*/
export const handleGetSlots = async (request: Request, reply: Reply) => {
  const { pgClient, query } = request;

  try {
    const { rows: slots, rowCount } = await pgClient.query(
      getSlots(query)
    );

    if (!rowCount) {
      reply.code(404);
      throw new Error('Aucun créneau disponible.');
    }

    reply.send(slots);
  } catch (error) {
    reply.send(error);
  }
};

/**
 * **Book slot**
 * @description
 * Book a slot as user
*/
export const handleBookSlot = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { id: slotId } = params;

  try {
    await pgClient.query(
      updateSlot(slotId, true)
    );

    const response = {
      message: 'Ce créneau a bien été réservé.',
    };

    reply.send(response);
  } catch (error) {
    reply.send(error);
  }
};

/**
 * **Unbook slot (ADMIN)**
 * @description
 * Unbook a slot as Admin
*/
export const handleUnbookSlot = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { id: slotId } = params;

  try {
    await pgClient.query(
      updateSlot(slotId, false)
    );

    const response = {
      message: 'Ce créneau a bien été libéré.',
    };

    reply.send(response);
  } catch (error) {
    reply.send(error);
  }
};
