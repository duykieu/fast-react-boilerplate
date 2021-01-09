// @ts-ignore
import Model from "../models/core";
import {
    AppThunk,
    DefaultAction,
    RootStateType,
    ReduxThunkDispatch
} from "./reducer";
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
    fetchCallback?: any;
    errorAction: string;
    loadingAction: string;
}

export interface IFetchResultWithPaginate<T> {
    results: T[];
    count: number;
}

export default class CoreAction<M extends typeof Model, T> {
    errorAction: string;

    loadingAction: string;

    fetchCallback: any;

    model: M;

    constructor({
        model,
        fetchCallback,
        errorAction,
        loadingAction
    }: IActionInitialValue<M>) {
        this.errorAction = errorAction;
        this.loadingAction = loadingAction;
        this.model = model;
        this.fetchCallback = fetchCallback;
    }

    run<T>(fn): (dispatch, getState?) => Promise<T> {
        return (dispatch): Promise<T> => {
            dispatch(this.setLoading(true));

            return fn(dispatch)
                .catch(e => {
                    dispatch(this.setError(e));
                })
                .finally(() => {
                    dispatch(this.setLoading(false));
                });
        };
    }

    setLoading(payload: boolean) {
        return {
            type: this.loadingAction,
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

    fetch(params?: any) {
        return this.run(dispatch => {
            return this.model.find(params).then(data => {
                if (this.fetchCallback) this.fetchCallback(dispatch, data);
            });
        });
    }

    create(payload): AppThunk<Promise<T | void>> {
        return this.run((dispatch: ReduxThunkDispatch) => {
            return this.model.create<T, any>(payload).then(data => {
                // @ts-ignore
                dispatch(this.fetch());
                return data;
            });
        });
    }

    update(id: string, payload: T): AppThunk<Promise<T | void>> {
        return this.run((dispatch: ReduxThunkDispatch) => {
            return this.model.update<T, T>(id, payload).then(data => {
                // @ts-ignore
                dispatch(this.fetch());
                return data;
            });
        });
    }

    destroy(id: string | undefined): AppThunk {
        return this.run((dispatch: ReduxThunkDispatch) => {
            return this.model.destroy(id).then(() => {
                // @ts-ignore
                dispatch(this.fetch());
            });
        });
    }
}
