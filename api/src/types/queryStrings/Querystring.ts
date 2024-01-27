export interface QueryString<S = undefined, W = undefined> {
    select?: S;
    where?: W;
    sort?: 'asc' | 'desc';
    limit?: number;
}
