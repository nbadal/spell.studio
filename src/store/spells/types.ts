export type SpellDetail = string | any;

export type SpellsState = {
    filtered: Spell[];
    filter: SpellFilter;
}

export type Spell = {
    name: string;
    classes: string[];
    level: number;
    school: string;
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
    classes: string[];
    levelMin: number;
    levelMax: number;
}
