import type { Season } from '@src/types';

export type GetSeasonByNumberFn = (seasonNumber: number) => Promise<Season>;
export type GetSeasonsFn = () => Promise<{
    rowCount: number;
    rows: Array<unknown>;
}>;

export interface GETSeasonByNumberRequest {
    Params: { number: number };
}
