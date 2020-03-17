export type SpellDetail = string | any;

export type SpellSchool =
    "conjuration"
    | "abjuration"
    | "divination"
    | "enchantment"
    | "evocation"
    | "illusion"
    | "necromancy"
    | "transmutation";

export type SpellClass =
    "bard"
    | "cleric"
    | "druid"
    | "fighter"
    | "ranger"
    | "sorcerer"
    | "warlock"
    | "wizard";

export type SpellsState = {
    filtered: Spell[];
    filter: SpellFilter;
}

export type Spell = {
    name: string;
    classes: SpellClass[];
    level: number;
    school: SpellSchool;
    ritual: boolean;
    castingTime: string;
    range: string;
    duration: string;
    components: {
        verbal: boolean;
        somatic: boolean;
        material: boolean;
        materialInfo?: string;
    }
    details: SpellDetail[];
    higherLevels?: string;
}

export type SpellFilter = {
    classes: SpellClass[];
    levelMin: number;
    levelMax: number;
}
