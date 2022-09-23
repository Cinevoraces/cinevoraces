import { Prisma } from "@prisma/client"
import prisma from "./prisma"

export type RessourceCreator<T>= {
  data: T,
  remove: () => {}
}

export async function createRessource<T, CreateInput, UpdateInput>(data:CreateInput, model:Prisma.ModelName): Promise<RessourceCreator<T>> {

  // @ts-expect-error
  const element = await prisma[model].create({
    data: data
  })

  const remove = async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
    const data = await prisma[model].delete({
      where: {
       id: element.id
      }
    })
  }

  return {data: element, remove}

}