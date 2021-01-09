import { Action, AnyAction, combineReducers } from "redux";

import auth from "./auth";
import posts from "./post";
import global from "./global";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({ global, auth, posts });

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootStateType,
    unknown,
    Action<string>
>;

export type ReduxThunkDispatch = ThunkDispatch<RootStateType, void, Action>;

export type DefaultAction<T> = {
    type: string;
    payload?: T;
};

export default rootReducer;
