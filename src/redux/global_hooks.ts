import { useSelector } from "react-redux";
import { IGlobalState } from "./global";
import { RootStateType } from "./reducer";

export const useGlobalHooks = (): IGlobalState => {
    return useSelector(({ global }: RootStateType) => global);
};
