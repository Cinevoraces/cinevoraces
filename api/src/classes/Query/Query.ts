import type { BaseQuery } from '../../types';
import type { IQuery } from './types';

export default class Query implements IQuery {
    public SELECT = '';
    public WHERE = '';
    public LIMIT = '';
    public SORT = '';
    public SET = '';
    public values: Array<unknown> = [];

    constructor(query: BaseQuery) {
        query.select && this.reduceSelect(query.select);
        query.where && this.reduceWhere(query.where);
        query.sort && this.setSort(query.sort);
        query.limit && this.setLimit(query.limit);
        query.set && this.reduceSet(query.set);
    }

    private reduceSelect = (columns: Record<string, unknown>) => {
        const keys = Object.keys(columns);
        if (keys.length === 0) return;
        const query = keys
            .reduce((acc, key) => (columns[key] === false ? [...acc] : [...acc, `${key}`]), [])
            .join(', ');

        this.SELECT = query.length ? `SELECT ${query}` : '';
    };

    private reduceWhere = (
        columns: Record<string, unknown>,
    ): { query: string; count: number; values: Array<unknown> } => {
        if (columns === undefined || columns === null) return;
        const keys = Object.keys(columns);
        const values = Object.values(columns);
        const query = keys.reduce((acc, key, index) => [...acc, `${key}=$${Number(index + 1)}`], []).join('AND');

        this.values = values;
        this.WHERE = query.length ? `WHERE ${query}` : '';
    };

    private reduceSet = (columns: Record<string, unknown>) => {
        if (columns === undefined || columns === null) return;
        const keys = Object.keys(columns);
        const values = Object.values(columns);
        const query = keys
            .reduce((acc, key, index) => [...acc, `${key}=$${Number(index + 1) + this.values.length}`], [])
            .join(', ');

        this.values = [...this.values, ...values];
        this.SET = query.length ? `SET ${query}` : '';
    };

    private setSort = (sort: 'asc' | 'desc') => {
        if (sort === 'asc' || sort === 'desc') {
            this.SORT = `ORDER BY id ${sort}`;
        }
    };

    private setLimit = (limit: number) => {
        if (typeof limit === 'number' && limit > 0) {
            this.LIMIT = `LIMIT ${limit}`;
        }
    };
}
