import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardColor, ColorMode, ColorsState } from './types';
import { SpellClass, SpellSchool } from '../spells/types';

const initialColorsState: ColorsState = {
    colorMode: ColorMode.BY_CLASS,
    byClass: {
        bard: '#802363',
        cleric: '#CD9D15',
        druid: '#639D48',
        paladin: '#37A0C2',
        ranger: '#665436',
        // From D&D Beyond themes:
        sorcerer: '#992E2E',
        warlock: '#7B469B',
        wizard: '#2A50A1',
    },
    bySchool: {
        abjuration: '#888888',
        conjuration: '#2A50A1',
        divination: '#6a499b',
        enchantment: '#507F62',
        evocation: '#992E2E',
        illusion: '#ac54a4',
        necromancy: '#222222',
        transmutation: '#B59E54',
    },
};

const colorsSlice = createSlice({
    name: 'colors',
    initialState: initialColorsState,
    reducers: {
        changeColorMode: (state, action: PayloadAction<ColorMode>) => {
            state.colorMode = action.payload;
        },
        changeClassColor: (
            state,
            action: PayloadAction<{ color: CardColor; spellClass: SpellClass }>,
        ) => {
            state.byClass[action.payload.spellClass] = action.payload.color;
        },
        changeSchoolColor: (
            state,
            action: PayloadAction<{ color: CardColor; spellSchool: SpellSchool }>,
        ) => {
            state.bySchool[action.payload.spellSchool] = action.payload.color;
        },
        setDefaultColors: () => initialColorsState,
    },
});

export const {
    changeColorMode, changeClassColor, changeSchoolColor, setDefaultColors,
} = colorsSlice.actions;

export default colorsSlice.reducer;
