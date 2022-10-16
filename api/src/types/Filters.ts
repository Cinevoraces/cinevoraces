import type { movie, proposition_slot } from '@prisma/client';

export declare namespace Filters {
  type Movie = Pick<movie, 'is_published' | 'season_id' | 'user_id'>;
  type Slot = Pick<proposition_slot, 'is_booked'>;
  interface User {
    'metrics': boolean, 
    'movies': boolean,
    'reviews': boolean
  }
};

export default Filters;
