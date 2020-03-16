import {createAction} from "@reduxjs/toolkit";
import {SpellFilter, Spell} from "./types";

function withPayloadType<T>() {
    return (t: T) => ({payload: t});
}

export const filterSpells = createAction("FILTER_SPELLS", withPayloadType<SpellFilter>());
export const spellsFiltered = createAction("SPELLS_FILTERED", withPayloadType<Spell[]>());
