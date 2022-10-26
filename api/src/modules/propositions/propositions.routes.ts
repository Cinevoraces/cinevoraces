// import type { FastifyInstance } from 'fastify';
// import { 
//   getAllSlotsSchema, 
//   getAllPropositionsSchema, 
//   getUsersPropositionByIdSchema, 
//   bookSlotSchema,
//   unbookSlotSchema,
// } from '@modules/propositions/propositions.schema';
// import { 
//   handleGetAllSlots, 
//   handleGetAllPropositions,
//   handleGetUserPropositionByid, 
//   handleBookSlot,
//   handleUnbookSlot,
// } from '@modules/propositions/propositions.handler';

// export const propositions = async (fastify: FastifyInstance) => {
//   fastify.route({
//     method: 'GET',
//     url: '/propositions/slots',
//     schema: getAllSlotsSchema,
//     handler: handleGetAllSlots,
//     onRequest: [fastify.accessVerify],
//   });

//   fastify.route({
//     method: 'PUT',
//     url: '/propositions/slots/book/:id',
//     schema: bookSlotSchema,
//     handler: handleBookSlot,
//     onRequest: [fastify.accessVerify],
//     preValidation: [fastify.userHasProposition],
//   });

//   fastify.route({
//     method: 'PUT',
//     url: '/propositions/slots/unbook/:id',
//     schema: unbookSlotSchema,
//     handler: handleUnbookSlot,
//     onRequest: [fastify.isAdmin],
//     preValidation: [fastify.passwordVerify, fastify.isSlotBooked],
//   });

//   fastify.route({
//     method: 'GET',
//     url: '/propositions',
//     schema: getAllPropositionsSchema,
//     handler: handleGetAllPropositions,
//   });

//   fastify.route({
//     method: 'GET',
//     url: '/propositions/users/:id',
//     schema: getUsersPropositionByIdSchema,
//     handler: handleGetUserPropositionByid,
//   });
// };
