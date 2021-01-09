import CoreAction from "./core_action";
import Image, { IImage } from "../models/image";

export interface IImageState {
    error: any;
    loading: boolean;
}

const initialState: IImageState = {
    error: null,
    loading: false
};

export const IMAGE_SET_LOADING = "@@images/SET_LOADING";
export const IMAGE_SET_ERROR = "@@images/SET_ERROR";

export default (state = initialState, action: any): IImageState => {
    switch (action.type) {
        case IMAGE_SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case IMAGE_SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};

class ImageActionsCreator extends CoreAction<typeof Image, IImage> {
    constructor() {
        super({
            model: Image,
            errorAction: IMAGE_SET_ERROR,
            loadingAction: IMAGE_SET_LOADING
        });
    }
}

export const ImageActions = new ImageActionsCreator();
