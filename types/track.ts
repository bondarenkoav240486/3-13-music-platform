export interface IComment {
    _id: string;
    username: string;
    text: string
}

export interface ITrack {
    _id: string;
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: IComment[]
}
// export interface ITrack {
//     _id: string;
//     name: string;
//     artist: string;
//     audio: string; // URL аудіофайлу
//     picture: string; // URL зображення
//     listens: number; // Кількість прослуховувань
//     comments: string[]; // Масив ID коментарів
//     createdAt: Date; // Дата створення
//     updatedAt: Date; // Дата оновлення
// }
export interface Tracks {
        data: ITrack[]; // Массив треків
        total: number; // Загальна кількість треків
}


export interface TrackState {
    tracks: ITrack[];
    error: string;
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS;
    // payload: ITrack[]
    payload: Tracks
    // payload: {
    //     data: ITrack[]; // Массив треків
    //     total: number; // Загальна кількість треків
    // };

}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction
