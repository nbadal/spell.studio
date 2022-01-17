import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Spell, SpellClass, SpellFilter } from './types';

const selectAllSpells = (state: RootState) => state.spells.all;
const selectFilter = (state: RootState) => state.spells.filter;

const getSpellClasses = (state: RootState, props: { spell: Spell }) => props.spell.classes;
// const getColors = (state: RootState) => state.colors;

export const selectFilteredSpells = createSelector(
    [selectAllSpells, selectFilter],
    (spells, filter) => spells.filter((s) => {
        const levelInRange = s.level >= filter.levelMin && s.level <= filter.levelMax;

        const anyClassesMatch = !filter.classes
                || filter.classes.length === 0
                || filter.classes.some((fClass) => s.classes.includes(fClass));

        return levelInRange && anyClassesMatch;
    }),
);

function filterSpellClasses(filter: SpellFilter, spellClasses: SpellClass[]) {
    if (filter.classes.length === 0) return spellClasses;
    return spellClasses.filter((sc) => filter.classes.includes(sc));
}

export const selectFilteredSpellClasses = createSelector(
    [selectFilter, getSpellClasses],
    filterSpellClasses,
);

export const selectSpellClass = createSelector(
    [selectFilteredSpellClasses],
    (classes) => classes[0],
);

// export const selectFilteredSpellCards = createSelector(
//     [selectFilteredSpells, selectFilter, getColors],
//     (spells, filter, colors) => spells.flatMap((spell) => {
//         const spellClasses = filterSpellClasses(filter, spell.classes);
//         // Return one card for each spell class
//         return spellClasses.map((spellClass) => {
//             switch (colors.colorMode) {
//                 // case ColorMode.BY_SCHOOL:
//                 //     return getSpellCard(spell, spellClass, colors.bySchool[spell.school]);
//                 // default:
//                 // case ColorMode.BY_CLASS:
//                 //     return getSpellCard(spell, spellClass, colors.byClass[spellClass]);
//             }
//         });
//     }),
// );
