import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import cardsReducer from './cards';
import spellsReducer from './spells';
import colorsReducer from './colors';
import layoutReducer from './layout';

const rootReducer = combineReducers({
    cards: cardsReducer,
    spells: spellsReducer,
    colors: colorsReducer,
    layout: layoutReducer,
});

export function configureAppStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: [...getDefaultMiddleware()],
    });
}

export type RootState = ReturnType<typeof rootReducer>;
