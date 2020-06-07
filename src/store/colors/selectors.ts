import { RootState } from "../store";
import { Spell, SpellSchool } from "../cards/types";
import { createSelector } from "@reduxjs/toolkit";
import { ColorMode, ColorsState } from "./types";
import { selectFilteredSpellClasses } from "../cards/selectors";

const getColors = (state: RootState) => state.colors;
const getSpellSchool = (state: RootState, props: { spell: Spell }) => props.spell.school;

export const selectSpellClass = createSelector([selectFilteredSpellClasses], (classes) => {
    return classes[0];
});

export const selectSpellClassColor = createSelector(
    [selectSpellClass, getColors],
    (spellClass, colors) => {
        return colors.byClass[spellClass];
    },
);

export const selectSpellSchoolColor = createSelector(
    [getSpellSchool, getColors],
    (spellSchool: SpellSchool, colors: ColorsState) => colors.bySchool[spellSchool],
);

export const selectSpellColor = createSelector(
    [getColors, selectSpellClassColor, selectSpellSchoolColor],
    (colors, classColor, schoolColor) => {
        switch (colors.colorMode) {
            case ColorMode.BY_SCHOOL:
                return schoolColor;
            case ColorMode.BY_CLASS:
                return classColor;
        }
    },
);
