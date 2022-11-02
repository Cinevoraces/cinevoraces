import type { FastifyInstance } from 'fastify';
import { 
  getSlotsSchema, 
  bookSlotSchema,
  adminUnbookSlotSchema,
} from '@modules/slots/slots.schema';
import { 
  handleGetSlots, 
  handleBookSlot,
  handleAdminUnbookSlot,
} from '@modules/slots/slots.handler';

export const slots = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/slots',
    schema: getSlotsSchema,
    handler: handleGetSlots,
    onRequest: [fastify.accessVerify],
  });

  fastify.route({
    method: 'PUT',
    url: '/slots/book/:id',
    schema: bookSlotSchema,
    handler: handleBookSlot,
    onRequest: [fastify.accessVerify],
    preValidation: [fastify.userHasProposition],
  });

  fastify.route({
    method: 'PUT',
    url: '/admin/slots/unbook/:id',
    schema: adminUnbookSlotSchema,
    handler: handleAdminUnbookSlot,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.passwordVerify, fastify.isSlotBooked],
  });
};
