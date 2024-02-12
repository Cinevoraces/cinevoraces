export interface QueryString<S = undefined, W = undefined> {
    select?: S;
    where?: W;
    sort?: 'asc' | 'desc';
    limit?: number;
}

export interface BaseQuery {
    select?: Record<string, unknown>;
    set?: Record<string, unknown>;
    where?: Record<string, unknown>;
    sort?: 'asc' | 'desc';
    limit?: number;
}
