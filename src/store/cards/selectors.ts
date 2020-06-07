import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Spell } from "./types";

const selectAllCards = (state: RootState) => state.cards.all;
const selectFilter = (state: RootState) => state.cards.filter;

const getSpellClasses = (state: RootState, props: { spell: Spell }) => props.spell.classes;

export const selectFilteredCards = createSelector(
    [selectAllCards, selectFilter],
    (spells, filter) => {
        return spells.filter((s) => {
            let levelInRange = s.level >= filter.levelMin && s.level <= filter.levelMax;

            let anyClassesMatch =
                !filter.classes ||
                filter.classes.length === 0 ||
                filter.classes.some((fClass) => s.classes.includes(fClass));

            return levelInRange && anyClassesMatch;
        });
    },
);

export const selectCardCount = createSelector([selectFilteredCards], (spells) => spells.length);

export const selectCardAtIdx = (idx: number) => createSelector(
    [selectFilteredCards],
    (spells) => {
        return spells[idx];
    },
);

export const selectFilteredSpellClasses = createSelector(
    [selectFilter, getSpellClasses],
    (filter, spellClasses) => {
        if (filter.classes.length === 0) return spellClasses;
        return spellClasses.filter((sc) => filter.classes.includes(sc));
    },
);
