import { createSelector } from '@reduxjs/toolkit';
import { selectFilteredSpellCards } from '../spells/selectors';

export const selectFilteredCards = createSelector([selectFilteredSpellCards], (spellCards) => {
    // Return all cards.
    const cards = [];
    cards.push(...spellCards);
    return cards;
});

export const selectCardCount = createSelector([selectFilteredCards], (cards) => cards.length);

export const selectCardAtIdx = (idx: number) =>
    createSelector([selectFilteredCards], (cards) => cards[idx]);
