import type PrismaQuery from '@src/types/Query';
import type { Prisma } from '@prisma/client';

export default function prismaQueryFactory(
  querystring: PrismaQuery.Querystring, 
  dataType: 'Movie' | 'User' | 'Slot'
) {
  const { filter, pop, limit } = querystring;
  let prismaQuery: PrismaQuery.FactoredQuery = {};
  
  switch (dataType) {
    case 'Movie':
      if (filter) {
        const filtersEnum: Prisma.MovieScalarFieldEnum[] = [
          'is_published', 
          'season_id', 
          'user_id'
        ];
        const factoredFilters = whereFactory(filtersEnum, filter);
        prismaQuery = { 
          ...prismaQuery,
          ...factoredFilters
        };
      }
      break;

    case 'User':
      if (pop) {
        const populatorEnum: Array<keyof Prisma.userSelect> = ['movies', 'reviews'];
        const factoredFilters = includeFactory(populatorEnum, pop);
        prismaQuery = {
          ...prismaQuery,
          ...factoredFilters
        };
      }
      break;

    case 'Slot':
      if (filter) {
        const filtersEnum: Prisma.Proposition_slotScalarFieldEnum[] = [
          'is_booked'
        ];
        const factoredFilters = whereFactory(filtersEnum, filter);
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

function whereFactory(
  filters: Array<string>,
  query: Record<string, unknown>
): PrismaQuery.where {
  const keys = Object.keys(query);
  return {
    where: {
      AND: (keys as Array<string>).reduce(
        (acc, key) => {
          if (typeof query[key] === 'undefined') return acc;
          if (filters.find((filter) => filter === key)) {
            return [...acc, { [key]: query[key] }];
          }
          return acc;
        }, []
      ),
    },
  };
}

function includeFactory(
  populators: Array<string>,
  query: Record<string, unknown>
): PrismaQuery.include {
  let factoredQuery = {};
  for (const key in query) {
    if (populators.find((populator) => populator === key)) {
      factoredQuery = { ...factoredQuery, [key]: true };    
    }
  }
  return Object.keys(factoredQuery).length > 0 
    ? { include: factoredQuery } 
    : {};
}
