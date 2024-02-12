export interface IQuery {
    SELECT: string;
    WHERE: string;
    LIMIT: string;
    SORT: string;
    values: Array<unknown>;
}
