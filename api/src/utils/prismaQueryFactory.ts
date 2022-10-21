import type PrismaQuery from '@src/types/Query';
import type { Prisma } from '@prisma/client';
import objectHandler from './objectHandler';

export default function prismaQueryFactory(
  querystring: PrismaQuery.Querystring, 
  dataType: 'Movie' | 'User' | 'Slot',
  userId?: number
) {
  const { filter, pop, limit } = querystring;
  let prismaQuery: PrismaQuery.FactoredQuery = {};
  switch (dataType) {
    case 'Movie':
      if (filter) {
        const enumerator: Prisma.MovieScalarFieldEnum[] = [
          'is_published', 
          'season_id', 
          'user_id'
        ];
        const loggedEnumerator: Prisma.ReviewScalarFieldEnum[] = [
          'bookmarked',
          'liked',
          'viewed',
          'rating',
          'comment' 
        ];
        const factoredFilters: typeof prismaQuery = {
          where: { AND: objectHandler.keysToArray(enumerator, filter) }
        };
        if (userId) {
          const userFilters = objectHandler.filterKeys(loggedEnumerator, filter);
          if (Object.keys(userFilters).length > 0) factoredFilters.where = {
            ...factoredFilters.where,
            review: {
              some: {
                user_id: userId,
                ...userFilters,
              }
            },
          };
        };
        prismaQuery = { 
          ...prismaQuery,
          ...factoredFilters
        };
      };
      break;

    case 'User':
      if (pop) {
        const enumerator: Array<keyof Prisma.userSelect> = ['movies', 'reviews'];
        const factoredFilters = {
          include: objectHandler.filterKeys(enumerator, pop)
        };
        if (Object.keys(factoredFilters.include).length > 0) {
          prismaQuery = {
            ...prismaQuery,
            ...factoredFilters as PrismaQuery.include
          };
        }
      }
      break;

    case 'Slot':
      if (filter) {
        const enumerator: Prisma.Proposition_slotScalarFieldEnum[] = [
          'is_booked'
        ];
        const factoredFilters: typeof prismaQuery = {
          where: { AND: objectHandler.keysToArray(enumerator, filter) }
        };
        prismaQuery = { 
          ...prismaQuery,
          ...factoredFilters
        };
      }
      if (limit) {
        prismaQuery = { 
          ...prismaQuery, 
          take: limit, 
          orderBy: { publishing_date: 'desc' } 
        };
      }
      break;
  }

  return prismaQuery;
}
