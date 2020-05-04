import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import spellsReducer from "./spells";
import colorsReducer from "./colors";

const rootReducer = combineReducers({
    spells: spellsReducer,
    colors: colorsReducer,
});

export function configureAppStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: [...getDefaultMiddleware()],
    });
}

export type RootState = ReturnType<typeof rootReducer>;

