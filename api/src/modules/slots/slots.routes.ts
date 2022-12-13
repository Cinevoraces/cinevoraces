import type { FastifyInstance } from 'fastify';
import { 
  getSlotsSchema, 
  bookSlotSchema,
  adminUnbookSlotSchema,
} from './slots.schema';
import { 
  handleGetSlots, 
  handleBookSlot,
  handleAdminUnbookSlot,
} from './slots.handler';

export const slots = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/slots',
    schema: getSlotsSchema,
    handler: handleGetSlots,
    onRequest: [fastify.verifyAccessToken],
  });

  fastify.route({
    method: 'PUT',
    url: '/slots/book/:id',
    schema: bookSlotSchema,
    handler: handleBookSlot,
    onRequest: [fastify.verifyAccessToken],
    preValidation: [fastify.hasProposition, fastify.isSlotBooked],
  });

  fastify.route({
    method: 'PUT',
    url: '/admin/slots/unbook/:id',
    schema: adminUnbookSlotSchema,
    handler: handleAdminUnbookSlot,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.verifyPassword, fastify.isSlotBooked],
  });
};
