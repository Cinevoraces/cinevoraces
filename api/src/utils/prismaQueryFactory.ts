import type PrismaQuery from '@src/types/Query';
import type { Prisma } from '@prisma/client';
import objectHandler from './objectHandler';

export default function prismaQueryFactory(
  querystring: PrismaQuery.Querystring, 
  dataType: 'Movie' | 'User' | 'Slot',
  userId?: number
) {
  const { filter, pop, limit, asc, desc } = querystring;
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
        const sortEnumerator: Prisma.MovieScalarFieldEnum[] = [
          'id',
          'french_title',
          'release_date',
          'publishing_date',
          'release_date', 
          'created_at',
          'updated_at',
        ];
        const factoredFilters: typeof prismaQuery = {
          where: { AND: objectHandler.keysToArray(enumerator, filter) }
        };
        if (userId) {
          const userFilters = objectHandler.filterKeys(loggedEnumerator, filter);
          if (userFilters.rating) userFilters.rating = { lte: userFilters.rating };
          if (Object.keys(userFilters).length > 0) factoredFilters.where = {
            ...factoredFilters.where,
            review: { some: { user_id: userId, ...userFilters } },
          };
        };
        if (desc || asc) {
          sortEnumerator.find((item) => item === desc) &&
            (factoredFilters.orderBy = { [desc]: 'desc' });
          sortEnumerator.find((item) => item === asc) &&
            (factoredFilters.orderBy = { [asc]: 'asc' });
        }
        prismaQuery = { ...prismaQuery, ...factoredFilters };
      };
      break;

    case 'User':
      if (pop) {
        const enumerator: Array<keyof Prisma.userSelect> = [
          'movies', 
          'reviews'
        ];
        const factoredFilters = {
          include: objectHandler.filterKeys(enumerator, pop)
        };
        if (Object.keys(factoredFilters.include).length > 0) {
          prismaQuery = { ...prismaQuery, ...factoredFilters as PrismaQuery.include };
        }
      }
      break;

    case 'Slot':
      if (filter) {
        const enumerator: Prisma.Proposition_slotScalarFieldEnum[] = [
          'is_booked',
          'season_number'
        ];
        const sortEnumerator: Prisma.Proposition_slotScalarFieldEnum[] = [
          'id',
          'publishing_date',
          'episode'
        ];
        const factoredFilters: typeof prismaQuery = {
          where: { AND: objectHandler.keysToArray(enumerator, filter) }
        };
        if (desc || asc) {
          sortEnumerator.find((item) => item === desc) &&
            (factoredFilters.orderBy = { [desc]: 'desc' });
          sortEnumerator.find((item) => item === asc) &&
            (factoredFilters.orderBy = { [asc]: 'asc' });
        }
        prismaQuery = { ...prismaQuery, ...factoredFilters };
      }
      break;
  }
  if (limit) prismaQuery = { ...prismaQuery, take: limit };

  return prismaQuery;
}
