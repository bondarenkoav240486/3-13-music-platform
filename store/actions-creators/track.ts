// import {Dispatch} from "react";
// import {TrackAction, TrackActionTypes} from "../../types/track";
// import axios from "axios";

// export const fetchTracks = () => {
//     return async (dispatch: Dispatch<TrackAction>) => {
//         try {
//             const response = await axios.get('http://localhost:5000/tracks')
//             dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
//         } catch (e) {
//             dispatch({
//                 type: TrackActionTypes.FETCH_TRACKS_ERROR,
//                 payload: 'Произошла ошибка при загрузке треков'})
//         }
//     }
// }


import { Dispatch } from "react";
import { TrackAction, TrackActionTypes } from "../../types/track";
import { ITrack } from "../../types/track";

import axios from "axios";

// Новий інтерфейс для відповіді сервера
// interface FetchTracksResponse {
//     data: ITrack[];
//     total: number;
// }

/**
 * Функція для отримання списку треків з сервера з пагінацією
 * @param count - кількість треків на сторінці
 * @param offset - зміщення (скільки треків пропустити)
 */
export const fetchTracks = (count: number = 10, offset: number = 0) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            // const response = await axios.get<FetchTracksResponse>(`http://localhost:5000/tracks?count=${count}&offset=${offset}`);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `tracks?count=${count}&offset=${offset}`);
            console.log(response)
            dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка при загрузке треков'
            });
        }
    };
};
