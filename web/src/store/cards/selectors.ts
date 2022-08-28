import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Card } from './types';

export const selectAllCards = (state: RootState) => state.cards.all;

export const selectChosenUids = (state: RootState) => state.cards.selectedUids;

export const selectedCards = createSelector(
    [selectAllCards, selectChosenUids],
    (all, uids) => uids
        .map((uid) => all.find((card) => card.uid === uid))
        .filter((card) => card !== undefined)
        .map((card) => card as Card),
);

export const notSelectedCards = createSelector(
    [selectAllCards, selectChosenUids],
    (all, uids) => all.filter((card) => !uids.some((uid) => card.uid === uid)),
);

export const selectedCardCount = createSelector([selectedCards], (cards) => cards.length);

export const selectedCardAtIdx = (idx: number) =>
    createSelector([selectedCards], (cards) => cards[idx]);
