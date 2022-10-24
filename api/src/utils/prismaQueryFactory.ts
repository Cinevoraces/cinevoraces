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
    case 'Movie': {
      const filterEnumerator: Array<Prisma.MovieScalarFieldEnum> = [
        'is_published', 
        'season_id', 
        'user_id',
      ];
      const loggedFilterEnumerator: Array<Prisma.ReviewScalarFieldEnum> = [
        'bookmarked',
        'liked',
        'viewed',
        'rating',
        'comment' 
      ];
      const popEnumerator: Array<string> = [
        'review'
      ];
      const sortEnumerator: Array<Prisma.MovieScalarFieldEnum> = [
        'id',
        'french_title',
        'release_date',
        'publishing_date',
        'release_date', 
        'created_at',
        'updated_at',
      ];

      if (filter) prismaQuery = filterBuilder(filterEnumerator, filter, prismaQuery);
      if (filter && userId) {
        const userFilters = objectHandler.filterKeys(loggedFilterEnumerator, filter);
        if (userFilters.rating) userFilters.rating = { lte: userFilters.rating };
        if (Object.keys(userFilters).length > 0) prismaQuery.where = {
          ...prismaQuery.where,
          review: { some: { user_id: userId, ...userFilters } },
        };
      };
      if (pop) prismaQuery = populatorBuilder(popEnumerator, pop, prismaQuery);
      if (asc) prismaQuery = sortBuilder(sortEnumerator, asc, 'asc', prismaQuery);
      if (desc) prismaQuery = sortBuilder(sortEnumerator, desc, 'desc', prismaQuery);

      // Movies are always joined with countries, genres and languages
      prismaQuery.include = {
        ...prismaQuery.include,
        user: true,
        movie_has_country: {
          select: { country: { select: { name: true } } }
        },
        movie_has_genre: {
          select: { genre: { select: { name: true } } }
        },
        movie_has_language: { 
          select: { language: { select: { name: true } } }
        },
      };
      break;
    }
    case 'User': {
      const popEnumerator: Array<keyof Prisma.userSelect> = [
        'movies', 
        'reviews'
      ];
      if (pop) prismaQuery = populatorBuilder(popEnumerator, pop, prismaQuery); 
      break;
    }

    case 'Slot': {
      const filterEnumerator: Prisma.Proposition_slotScalarFieldEnum[] = [
        'is_booked',
        'season_number'
      ];
      const sortEnumerator: Prisma.Proposition_slotScalarFieldEnum[] = [
        'id',
        'publishing_date',
        'episode'
      ];
      if (filter) prismaQuery = filterBuilder(filterEnumerator, filter, prismaQuery);
      if (asc) prismaQuery = sortBuilder(sortEnumerator, asc, 'asc', prismaQuery);
      if (desc) prismaQuery = sortBuilder(sortEnumerator, desc, 'desc', prismaQuery);
      break;
    }
  }
  if (limit) prismaQuery = { ...prismaQuery, take: limit };

  return prismaQuery;
}

const filterBuilder = (
  enumerator: Array<string>,
  filter: Record<string, unknown>,
  prismaQuery: PrismaQuery.FactoredQuery
) => {
  return { ...prismaQuery, where: { AND: objectHandler.keysToArray(enumerator, filter) } };
};

const populatorBuilder = (
  enumerator: Array<string>, 
  pop: Record<string, unknown>,
  prismaQuery: PrismaQuery.FactoredQuery
): PrismaQuery.FactoredQuery => {
  const factoredFilters = {
    include: objectHandler.filterKeys(enumerator, pop)
  };
  if (Object.keys(factoredFilters.include).length > 0) {
    return { ...prismaQuery, ...factoredFilters as PrismaQuery.include };
  }
};

const sortBuilder = (
  enumerator: Array<string>,
  sort: string,
  sortBy: 'asc' | 'desc',
  prismaQuery: PrismaQuery.FactoredQuery
): PrismaQuery.FactoredQuery => {
  if (enumerator.find((item) => item === sort)) {
    return { ...prismaQuery, orderBy: { [sort]: sortBy } };
  }
};
