import {ColorMode, ColorsState} from "./types";
import {createReducer} from "@reduxjs/toolkit";
import {changeClassColor, changeColorMode, changeSchoolColor} from "./actions";

const initialState: ColorsState = {
    colorMode: ColorMode.BY_CLASS,
    byClass: {
        bard: "#802363",
        cleric: "#CD9D15",
        druid: "#639D48",
        paladin: "#37A0C2",
        ranger: "#665436",
        // From D&D Beyond themes:
        sorcerer: "#992E2E",
        warlock: "#7B469B",
        wizard: "#2A50A1",
    },
    bySchool: {
        abjuration: "#888888",
        conjuration: "#2A50A1",
        divination: "#6a499b",
        enchantment: "#507F62",
        evocation: "#992E2E",
        illusion: "#ac54a4",
        necromancy: "#222222",
        transmutation: "#B59E54",
    },
};

export const colorsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeColorMode, (state, action) => {
            state.colorMode = action.payload;
        })
        .addCase(changeClassColor, (state, action) => {
            state.byClass[action.payload.forCategory] = action.payload.color;
        })
        .addCase(changeSchoolColor, (state, action) => {
            state.bySchool[action.payload.forCategory] = action.payload.color;
        });
});
