import { Spell, SpellFilter, SpellsState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allSpells } from "../../data/SpellRepo";

let initialFilter: SpellFilter = {
    levelMin: 0,
    levelMax: 9,
    classes: [],
};

const initialSpellsState: SpellsState = {
    all: allSpells,
    selected: [],
    filter: initialFilter,
};

const spellsSlice = createSlice({
    name: "spells",
    initialState: initialSpellsState,
    reducers: {
        filterSpells: (state, action) => {
            state.filter = action.payload;
            state.selected = [];
        },
        selectSpell: (state, action: PayloadAction<Spell>) => {
            state.selected = [action.payload, ...state.selected];
        },
        unselectSpell: (state, action: PayloadAction<Spell>) => {
            // We use `name` because the object will be proxied so === wont work.
            state.selected = state.selected.filter((spell) => spell.name !== action.payload.name);
        },
        clearSelection: (state) => {
            state.selected = [];
        },
    },
});

export const { filterSpells, selectSpell, unselectSpell, clearSelection } = spellsSlice.actions;

export default spellsSlice.reducer;
