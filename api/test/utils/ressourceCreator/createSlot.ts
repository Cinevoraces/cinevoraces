import type { proposition_slot, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { createRessource } from './createRessource';

export default async function createSlot (params?: Pick<Prisma.proposition_slotCreateInput, 'is_booked'>) {
  const fakeSlot: Prisma.proposition_slotCreateInput = {
    season: {
      connect: {
        id: 1
      }
    },
    episode: faker.datatype.number(),
    publishing_date: faker.date.recent(),
    is_booked: false,
    ...params
  };
  
  const data = await createRessource<proposition_slot, Prisma.proposition_slotCreateInput, Prisma.proposition_slotUpdateInput>(fakeSlot, 'proposition_slot');

  return data;
}
