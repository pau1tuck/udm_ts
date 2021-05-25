export interface ITrack {
    trackId: number;
    artist: string;
    title: string;
    version?: string;
    label?: string;
    buyUrl?: string;
    month: number;
    year: number;
}
