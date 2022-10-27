declare namespace Query {
  interface querystring {
    filter?: Record<string, unknown>;
    pop?: Record<string, unknown>;
    limit?: number;
    asc?: string;
    desc?: string;
  }
  interface preparedQuery {
    text: string;
    values?: Array<unknown>;
  }

}

export type { Query };
