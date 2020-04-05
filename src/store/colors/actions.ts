import {createAction} from "@reduxjs/toolkit";
import {CardColor, ColorMode} from "./types";
import {SpellClass, SpellSchool} from "../spells/types";

function withPayloadType<T>() {
    return (t: T) => ({payload: t});
}

function withColorCategory<T>() {
    return (color: CardColor, category: T) => ({payload: {color, forCategory: category}});
}

export const changeColorMode = createAction("CHANGE_COLOR_MODE", withPayloadType<ColorMode>());
export const changeClassColor = createAction("CHANGE_CLASS_COLOR", withColorCategory<SpellClass>());
export const changeSchoolColor = createAction("CHANGE_SCHOOL_COLOR", withColorCategory<SpellSchool>());
