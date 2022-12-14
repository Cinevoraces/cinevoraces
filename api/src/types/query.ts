declare namespace Query {
  interface querystring {
    select?: Record<string, unknown>;
    where?: Record<string, unknown>;
    sort?: 'asc' | 'desc';
    limit?: number;
  }
  interface preparedQuery {
    text: string;
    values?: Array<unknown>;
  }

}

export type { Query };
