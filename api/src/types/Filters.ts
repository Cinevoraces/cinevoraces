import { movie, proposition_slot } from "@prisma/client";

export declare module Filters {
  type Movie = Pick<movie, "is_published" | "season_id" | "user_id">;
  type Slot = Pick<proposition_slot, "is_booked">;
  type User = {
    "metrics": boolean, 
    "movies": boolean,
    "reviews": boolean
  };
};

export default Filters;
