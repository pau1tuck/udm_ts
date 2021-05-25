export interface ICreateTrack {
    trackId: number;
    artist: string;
    title: string;
    version: string;
    label: string;
    buyUrl: string;
    month: number;
    year: number;
}

export interface ITrack extends ICreateTrack {
    id: string;
    createdAt: string;
    updatedAt: string;
    votes: number;
}
