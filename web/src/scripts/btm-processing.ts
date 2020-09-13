/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-non-null-assertion */
import { Spell, SpellClass, SpellSchool } from '../store/spells/types';

const btm1 = require('../data/raw/BTMorton/raw-BTMorton.json');
const rawSpells = btm1.Spellcasting['Spell Descriptions'];
const rawLists = btm1.Spellcasting['Spell Lists'];

export function processBTM(): Spell[] {
    const spellSets: { [klass: string]: string[] } = {
        bard: flattenSpellList(rawLists['Bard Spells']),
        cleric: flattenSpellList(rawLists['Cleric Spells']),
        druid: flattenSpellList(rawLists['Druid Spells']),
        paladin: flattenSpellList(rawLists['Paladin Spells']),
        ranger: flattenSpellList(rawLists['Ranger Spells']),
        sorcerer: flattenSpellList(rawLists['Sorcerer Spells']),
        warlock: flattenSpellList(rawLists['Warlock Spells']),
        wizard: flattenSpellList(rawLists['Wizard Spells']),
    };

    const newSpells: Spell[] = [];

    Object.keys(rawSpells).forEach((name) => {
        const spellContent = (rawSpells as any)[name].content as any[];

        const typeStr: string = spellContent[0] || '';
        const typeInfo = typeStr.match(
            /\*(?:(.)..-level )?\s*(conjuration|enchantment|illusion|evocation|abjuration|transmutation|divination|necromancy)\s*(?:cantrip)?\s*(\(ritual\))?\*/i,
        );
        spellContent.splice(0, 1); // Remove type item.

        const componentsStr = popSection('**Components:** ', spellContent) || '';
        const componentInfo = componentsStr.match(
            /(V)?(?:, )?(S)?(?:, )?(M)?(?: )?(?:\(([^)]+)\))?/,
        );
        if (!componentInfo || !typeInfo) {
            console.error(`No match for ${name}`);
            return;
        }

        const classes: SpellClass[] = Object.keys(spellSets)
            .filter((klass) => spellSets[klass].includes(name))
            .map((klass) => klass as SpellClass);

        const castingTime = popSection('**Casting Time:** ', spellContent);
        const range = popSection('**Range:** ', spellContent);
        const durationRaw = popSection('**Duration:** ', spellContent);
        const concentration = durationRaw?.startsWith('Concentration, ') || false;
        const duration = durationRaw?.replace('Concentration, u', 'U');
        const higherLevels = popSection('***At Higher Levels.*** ', spellContent);

        // console.log(spellContent);

        const newSpell: Spell = {
            name,
            classes,
            level: Number.parseInt(typeInfo[1] || '0', 10),
            school: typeInfo[2].toLowerCase() as SpellSchool,
            ritual: !!typeInfo[3],
            castingTime: castingTime!,
            range: range!,
            duration: duration!,
            concentration,
            components: {
                verbal: !!componentInfo[1],
                somatic: !!componentInfo[2],
                material: !!componentInfo[3],
                materialInfo: componentInfo[4],
            },
            details: spellContent,
            higherLevels,
        };
        newSpells.push(newSpell);
    });
    return newSpells;
}

/** Return a list of spells, originally split by level grouping */
function flattenSpellList(spellsByLevel: { [level: string]: string[] }): string[] {
    return Object.keys(spellsByLevel)
        .flatMap((level) => spellsByLevel[level]);
}

/** Return the first matching item without the given prefix, removing it from the provided array. */
function popSection(prefix: string, content: any[]): string | undefined {
    for (let i = 0; i < content.length; i += 1) {
        const item = content[i];
        if (typeof item === 'string' && item.startsWith(prefix)) {
            content = content.splice(i, 1);
            return item.substring(prefix.length);
        }
    }
    return undefined;
}
