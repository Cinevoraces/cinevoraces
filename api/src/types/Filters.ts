import { movie } from "@prisma/client";

export declare module Filters {
  type Movie = Pick<movie, "is_published" | "season_id" | "user_id"> & {orderBy: "asc" | "desc" , pagination: number};
}

export default Filters;
