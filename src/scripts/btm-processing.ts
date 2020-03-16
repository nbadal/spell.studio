import btm1 from "../data/srd/raw-BTMorton.json";

const rawSpells = btm1["Spellcasting"]["Spell Descriptions"];
const rawLists = btm1["Spellcasting"]["Spell Lists"];

export function processBTM() {
    const spellSets: { [klass: string]: string[] } = {
        "bard": flattenSpellList(rawLists["Bard Spells"]),
        "cleric": flattenSpellList(rawLists["Cleric Spells"]),
        "druid": flattenSpellList(rawLists["Druid Spells"]),
        "paladin": flattenSpellList(rawLists["Paladin Spells"]),
        "ranger": flattenSpellList(rawLists["Ranger Spells"]),
        "sorcerer": flattenSpellList(rawLists["Sorcerer Spells"]),
        "warlock": flattenSpellList(rawLists["Warlock Spells"]),
        "wizard": flattenSpellList(rawLists["Wizard Spells"]),
    };

    const newSpells = [];

    for (let name in rawSpells) {
        const spellContent = (rawSpells as any)[name].content as any[];

        const typeStr: string = (spellContent[0] || "");
        const typeInfo = typeStr.match(/\*(?:(.)..-level )?\s*(conjuration|enchantment|illusion|evocation|abjuration|transmutation|divination|necromancy)\s*(?:cantrip)?\s*(\(ritual\))?\*/i);
        spellContent.splice(0, 1); // Remove type item.

        const componentsStr = popSection("**Components:** ", spellContent) || "";
        const componentInfo = componentsStr.match(/(V)?(?:, )?(S)?(?:, )?(M)?(?: )?(?:\(([^)]+)\))?/);
        if (!componentInfo || !typeInfo) {
            console.error("No match for " + name);
            continue;
        }

        let classes = [];
        for (let klass in spellSets) {
            if (spellSets[klass].includes(name)) {
                classes.push(klass);
            }
        }

        const castingTime = popSection("**Casting Time:** ", spellContent);
        const range = popSection("**Range:** ", spellContent);
        const duration = popSection("**Duration:** ", spellContent);
        let higherLevels = popSection("***At Higher Levels.*** ", spellContent);

        // console.log(spellContent);

        const newSpell = {
            name: name,
            classes: classes,
            level: Number.parseInt(typeInfo[1] || "0"),
            school: typeInfo[2].toLowerCase(),
            ritual: !!typeInfo[3],
            castingTime: castingTime,
            range: range,
            duration: duration,
            components: {
                verbal: !!componentInfo[1],
                somatic: !!componentInfo[2],
                material: !!componentInfo[3],
                materialInfo: componentInfo[4],
            },
            details: spellContent,
            higherLevels: higherLevels,
        };
        newSpells.push(newSpell);
    }
    console.log(JSON.stringify(newSpells));
}

/** Return a list of spells, originally split by level grouping */
function flattenSpellList(spellsByLevel: { [level: string]: string[] }) {
    let spells = [];
    for (let level in spellsByLevel) {
        spells.push(...spellsByLevel[level]);
    }
    return spells;
}

/** Return the first matching item without the given prefix, removing it from the provided array. */
function popSection(prefix: string, content: any[]): string | undefined {
    for (let i = 0; i < content.length; i++) {
        const item = content[i];
        if (typeof item === "string" && item.startsWith(prefix)) {
            content = content.splice(i, 1);
            return item.substring(prefix.length);
        }
    }
    return undefined;
}
