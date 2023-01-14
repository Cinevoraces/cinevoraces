export interface PQuerystring {
  select?: Record<string, unknown>;
  where?: Record<string, unknown>;
  sort?: 'asc' | 'desc';
  limit?: number;
};
