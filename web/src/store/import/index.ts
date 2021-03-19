import { createSlice } from '@reduxjs/toolkit';
import { ImportState } from './types';
import { getSpellCard } from '../spells/convert';
import { allSpells } from '../../data/SpellRepo';
import { importCards } from './actions';
import { closeModals } from '../modals/actions';

const initialImportState: ImportState = {
    importedCards: [],
};

const importSlice = createSlice({
    name: 'modals',
    initialState: initialImportState,
    reducers: {
        resetImport: () => initialImportState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(importCards, (state, action) => {
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

export const { resetImport } = importSlice.actions;

export default importSlice.reducer;
