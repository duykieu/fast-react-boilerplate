import User, { IUser, IUserLoginSuccessPayload } from "../models/user";
import CoreAction, { ThunkDispatch } from "./core_action";
import { AppThunk, RootStateType } from "./reducer";
import { Action, ActionCreator, Reducer } from "redux";
import { ThunkAction } from "redux-thunk";

export interface IAuthState {
    token: string | null;
    currentUser: IUser | null;
    loading: boolean;
    error: any;
    params?: {};
}

const initialState: IAuthState = {
    token: null,
    currentUser: null,
    loading: false,
    error: null,
    params: {}
};

const AUTH_SET_LOADING = "AUTH_SET_LOADING";
export const AUTH_SET_USER = "AUTH_SET_USER";
export const AUTH_LOGOUT_USER = "AUTH_LOGOUT_USER";
const AUTH_SET_ERROR = "AUTH_SET_ERROR";

export default (
    state = initialState,
    action: { type: string; payload: any }
): IAuthState => {
    switch (action.type) {
        case AUTH_SET_LOADING:
            return {
                ...state,
                loading: true
            };

        case AUTH_SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case AUTH_SET_USER:
            return {
                ...state,
                ...action.payload
            };
        case AUTH_LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
};

class AuthActionCreators extends CoreAction<typeof User, IUser> {
    constructor() {
        super({
            model: User,
            loadingAction: AUTH_SET_LOADING,
            errorAction: AUTH_SET_ERROR
        });
    }

    setUser(payload) {
        return {
            type: AUTH_SET_USER,
            payload
        };
    }

    login(payload: {
        username: string;
        password: string;
    }): ThunkAction<void, RootStateType, unknown, Action<string>> {
        return this.run((dispatch: ThunkDispatch) => {
            return User.login<IUserLoginSuccessPayload>(payload).then(data => {
                dispatch(this.setUser(data));
            });
        });
    }
}

export const AuthAction = new AuthActionCreators();
