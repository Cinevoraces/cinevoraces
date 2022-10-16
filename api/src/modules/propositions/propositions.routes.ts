import type { FastifyInstance } from 'fastify';
import { 
  getAllSlotsSchema, 
  getAllUsersPropositionSchema, 
  getUsersPropositionByIdSchema, 
  bookSlotSchema,
  unbookSlotSchema,
} from '@modules/propositions/propositions.schema';
import { 
  handleGetAllSlots, 
  handleGetAllUsersProposition,
  handleGetUsersPropositionById, 
  handleBookSlot,
  handleUnbookSlot,
} from '@modules/propositions/propositions.handler';

export const propositions = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/propositions/slots',
    schema: getAllSlotsSchema,
    handler: handleGetAllSlots,
    onRequest: [fastify.accessVerify],
  });

  fastify.route({
    method: 'PUT',
    url: '/propositions/slots/book/:id',
    schema: bookSlotSchema,
    handler: handleBookSlot,
    onRequest: [fastify.accessVerify],
  });

  fastify.route({
    method: 'PUT',
    url: '/propositions/slots/unbook/:id',
    schema: unbookSlotSchema,
    handler: handleUnbookSlot,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.passwordVerify],
  });

  fastify.route({
    method: 'GET',
    url: '/propositions/users',
    schema: getAllUsersPropositionSchema,
    handler: handleGetAllUsersProposition,
  });

  fastify.route({
    method: 'GET',
    url: '/propositions/users/:id',
    schema: getUsersPropositionByIdSchema,
    handler: handleGetUsersPropositionById,
  });
};
