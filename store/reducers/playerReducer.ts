import {PlayerAction, PlayerActionTypes, PlayerState} from "../../types/player";
import { HYDRATE } from 'next-redux-wrapper';

const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true
}


// type HydrateAction = {
//     type: typeof HYDRATE,
//     payload: {
//         player: PlayerState
//     }
// };

type HydrateAction = {
    type: typeof HYDRATE,
    payload: any // Можна уточнити тип, якщо знаєте структуру payload
};


export const playerReducer = (state = initialState, action: PlayerAction | HydrateAction): PlayerState => {
    switch (action.type) {
        case HYDRATE: {
            // Обробляйте гідрацію стану тут, якщо необхідно
            return {
                ...state,
                ...action.payload.player, // Перевірте правильність ключа з гідрованого стану
                // active: action.payload.player.active || state.active, // Зберігаємо поточний стан active, якщо він є
                active: action.payload.player.active !== null ? action.payload.player.active : state.active, // Перевірка, чи active не є null

            };
        }
        case PlayerActionTypes.PAUSE:
            return {...state, pause:true}
        case PlayerActionTypes.PLAY:
            return {...state, pause:false}
        case PlayerActionTypes.SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        case PlayerActionTypes.SET_VOLUME:
            return {...state, volume: action.payload}
        case PlayerActionTypes.SET_DURATION:
            return {...state, duration: action.payload}
        case PlayerActionTypes.SET_ACTIVE:
            return {...state, active: action.payload, duration: 0, currentTime: 0}
        default:
            return state

    }
}
