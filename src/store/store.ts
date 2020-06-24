import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
    FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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
    const persistedReducer = persistReducer(
        {
            key: 'root',
            storage,
        },
        rootReducer,
    );

    const store = configureStore({
        reducer: persistedReducer,
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        // Ignore redux-persist actions:
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
        ],
    });

    const persistor = persistStore(store);

    return { store, persistor };
}

export type RootState = ReturnType<typeof rootReducer>;
