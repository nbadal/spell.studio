import {Spell, SpellFilter} from "../store/spells/types";
import {processBTM} from "../scripts/btm-processing";

const allSpells = processBTM();

export class SpellRepo {
    static filteredSpells(filter: SpellFilter): Spell[] {
        return allSpells.filter(s => {
            let levelInRange =
                s.level >= filter.levelMin &&
                s.level <= filter.levelMax;

            let anyClassesMatch =
                !filter.classes ||
                filter.classes.length === 0 ||
                filter.classes.some(fClass => s.classes.includes(fClass));

            return levelInRange && anyClassesMatch;
        })
    }
}
