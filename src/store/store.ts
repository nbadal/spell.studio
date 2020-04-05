import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {spellsReducer} from "./spells/reducers";
import {spellsEpics} from "./spells/epics";
import {colorsReducer} from "./colors/reducers";

const rootReducer = combineReducers({
    spells: spellsReducer,
    colors: colorsReducer,
});

export function configureAppStore() {
    const rootEpic = combineEpics(
        spellsEpics,
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

