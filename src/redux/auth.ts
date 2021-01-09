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

const AUTH_REQUESTED = "AUTH_REQUESTED";
const AUTH_REQUEST_SUCCESS = "AUTH_REQUEST_SUCCESS";
const AUTH_REQUEST_FAILED = "AUTH_REQUEST_FAILED";
export const AUTH_LOGOUT_USER = "AUTH_LOGOUT_USER";
const AUTH_SET_ERROR = "AUTH_SET_ERROR";

export default (
    state = initialState,
    action: { type: string; payload: any }
): IAuthState => {
    switch (action.type) {
        case AUTH_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case AUTH_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.payload
            };
        case AUTH_REQUEST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case AUTH_SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case AUTH_LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
};

class AuthActionCreators extends CoreAction<typeof User> {
    constructor() {
        super({
            model: User,
            requestedAction: AUTH_REQUESTED,
            successAction: AUTH_REQUEST_SUCCESS,
            failedAction: AUTH_REQUEST_FAILED,
            errorAction: AUTH_SET_ERROR
        });
    }

    login(payload: {
        username: string;
        password: string;
    }): ThunkAction<void, RootStateType, unknown, Action<string>> {
        return (dispatch: ThunkDispatch) => {
            return User.login<IUserLoginSuccessPayload>(payload)
                .then(data => {
                    dispatch(
                        this.requestSuccess<IUserLoginSuccessPayload>(data)
                    );
                })
                .catch(e => {
                    dispatch(this.setError(e));
                });
        };
    }
}

export const AuthAction = new AuthActionCreators();
