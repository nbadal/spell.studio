import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import {
    FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import cardsReducer from './cards';
import spellsReducer from './spells';
import colorsReducer from './colors';
import layoutReducer from './layout';
import modalReducer from './modals';
import importsReducer from './import';
import templateReducer from './template';

const rootReducer = combineReducers({
    cards: cardsReducer,
    spells: persistReducer({ key: 'spells', storage, blacklist: ['all'] }, spellsReducer),
    colors: colorsReducer,
    layout: layoutReducer,
    modals: modalReducer,
    imports: importsReducer,
    template: templateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function configureAppStore(preloadedState?: PreloadedState<RootState>) {
    const persistedReducer = persistReducer<RootState>(
        {
            key: 'root',
            stateReconciler: autoMergeLevel2,
            blacklist: ['spells'],
            storage,
        },
        rootReducer,
    );

    const store = configureStore({
        preloadedState,
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    });

    const persistor = persistStore(store);

    return { store, persistor };
}
