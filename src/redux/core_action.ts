// @ts-ignore
import Model from "../models/core";
import { DefaultAction, RootStateType } from "./reducer";
import { Simulate } from "react-dom/test-utils";
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch as LibThunkDispatch } from "redux-thunk";

export type ThunkDispatch = LibThunkDispatch<
    RootStateType,
    void,
    Action<string>
>;

interface Action<Payload> {
    type: string;
    payload?: Payload;
    error?: boolean;
}

interface IActionInitialValue<M> {
    model: M;
    requestedAction: string;
    failedAction: string;
    successAction: string;
    errorAction: string;
}

export default class CoreAction<M extends typeof Model> {
    public Model: M;

    requestedAction: string;

    successAction: string;

    failedAction: string;

    errorAction: string;

    constructor({
        model,
        requestedAction,
        failedAction,
        successAction,
        errorAction
    }: IActionInitialValue<M>) {
        this.Model = model;
        this.requestedAction = requestedAction;
        this.failedAction = failedAction;
        this.successAction = successAction;
        this.errorAction = errorAction;
    }

    fetchDone(payload: ResponseType) {
        return {
            type: this.successAction,
            payload
        };
    }

    requestError(payload: any): DefaultAction<any> {
        return {
            type: this.failedAction,
            payload
        };
    }

    requestSuccess<T>(payload: T): DefaultAction<any> {
        return {
            type: this.successAction,
            payload
        };
    }

    clearError(): DefaultAction<any> {
        return {
            type: this.errorAction,
            payload: null
        };
    }

    setError<T>(payload: T): DefaultAction<T> {
        return {
            type: this.errorAction,
            payload
        };
    }

    fetch<ParamType, R>(
        params: ParamType
    ): ThunkAction<void, RootStateType, unknown, Action<string>> {
        return (dispatch: ThunkDispatch) => {
            dispatch({ type: this.requestedAction });
            return this.Model.find<R>(params)
                .then((data: R) => {
                    dispatch(this.requestSuccess({ posts: data }));
                })
                .catch((error: any) => {
                    dispatch(this.requestError(error));
                });
        };
    }

    create<T, R, FetchResult>(payload: T) {
        return (dispatch: ThunkDispatch) => {
            return this.Model.create<R, T>(payload)
                .then((data: R) => {})
                .catch((error: any) => {
                    dispatch(this.requestError(error));
                });
        };
    }

    update<T, R>(id: string, payload: T) {
        return (dispatch: ThunkDispatch) => {
            return this.Model.create<R, T>(payload)
                .then((data: R) => {})
                .catch((error: any) => {
                    dispatch(this.requestError(error));
                });
        };
    }

    destroy(id: string | undefined) {
        return (dispatch: ThunkDispatch) => {
            return this.Model.destroy(id)
                .then(() => {
                    // dispatch(this.fetch());
                })
                .catch((error: any) => {
                    dispatch(this.requestError(error));
                });
        };
    }
}
