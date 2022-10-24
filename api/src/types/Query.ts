declare namespace PrismaQuery {
  interface Querystring {
    filter?: Record<string, unknown>;
    pop?: Record<string, unknown>;
    limit?: number;
    asc?: string;
    desc?: string;
  }
  type FactoredQuery = where & include & take & orderBy;

  interface where {
    where?: { 
      AND?: Array<Record<string, unknown>>;
      review?: {
        some?: Record<string, unknown>;
      }
    }
  }
  interface include {
    include?: {
      [key: string]: unknown;
    }
  }
  interface take {
    take?: number;
  }
  interface orderBy {
    orderBy?: {
      [key: string]: 'asc' | 'desc';
    }
  }
}

export default PrismaQuery;
