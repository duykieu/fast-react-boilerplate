import Post, { IPost } from "../models/post";
import { DefaultAction } from "./reducer";
import CoreAction from "./core_action";

export interface IPostsState {
    posts: IPost[];
    loading: boolean;
    error: any;
}

const initialState: IPostsState = {
    posts: [],
    loading: false,
    error: null
};

const POSTS_REQUESTED = "POST_REQUESTED";
const POSTS_REQUEST_SUCCESS = "POST_REQUEST_SUCCESS";
const POSTS_REQUEST_FAILED = "POST_REQUEST_FAILED";
const POSTS_SET_ERROR = "POST_SET_ERROR";

export default (state = initialState, action: DefaultAction<any>) => {
    switch (action.type) {
        case POSTS_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case POSTS_REQUEST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        case POSTS_REQUEST_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case POSTS_SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

class PostActionCreators extends CoreAction<typeof Post> {
    constructor() {
        super({
            model: Post,
            requestedAction: POSTS_REQUESTED,
            failedAction: POSTS_REQUEST_FAILED,
            successAction: POSTS_REQUEST_SUCCESS,
            errorAction: POSTS_SET_ERROR
        });
    }
}

export const PostAction = new PostActionCreators();
