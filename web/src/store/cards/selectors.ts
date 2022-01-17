import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectFilteredCards = (state: RootState) => state.cards.all;

export const selectCardCount = createSelector([selectFilteredCards], (cards) => cards.length);

export const selectCardAtIdx = (idx: number) =>
    createSelector([selectFilteredCards], (cards) => cards[idx]);
