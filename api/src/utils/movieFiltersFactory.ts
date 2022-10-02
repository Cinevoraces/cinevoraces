import type Filters from "@src/types/Filters";
import { Prisma } from "@prisma/client";
import { config } from "process";

type FilterConfig = {
  orderBy: "asc" | "desc"
}

const defaultConfig: FilterConfig = { orderBy : "asc"}

export default function movieFiltersFactory(
  filters: Filters.Movie,
  config: FilterConfig = defaultConfig
): {
  where: Prisma.movieWhereInput[]
  orderBy: Prisma.movieOrderByWithRelationInput | null
} {
  if (!filters) return null
  const keys = Object.keys(filters);
  const where = (keys as Array<keyof Filters.Movie>).reduce<Prisma.movieWhereInput[]>(
    (acc, key) => {
      if (typeof filters[key] === "undefined") return acc;
      if (key === "is_published") {
        return [
          ...acc,
          {
            [key]: filters[key],
          },
        ];
      }
      if (key === "season_id") {
        return [
          ...acc,
          {
            [key]: filters[key],
          },
        ];
      }
      if (key === "user_id") {
        return [
          ...acc,
          {
            [key]: filters[key],
          },
        ];
      }
      if (key === "lastest") {
        return [
          ...acc
        ]
      }
      return acc;
    },
    []
  );

  const orderBy = orderByHandler(config.orderBy)

  return { where, orderBy }
}


const orderByHandler = (order: "asc" | "desc"): Prisma.movieOrderByWithRelationInput => {
  return {
    publishing_date: order
  }
}