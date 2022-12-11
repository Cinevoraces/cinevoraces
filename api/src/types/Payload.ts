import type { Database } from '@src/types/Database';

declare namespace Payload {
  interface register {
    pseudo: string;
    mail: string;
    password: string;
  }

  interface updateUser {
    password: string;
    update_user?: {
      pseudo?: string;
      mail?: string;
      password?: string;
    };
  }

  interface updateProposedMovie {
    movie_id: number;
    presentation: string;
  }

  interface createSeason {
    year: number;
    season_number: number;
  }

  type reviewMovie = Record<keyof Pick<Database.review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>, boolean | number | string>;

  interface proposeMovie {
    french_title: string;
    original_title: string;
    poster_url: string;
    directors: Array<string>;
    release_date: string;
    runtime: number;
    casting: Array<string>;
    presentation: string;
    publishing_date: string;
    user_id: number;
    season_id: number;
    movie_genres: Array<string>;
    movie_languages: Array<string>;
    movie_countries: Array<string>;
  }
}

export type { Payload };
