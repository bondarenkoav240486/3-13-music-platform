// import {TrackAction, TrackActionTypes, TrackState} from "../../types/track";

// const initialState: TrackState = {
//     tracks: [],
//     error: ''
// }

// export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
//     switch (action.type) {
//         case TrackActionTypes.FETCH_TRACKS_ERROR:
//             return {...state, error: action.payload}
//         case TrackActionTypes.FETCH_TRACKS:
//             return {error: '', tracks: action.payload}
//         default:
//             return state
//     }
// }


import { TrackAction, TrackActionTypes } from "../../types/track";
import { ITrack } from "../../types/track";

// Оновлений інтерфейс для стану треків
export interface TrackState {
    tracks: {
        data: ITrack[]; // Массив треків
        total: number; // Загальна кількість треків
    };
    error: string;
}

const initialState: TrackState = {
    tracks: {
        data: [],
        total: 0,
    },
    error: ''
}

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return { ...state, error: action.payload };
        case TrackActionTypes.FETCH_TRACKS:
            return { ...state, tracks: action.payload }; // Збереження отриманих треків
        default:
            return state;
    }
}
