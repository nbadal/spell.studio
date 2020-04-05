import {SpellClass, SpellSchool} from "../spells/types";

export enum ColorMode {
    BY_CLASS,
    BY_SCHOOL,
}

export type CardColor = string

export type ColorsState = {
    colorMode: ColorMode,
    byClass: { [spellClass in SpellClass]: CardColor },
    bySchool: { [spellSchool in SpellSchool]: CardColor },
}

