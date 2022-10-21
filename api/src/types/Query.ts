declare namespace PrismaQuery {
  interface Querystring {
    filter?: Record<string, unknown>;
    pop?: Record<string, unknown>;
    limit?: number;
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
      [key: string]: boolean;
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
