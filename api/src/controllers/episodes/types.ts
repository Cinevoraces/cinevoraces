import type { Episode } from '@src/types';

export type GetAvailableEpisodesFn = () => Promise<{ rowCount: number; rows: Array<Episode> }>;
