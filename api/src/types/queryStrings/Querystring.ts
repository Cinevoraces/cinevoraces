export interface QueryString<S, W> {
    select?: S;
    where?: W;
    sort?: 'asc' | 'desc';
    limit?: number;
}
