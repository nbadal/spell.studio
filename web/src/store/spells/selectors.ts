import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Spell, SpellClass, SpellFilter } from './types';
import { Card, CardDetail } from '../cards/types';
import { CardColor, ColorMode } from '../colors/types';
import ClassIcons from '../../data/class-icons.json';

// This is required to dynamically access the JSON keys. Import requires 'default' usage.
// eslint-disable-next-line global-require
const IconFont = require('../../gen/font/icons.json') as {[iconName: string]: string};

const selectAllSpells = (state: RootState) => state.spells.all;
const selectFilter = (state: RootState) => state.spells.filter;

const getSpellClasses = (state: RootState, props: { spell: Spell }) => props.spell.classes;
const getColors = (state: RootState) => state.colors;

export const selectFilteredSpells = createSelector(
    [selectAllSpells, selectFilter],
    (spells, filter) => spells.filter((s) => {
        const levelInRange = s.level >= filter.levelMin && s.level <= filter.levelMax;

        const anyClassesMatch = !filter.classes
                || filter.classes.length === 0
                || filter.classes.some((fClass) => s.classes.includes(fClass));

        return levelInRange && anyClassesMatch;
    }),
);

function filterSpellClasses(filter: SpellFilter, spellClasses: SpellClass[]) {
    if (filter.classes.length === 0) return spellClasses;
    return spellClasses.filter((sc) => filter.classes.includes(sc));
}

export const selectFilteredSpellClasses = createSelector(
    [selectFilter, getSpellClasses],
    filterSpellClasses,
);

export const selectSpellClass = createSelector(
    [selectFilteredSpellClasses],
    (classes) => classes[0],
);

export const selectFilteredSpellCards = createSelector(
    [selectFilteredSpells, selectFilter, getColors],
    (spells, filter, colors) => spells.flatMap((spell) => {
        const spellClasses = filterSpellClasses(filter, spell.classes);
        // Return one card for each spell class
        return spellClasses.map((spellClass) => {
            switch (colors.colorMode) {
                case ColorMode.BY_SCHOOL:
                    return getSpellCard(spell, spellClass, colors.bySchool[spell.school]);
                case ColorMode.BY_CLASS:
                default:
                    return getSpellCard(spell, spellClass, colors.byClass[spellClass]);
            }
        });
    }),
);

function getSpellCard(spell: Spell, spellClass: SpellClass, spellColor: CardColor): Card {
    return {
        uid: `${spellClass}/${spell.name}`,
        title: spell.name,
        subtitle: spellSubtitle(spell),
        stats: [
            {
                name: 'Casting Time',
                value: spell.castingTime,
            },
            {
                name: 'Range',
                value: spell.range,
            },
            {
                name: 'Components',
                value: spellComponentsString(spell),
            },
            {
                name: 'Duration',
                value: spell.duration,
                icon: spell.concentration,
            },
        ],
        details: Array.from(spellDetails(spell)),
        category: spellClass.substring(0, 1).toUpperCase() + spellClass.substring(1),
        backCharacter: spell.level,
        icon: spellClass,
        backIconsSmall: getSmallChar(spellClass),
        backIconsLarge: getLargeChar(spellClass),
        color: spellColor,
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

function getSmallChar(spellClass: SpellClass): string {
    return ClassIcons.small[spellClass]
        .map((iconName) => IconFont[iconName] || '')
        .join();
}

function getLargeChar(spellClass: SpellClass): string {
    return ClassIcons.large[spellClass]
        .map((iconName) => IconFont[iconName] || '')
        .join();
}
