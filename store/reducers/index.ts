// import {combineReducers} from "redux";
// import {playerReducer} from "./playerReducer";
// import {HYDRATE} from "next-redux-wrapper";
// import {trackReducer} from "./trackReducer";


// const rootReducer = combineReducers({
//     player: playerReducer,
//     track: trackReducer
// })

// export const reducer = (state, action) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             ...action.payload, // apply delta from hydration
//         }
//         if (state.count) nextState.count = state.count // preserve count value on client side navigation
//         return nextState
//     } else {
//         return rootReducer(state, action)
//     }
// }

// export type RootState = ReturnType<typeof rootReducer>


import { combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { HYDRATE } from "next-redux-wrapper";
import { trackReducer } from "./trackReducer";

const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer
});

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // використання попереднього стану
            ...action.payload, // застосування змін з гідрації
        };

        // Зберігаємо стан плеєра, якщо гідрований стан містить `null` значення
        if (state.player && action.payload.player) {
            nextState.player = {
                ...state.player,
                ...action.payload.player,
                active: action.payload.player.active !== null ? action.payload.player.active : state.player.active,
                currentTime: action.payload.player.currentTime !== 0 ? action.payload.player.currentTime : state.player.currentTime,
                duration: action.payload.player.duration !== 0 ? action.payload.player.duration : state.player.duration,
                volume: action.payload.player.volume !== 50 ? action.payload.player.volume : state.player.volume,
                pause: action.payload.player.pause !== true ? action.payload.player.pause : state.player.pause,
            
            };
        }

        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export type RootState = ReturnType<typeof rootReducer>;
