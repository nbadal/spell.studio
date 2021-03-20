import { Card } from '../cards/types';

export type ImportState = {
    importedCards: Card[],
    json: string,
};

export type ImportJsonType = 'rpg-cards' | 'invalid-json' | undefined;
