import { createSelector } from '@reduxjs/toolkit';
import { ImportJsonType } from './types';
import { RootState } from '../index';
import { RpgCard, validateRpgCard, validateRpgCardList } from './schema';
import { Card, CardDetail, CardStat } from '../cards/types';

const selectImportJson = (state: RootState) => state.imports.json;

export const selectParsedJsonCards = createSelector(
    [selectImportJson],
    (jsonString: string): [ImportJsonType, Card[]] => {
        try {
            const json = JSON.parse(jsonString);
            if (validateRpgCardList(json)) {
                return ['rpg-cardlist', convertRpgCards(json)];
            }
            if (validateRpgCard(json)) {
                return ['rpg-card', convertRpgCards([json])];
            }
        } catch (e) {
            return ['invalid-json', []];
        }
        return [undefined, []];
    },
);

const convertRpgCards = (rpgCards: RpgCard[]): Card[] => rpgCards.map((rpgCard) => {
    const subtitle = '';
    const category = '';
    const stats: CardStat[] = [];
    const details: CardDetail[] = [];

    // We can throw an exception from here if the card is invalid to prevent conversion.

    return {
        title: rpgCard.title,
        color: rpgCard.color,
        backCharacter: rpgCard.title.substring(0, 1),
        category,
        stats,
        subtitle,
        details,
        // TODO: how to support these?
        backIconsSmall: '',
        backIconsLarge: '',
        uid: Math.random().toString(36),
        icon: 'bard',
    };
});
