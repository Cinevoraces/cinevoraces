export interface dbEpisode {
    id: number;
    season_number: number;
    episode_number: number;
    publishing_date: Date;
    movie_id?: number;
}
