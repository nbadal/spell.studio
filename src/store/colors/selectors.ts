import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ColorMode, ColorsState } from './types';
import { selectSpellClass } from '../spells/selectors';
import { Spell, SpellSchool } from '../spells/types';

const getColors = (state: RootState) => state.colors;

const getSpellSchool = (state: RootState, props: { spell: Spell }) => props.spell.school;

export const selectSpellClassColor = createSelector(
    [selectSpellClass, getColors],
    (spellClass, colors) => colors.byClass[spellClass],
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
            default:
                throw Error('Missing color mode case');
        }
    },
);
