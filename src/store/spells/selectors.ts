import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Spell} from "./types";

const selectAllSpells = (state: RootState) => state.spells.all;
const selectFilter = (state: RootState) => state.spells.filter;

const getSpellClasses = (state: RootState, props: { spell: Spell }) => props.spell.classes;

export const selectFilteredSpells = createSelector(
    [selectAllSpells, selectFilter],
    (spells, filter) => {
        return spells.filter(s => {
            let levelInRange =
                s.level >= filter.levelMin &&
                s.level <= filter.levelMax;

            let anyClassesMatch =
                !filter.classes ||
                filter.classes.length === 0 ||
                filter.classes.some(fClass => s.classes.includes(fClass));

            return levelInRange && anyClassesMatch;
        });
    }
);

export const selectSpellCount = createSelector(
    [selectFilteredSpells],
    spells => spells.length
);

export const selectFilteredSpellClasses = createSelector(
    [selectFilter, getSpellClasses],
    (filter, spellClasses) => {
        if (filter.classes.length === 0) return spellClasses;
        return spellClasses.filter(sc => filter.classes.includes(sc));
    }
);
