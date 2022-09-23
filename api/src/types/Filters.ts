import { movie } from "@prisma/client";

export declare module Filters {
  type Movie = Pick<movie, "is_published" | "season_id">;
}

export default Filters;
