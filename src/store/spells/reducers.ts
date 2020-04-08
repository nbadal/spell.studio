import {SpellFilter, SpellsState} from "./types";
import {createReducer} from "@reduxjs/toolkit";
import {clearSelection, filterSpells, selectSpell, unselectSpell} from "./actions";
import {allSpells} from "../../data/SpellRepo";

let initialFilter: SpellFilter = {
    levelMin: 0,
    levelMax: 9,
    classes: [],
};

const initialState: SpellsState = {
    all: allSpells,
    selected: [],
    filter: initialFilter
};

export const spellsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(filterSpells, (state, action) => {
            state.filter = action.payload;
            state.selected = [];
        })
        .addCase(selectSpell, (state, action) => {
            state.selected = [action.payload, ...state.selected];
        })
        .addCase(unselectSpell, (state, action) => {
            // We use `name` because the object will be proxied so === wont work.
            state.selected = state.selected.filter((spell) => spell.name !== action.payload.name);
        })
        .addCase(clearSelection, (state) => {
            state.selected = [];
        });
});
