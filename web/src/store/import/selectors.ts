import { createSelector } from '@reduxjs/toolkit';
import { ImportJsonType } from './types';
import { RootState } from '../index';
import { convertRpgCards, validateRpgCard, validateRpgCardList } from './schema';
import { Card } from '../cards/types';

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
