import type { Prisma } from '@prisma/client';
import prisma from './prisma';

export interface RessourceCreator<T> {
  data: T,
  update: (params: unknown)=>void,
  remove: ()=>void
};

export async function createRessource<T, CreateInput, UpdateInput>(data: CreateInput, model: Prisma.ModelName): Promise<RessourceCreator<T>> {
  let where: object;
  // @ts-expect-error - Prisma doesn't know about our models
  const element = await prisma[model].create({
    data: data
  });

  switch (model) {
    case 'review':
      where = {
        user_id_movie_id: {
          user_id: element.user_id,
          movie_id: element.movie_id
        } };
      break;
    default:
      where = { id: element.id };
  }

  const update = async (params: UpdateInput) => {
    // @ts-expect-error - Prisma doesn't know about our models
    await prisma[model].update({
      where: where,
      data: params
    });
  };

  const remove = async () => {
    // @ts-expect-error - Prisma doesn't know about our models
    await prisma[model].delete({
      where: where
    });
  };

  return { data: element, remove, update };
}
