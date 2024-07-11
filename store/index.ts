

// create a makeStore function
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { AnyAction, applyMiddleware, createStore } from "redux";
import { reducer, RootState } from "./reducers";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import { composeWithDevTools } from 'redux-devtools-extension'


// const makeStore: MakeStore<RootState>= (context: Context) => createStore(
//         reducer,
//         composeWithDevTools(
//             applyMiddleware(thunk)
//         ),
//         // applyMiddleware(thunk)
//     );

const makeStore = () => {
    // const middlewares = [thunkMiddleware]; // Додаємо middleware (якщо потрібно)

    const store = createStore(
        reducer,
        composeWithDevTools(applyMiddleware(thunk))
    );

    return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>
