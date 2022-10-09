import { faker } from '@faker-js/faker';
import { user, Prisma } from '@prisma/client';
import { createRessource } from './createRessource';
import bcrypt from "bcrypt";

export default async function createUser (params?: Pick<Prisma.userCreateInput, "password">) {
  const fakeUser: Prisma.userCreateInput = {
      pseudo: faker.internet.userName(),
      mail: faker.internet.email(),
      password: 'password1234',
      avatar_url: faker.image.imageUrl(),
      mail_sub: false,
      role: "user",
      created_at: faker.date.recent(),
      updated_at: null,
    ...params
  }
  const data = await createRessource<user, Prisma.userCreateInput, Prisma.userUpdateInput>(fakeUser, "user")

  return data
}