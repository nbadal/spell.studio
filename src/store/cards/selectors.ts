import { createSelector } from "@reduxjs/toolkit";
import { selectFilteredSpellCards } from "../spells/selectors";

export const selectFilteredCards = createSelector([selectFilteredSpellCards], (spellCards) => {
    return spellCards;
});

export const selectCardCount = createSelector([selectFilteredCards], (cards) => cards.length);

export const selectCardAtIdx = (idx: number) =>
    createSelector([selectFilteredCards], (cards) => {
        return cards[idx];
    });
