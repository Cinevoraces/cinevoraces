import { faker } from '@faker-js/faker';
import { movie, Prisma } from '@prisma/client';
import { createRessource } from './createRessource';

export default async function createMovie (userId?: number, params?: Pick<Prisma.movieCreateInput, "is_published" >) {
  const fakeMovie: Prisma.movieCreateInput = {
    french_title: faker.lorem.sentence(),
    original_title: faker.lorem.sentence(),
    poster_url: faker.internet.url(),
    directors: [faker.name.fullName(), faker.name.fullName()],
    release_date: faker.date.past(),
    runtime: 150,
    casting: [faker.name.fullName(), faker.name.fullName(), faker.name.fullName()],
    presentation: faker.lorem.paragraph(2),
    is_published: true,
    user: {
      connectOrCreate: {
        where: {
          id: userId ?? 1
        },
        create: {
          pseudo: faker.internet.userName(),
          mail: faker.internet.email(),
          password: faker.internet.password()
        }
      }
    },
    season: {
      connect: {
        id: 1
      }
    },
    publishing_date: faker.date.recent(),
    created_at: faker.date.recent(),
    updated_at: null,
    movie_has_country: {
      create: {
        country: {
          connectOrCreate: {
            where: {
              id: 1
            },
            create: {
              name: faker.address.country()
            }
          }
        }
      }
    },
    movie_has_genre: {
      create: {
        genre: {
          connectOrCreate: {
            where: {
              id: 1
            },
            create: {
              name: faker.lorem.word()
            }
          }
        }
      }
    },
    movie_has_language: {
      create: {
        language: {
          connectOrCreate: {
            where: {
              id: 1
            },
            create: {
              name: faker.lorem.word()
            }
          }
        }
      }
    },
    ...params
  }
  
  const data = await createRessource<movie, Prisma.movieCreateInput, Prisma.movieUpdateInput>(fakeMovie, "movie")

  return data
}