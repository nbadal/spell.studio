import {SpellFilter, SpellsState} from "./types";
import {createReducer} from "@reduxjs/toolkit";
import {filterSpells, selectSpell, spellsFiltered, unselectSpell} from "./actions";
import {SpellRepo} from "../../data/SpellRepo";

let initialFilter: SpellFilter = {
    levelMin: 0,
    levelMax: 9,
    classes: [],
};

const initialState: SpellsState = {
    filtered: SpellRepo.filteredSpells(initialFilter),
    selected: [],
    filter: initialFilter
};

export const spellsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(filterSpells, (state, action) => {
            state.filter = action.payload;
        })
        .addCase(spellsFiltered, (state, action) => {
            state.filtered = action.payload;
            state.selected = [];
        })
        .addCase(selectSpell, (state, action) => {
            state.selected = [action.payload, ...state.selected];
        })
        .addCase(unselectSpell, (state, action) => {
            // We use `name` because the object will be proxied so === wont work.
            state.selected = state.selected.filter((spell) => spell.name !== action.payload.name);
        });
});
