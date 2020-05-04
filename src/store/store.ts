import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import spellsReducer from "./spells";
import colorsReducer from "./colors";

const rootReducer = combineReducers({
    spells: spellsReducer,
    colors: colorsReducer,
});

export function configureAppStore() {
    const rootEpic = combineEpics(
    );
    const epicMiddleware = createEpicMiddleware();

    const store = configureStore({
        reducer: rootReducer,
        middleware: [epicMiddleware, ...getDefaultMiddleware()],
    });

    epicMiddleware.run(rootEpic);

    return store;
}

export type RootState = ReturnType<typeof rootReducer>;

