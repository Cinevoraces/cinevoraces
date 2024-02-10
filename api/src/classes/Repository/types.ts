import type { Query } from '../Query';

export interface IRepository<T, CREATE = Record<string, unknown>> {
    getMany: (query: Query) => Promise<Array<T>>;
    getById: (id: number) => Promise<T>;
    create: (payload: CREATE) => Promise<T>;
    update: (query: Query) => Promise<void>;
    delete: (id: number) => Promise<void>;
}
