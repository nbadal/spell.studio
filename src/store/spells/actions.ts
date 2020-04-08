import {createAction} from "@reduxjs/toolkit";
import {SpellFilter, Spell} from "./types";

function withPayloadType<T>() {
    return (t: T) => ({payload: t});
}

export const filterSpells = createAction("FILTER_SPELLS", withPayloadType<SpellFilter>());

export const selectSpell = createAction("SELECT_SPELL", withPayloadType<Spell>());
export const unselectSpell = createAction("UNSELECT_SPELL", withPayloadType<Spell>());
export const clearSelection = createAction("CLEAR_SELECTION");
