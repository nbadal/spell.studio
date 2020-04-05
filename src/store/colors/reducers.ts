import {ColorMode, ColorsState} from "./types";
import {createReducer} from "@reduxjs/toolkit";
import {changeClassColor, changeColorMode, changeSchoolColor} from "./actions";

const initialState: ColorsState = {
    colorMode: ColorMode.BY_SCHOOL,
    byClass: {
        // From D&D Beyond themes:
        bard: "#AB6DAC",
        cleric: "#91A1B2",
        druid: "#7A853B",
        paladin: "#B59E54",
        ranger: "#507F62",
        sorcerer: "#992E2E",
        warlock: "#7B469B",
        wizard: "#2A50A1",
    },
    bySchool: {
        abjuration: "#888888",
        conjuration: "#2A50A1",
        divination: "#7B469B",
        enchantment: "#507F62",
        evocation: "#992E2E",
        illusion: "#AB6DAC",
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
