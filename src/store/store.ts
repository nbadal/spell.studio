import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {spellsReducer} from "./spells/reducers";
import {spellsEpics} from "./spells/epics";

const rootReducer = combineReducers({
    spells: spellsReducer,
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

