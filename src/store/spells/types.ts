export type SpellDetail = string | any;

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
