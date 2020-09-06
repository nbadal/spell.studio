import { processBTM } from '../scripts/btm-processing';
import { Spell } from '../store/spells/types';

function truncateCards(spell: Spell) {
    switch (spell.name.toLowerCase()) {
        case 'alter self':
            truncateCard(spell, [0]);
            break;
        case 'animal messenger':
            truncateCard(spell, [0]);
            break;
        case 'conjure woodland beings':
            truncateCard(spell, [0, 3]);
            break;
        case 'speak with plants':
            truncateCard(spell, [0, 1, 2]);
            break;
        // no default
    }
    return spell;
}

function truncateCard(spell: Spell, details: number[], pageNum?: number) {
    spell.details = spell.details.filter((_, index) => details.includes(index));

    if (pageNum !== undefined) {
        spell.details.push(`(see page ${pageNum})`);
    }
}

export const allSpells = processBTM().map(truncateCards);
