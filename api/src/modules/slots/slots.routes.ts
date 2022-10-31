import type { FastifyInstance } from 'fastify';
import { 
  getSlotsSchema, 
  bookSlotSchema,
  unbookSlotSchema,
} from '@modules/slots/slots.schema';
import { 
  handleGetSlots, 
  handleBookSlot,
  handleUnbookSlot,
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
    url: '/slots/unbook/:id',
    schema: unbookSlotSchema,
    handler: handleUnbookSlot,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.passwordVerify, fastify.isSlotBooked],
  });
};
