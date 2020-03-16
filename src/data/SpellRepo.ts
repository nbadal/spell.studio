import rawSpells from "./srd/srd-spells.json";
import {Spell, SpellFilter} from "../store/spells/types";

const allSpells = rawSpells as Spell[];

export class SpellRepo {
    static filteredSpells(filter: SpellFilter): Spell[] {
        return allSpells.filter(s => {
            let levelInRange =
                s.level >= filter.levelMin &&
                s.level <= filter.levelMax;

            let anyClassesMatch =
                !filter.classes ||
                filter.classes.length === 0 ||
                filter.classes.some(s.classes.includes);

            return levelInRange && anyClassesMatch;
        })
    }
}
