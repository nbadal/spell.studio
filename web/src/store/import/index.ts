import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImportState } from './types';
import { getSpellCard } from '../spells/convert';
import { allSpells } from '../../data/SpellRepo';
import { closeModals } from '../modals/actions';
import { SpellClass } from '../spells/types';

const initialImportState: ImportState = {
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
            .addCase(closeModals, () => initialImportState);
    },
});

export const allSRDSpells = allSpells
    .map((spell) => spell.classes.map((klass) => getSpellCard(spell, klass, colorForClass(klass))))
    .reduce((previousValue, currentValue) => {
        previousValue.push(...currentValue);
        return previousValue;
    }, []);

function colorForClass(spellClass: SpellClass) {
    // TODO: remove this and use color from state instead. (see: colors/types.ts)
    switch (spellClass) {
        case 'bard': return '#802363';
        case 'cleric': return '#CD9D15';
        case 'druid': return '#639D48';
        case 'paladin': return '#37A0C2';
        case 'ranger': return '#665436';
        // From D&D Beyond themes
        case 'sorcerer': return '#992E2E';
        case 'warlock': return '#7B469B';
        case 'wizard': return '#2A50A1';
        default: return '#000';
    }
}

export const { importJsonChanged, resetImport } = importSlice.actions;

export default importSlice.reducer;
