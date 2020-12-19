import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// @ts-ignore
import reduxLogger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./reducer";

const persistConfig = {
    key: "fast-react-boilerplate",
    storage,
    whitelist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
    middlewares.push(reduxLogger);
}

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(...middlewares));
    // @ts-ignore
    const persistor = persistStore(store);
    return { store, persistor };
};
