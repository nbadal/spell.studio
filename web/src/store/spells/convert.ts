import { Spell, SpellClass } from './types';
import ClassIcons from '../../data/class-icons.json';
import { Card, CardDetail } from '../cards/types';
import { CardColor } from '../colors/types';

// This is required to dynamically access the JSON keys. Import requires 'default' usage.
// eslint-disable-next-line global-require
const IconFont = require('../../gen/font/icons.json') as {[iconName: string]: string};

export function getSpellCard(spell: Spell, spellClass: SpellClass, color: CardColor): Card {
    return {
        uid: Math.random().toString(36),
        title: spell.name,
        subtitle: spellSubtitle(spell),
        stats: {
            'Casting Time': {
                name: 'Casting Time',
                value: spell.castingTime,
            },
            Range: {
                name: 'Range',
                value: spell.range,
            },
            Components: {
                name: 'Components',
                value: spellComponentsString(spell),
            },
            Duration: {
                name: 'Duration',
                value: spell.duration,
                icon: spell.concentration,
            },
        },
        details: Array.from(spellDetails(spell)),
        category: spellClass.substring(0, 1).toUpperCase() + spellClass.substring(1),
        backCharacter: spell.level,
        icon: spellClass,
        backIconsSmall: getSmallChar(spellClass),
        backIconsLarge: getLargeChar(spellClass),
        color,
    };
}

function spellSubtitle(spell: Spell): string {
    let spellType = '';

    switch (spell.level) {
        case 1:
            spellType += '1st-level ';
            break;
        case 2:
            spellType += '2nd-level ';
            break;
        case 3:
            spellType += '3rd-level ';
            break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            spellType += `${spell.level}th-level `;
            break;
        // no default
    }

    spellType += spell.school;

    if (spell.level === 0) {
        spellType += ' cantrip';
    }
    if (spell.ritual) {
        spellType += ' (ritual)';
    }

    // Capitalize first letter.
    spellType = spellType.substring(0, 1).toUpperCase() + spellType.substring(1);

    return spellType;
}

function spellComponentsString(spell: Spell): string {
    const components: string[] = [];
    if (spell.components.verbal) components.push('V');
    if (spell.components.somatic) components.push('S');
    if (spell.components.material) components.push('M');
    return components.join(', ');
}

function* spellDetails(spell: Spell): Generator<CardDetail> {
    if (spell.components.materialInfo) {
        yield { type: 'text', text: `Material: ${spell.components.materialInfo}` };
    }

    const details: CardDetail[] = [];
    // Parse spell detail entries
    spell.details.forEach((spellDetail) => {
        if (typeof spellDetail === 'string') {
            details.push({
                type: 'text',
                text: spellDetail,
            });
        }
        if (Array.isArray(spellDetail)) {
            details.push({
                type: 'list',
                items: spellDetail,
            });
        }
        // TODO: parse more detail types.
    });

    details[details.length - 1].expand = true; // Expand last detail entry.

    yield* details;

    if (spell.higherLevels) {
        yield {
            type: 'text',
            header: 'At Higher Levels',
            text: spell.higherLevels,
        };
    }
}

export const getGameIcon = (iconName: string) => IconFont[iconName] || '';

function getSmallChar(spellClass: SpellClass): string {
    return ClassIcons.small[spellClass].map(getGameIcon).join('');
}

function getLargeChar(spellClass: SpellClass): string {
    return ClassIcons.large[spellClass].map(getGameIcon).join('');
}
