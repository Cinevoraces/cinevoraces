import type Filters from '@src/types/Filters';
import type { Prisma } from '@prisma/client';

interface FilterConfig {
  orderBy: 'asc' | 'desc'
};

const defaultConfig: FilterConfig = { orderBy : 'asc' };

export default function movieFiltersFactory(
  filters: Filters.Movie,
): {
    where: Prisma.movieWhereInput[]
    orderBy: Prisma.movieOrderByWithRelationInput | null
    pagination: { take: number }
  } {
  if (!filters) return null;
  const keys = Object.keys(filters);
  const where = (keys as Array<keyof Filters.Movie>).reduce<Prisma.movieWhereInput[]>(
    (acc, key) => {
      if (typeof filters[key] === 'undefined') return acc;
      if (key === 'is_published') {
        return [
          ...acc,
          {
            [key]: filters[key],
          },
        ];
      }
      if (key === 'season_id') {
        return [
          ...acc,
          {
            [key]: filters[key],
          },
        ];
      }
      if (key === 'user_id') {
        return [
          ...acc,
          {
            [key]: filters[key],
          },
        ];
      }
      return acc;
    },
    []
  );

  const orderBy = orderByHandler(filters.orderBy);
  const pagination = paginationHandler(filters.pagination);

  return { where, orderBy, pagination };
}

const orderByHandler = (order: 'asc' | 'desc'): Prisma.movieOrderByWithRelationInput => {
  if (!order) return;
  return {
    publishing_date: order
  };
};

const paginationHandler = (take: number): {
  take: number
} => {
  if (!take) return;
  return {
    take
  };
};
