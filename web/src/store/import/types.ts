import { Card } from '../cards/types';

export type ImportState = {
    importedCards: Card[],
    json: string,
};

export type ImportJsonType = 'rpg-card' | 'rpg-cardlist' | 'invalid-json' | undefined;
