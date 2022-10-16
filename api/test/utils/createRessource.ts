import type { Prisma } from '@prisma/client';
import prisma from './prisma';

export interface RessourceCreator<T> {
  data: T,
  remove: ()=>void
};

export async function createRessource<T, CreateInput, UpdateInput>(data: CreateInput, model: Prisma.ModelName): Promise<RessourceCreator<T>> {

  // @ts-expect-error - Prisma doesn't know about our models
  const element = await prisma[model].create({
    data: data
  });

  const remove = async () => {
    // @ts-expect-error - Prisma doesn't know about our models
    const data = await prisma[model].delete({
      where: {
        id: element.id
      }
    });
  };

  return { data: element, remove };
}
