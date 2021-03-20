import { ImportJsonType } from './types';
import { RootState } from '../index';
import { validateRpgCard, validateRpgCardList } from './schema';

export const selectImportJsonType = (state: RootState): ImportJsonType => {
    try {
        const json = JSON.parse(state.imports.json);
        if (validateRpgCard(json) || validateRpgCardList(json)) {
            // TODO: attempt to parse to a spell.studio card before validating?
            return 'rpg-cards';
        }
    } catch (e) {
        return 'invalid-json';
    }
    return undefined;
};
