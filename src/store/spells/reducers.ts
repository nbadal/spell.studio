import {SpellFilter, SpellsState} from "./types";
import {createReducer} from "@reduxjs/toolkit";
import {spellsFiltered, filterSpells} from "./actions";
import {SpellRepo} from "../../data/SpellRepo";

let initialFilter: SpellFilter = {
    levelMin: 0,
    levelMax: 9,
    classes: [],
};

const initialState: SpellsState = {
    filtered: SpellRepo.filteredSpells(initialFilter),
    filter: initialFilter
};

export const spellsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(filterSpells, (state, action) => {
            state.filter = action.payload;
        })
        .addCase(spellsFiltered, (state, action) => {
            state.filtered = action.payload;
        });
});
