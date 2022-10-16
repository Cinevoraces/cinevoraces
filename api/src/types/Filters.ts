import type { movie } from '@prisma/client';

export declare namespace Filters {
  type Movie = Pick<movie, 'is_published' | 'season_id' | 'user_id'>;
  interface User {
    'metrics': boolean, 
    'movies': boolean,
    'reviews': boolean
  }
};

export default Filters;
