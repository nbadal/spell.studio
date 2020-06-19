import { SpellFilter, SpellsState } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import { allSpells } from "../../data/SpellRepo";

const initialFilter: SpellFilter = {
    levelMin: 0,
    levelMax: 9,
    classes: [],
};

const initialSpellsState: SpellsState = {
    all: allSpells,
    filter: initialFilter,
};

const cardsSlice = createSlice({
    name: "spells",
    initialState: initialSpellsState,
    reducers: {
        filterSpells: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { filterSpells } = cardsSlice.actions;

export default cardsSlice.reducer;
