import { Dispatch } from "react";
import { TrackAction, TrackActionTypes } from "../../types/track";
import axios from "axios";


// export const fetchSearchTracks = (searchTerm) => {
    export const fetchSearchTracks = (searchTerm, count: number = 10, offset: number = 0) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            // const response = await axios.get('http://localhost:5000/tracks')
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `tracks/search?query=${searchTerm}&count=${count}&offset=${offset}`)
            // console.log(response.data)
            console.log(response)
            dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data })
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Виникла помилка при завантаженні пісень'
            })
        }
    }
}
