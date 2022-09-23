import type Filters from "@src/types/Filters";
import { Prisma } from "@prisma/client";

export default function movieFiltersFactory(
  filters: Filters.Movie
): Prisma.movieWhereInput[] {
  const keys = Object.keys(filters);
  return (keys as Array<keyof Filters.Movie>).reduce<Prisma.movieWhereInput[]>(
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
      return acc;
    },
    []
  );
}
