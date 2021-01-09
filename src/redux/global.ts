export interface IGlobalState {
    loading: boolean;
    error: string[];
    showSidebar: boolean;
}

const initialState: IGlobalState = {
    loading: false,
    error: [],
    showSidebar: true
};

export const GLOBAL_TOGGLE_SIDEBAR = "@@global/TOGGLE_SIDEBAR";

const global = (state = initialState, action: any): IGlobalState => {
    switch (action.type) {
        case GLOBAL_TOGGLE_SIDEBAR:
            const { showSidebar } = state;
            return {
                ...state,
                showSidebar: !showSidebar
            };
        default:
            return state;
    }
};

export default global;
