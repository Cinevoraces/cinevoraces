export interface QueryString {
    select?: Record<string, unknown>;
    where?: Record<string, unknown>;
    sort?: 'asc' | 'desc';
    limit?: number;
}
