import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { proposition } from '@src/types/proposition';
import type Filters from '@src/types/Filters';
import filtersFactorySlots from '@src/utils/filtersFactorySlots';

type Request = FastifyRequest<{
  Querystring: {
    filter: Filters.Slot;
  };
  Params: {
    id: number;
  };
}>;

export const handleGetAllSlots = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const filters = filtersFactorySlots(request.query.filter);

  try {
    const slots = await prisma.proposition_slot.findMany(
      filters && {
        where: { AND: [...filters]},
      }
    );

    if (slots.length === 0) {
      reply.code(404);
      throw new Error('Aucun créneau disponible.');
    }

    reply.send(slots);
  } catch (error) {
    reply.send(error);
  }
};

export const handleBookSlot = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id: slotId } = request.params;
  const { id: userId } = request.user;

  try {
    const proposition: Array<proposition> = await prisma.$queryRaw`
      SELECT * FROM pending_propositions WHERE user_id=${userId};
    `;

    if (proposition.length > 0) {
      reply.code(401);
      throw new Error('Vous avez déjà une proposition en attente. Vous pourrez réserver un nouveau créneau une fois votre proposition publiée.');
    }

    const slot = await prisma.proposition_slot.findUnique({
      where: { id: slotId },
      select: { is_booked: true },
    });

    if (slot.is_booked) {
      reply.code(401);
      throw new Error('Ce créneau est déjà réservé.');
    }

    await prisma.proposition_slot.update({
      where: { id: slotId },
      data: { is_booked: true },
    });

    const response = {
      message: 'Ce créneau a bien été réservé.',
    };

    reply.send(response);
  } catch (error) {
    reply.send(error);
  }
};

export const handleUnbookSlot = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id: slotId } = request.params;

  try {
    const slot = await prisma.proposition_slot.findUnique({
      where: { id: slotId },
      select: { is_booked: true },
    });

    if (!slot.is_booked) {
      reply.code(406);
      throw new Error('Ce créneau n\'est pas réservé.');
    }

    await prisma.proposition_slot.update({
      where: { id: slotId },
      data: { is_booked: false },
    });

    const response = {
      message: 'Ce créneau a bien été libéré.',
    };

    reply.send(response);
  } catch (error) {
    reply.send(error);
  }
};

export const handleGetAllUsersProposition = async (request: Request, reply: Reply) => {
  const { prisma } = request;

  try {
    const proposition: Array<proposition> = await prisma.$queryRaw`
      SELECT * FROM pending_propositions;
    `;

    if (proposition.length === 0) {
      reply.code(404);
      throw new Error('Aucune proposition en attente.');
    }

    reply.send(proposition);
  } catch (error) {
    reply.send(error);
  }
};

export const handleGetUserPropositionByid = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id } = request.params;

  try {
    const proposition: Array<proposition> = await prisma.$queryRaw`
      SELECT * FROM pending_propositions WHERE user_id=${id};
    `;

    if (proposition.length === 0) {
      reply.code(404);
      throw new Error('Aucune proposition en attente.');
    }

    reply.send(proposition[0]);
  } catch (error) {
    reply.send(error);
  }
};
