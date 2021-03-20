import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImportState } from './types';
import { getSpellCard } from '../spells/convert';
import { allSpells } from '../../data/SpellRepo';
import { setImportedCards } from './actions';
import { closeModals } from '../modals/actions';

const initialImportState: ImportState = {
    importedCards: [],
    json: '',
};

const importSlice = createSlice({
    name: 'modals',
    initialState: initialImportState,
    reducers: {
        importJsonChanged: (state, action: PayloadAction<string>) => {
            state.json = action.payload;
        },
        resetImport: () => initialImportState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(setImportedCards, (state, action) => {
                state.importedCards = action.payload;
            })
            .addCase(closeModals, () => initialImportState);
    },
});

export const allSRDSpells = allSpells
    .map((spell) => spell.classes.map((klass) => getSpellCard(spell, klass, '#000')))
    .reduce((previousValue, currentValue) => {
        previousValue.push(...currentValue);
        return previousValue;
    }, []);

export const { importJsonChanged, resetImport } = importSlice.actions;

export default importSlice.reducer;
