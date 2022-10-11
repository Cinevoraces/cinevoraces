import type Filters from "@src/types/Filters";
import { Prisma } from "@prisma/client";

export default function filtersFactorySlot(
  filters: Filters.Slot
): Prisma.proposition_slotWhereInput[] {
  if (filters === undefined) return null;
  const keys = Object.keys(filters);
  return (keys as Array<keyof Filters.Slot>).reduce<Prisma.proposition_slotWhereInput[]>(
    (acc, key) => {
      if (typeof filters[key] === "undefined") return acc;
      if (key === "is_booked") {
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
