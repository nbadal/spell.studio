import {Action} from "redux";
import {ActionsObservable, combineEpics} from "redux-observable";
import {filter, map} from "rxjs/operators";

import {Spell} from "./types";
import {filterSpells, spellsFiltered} from "./actions";
import {SpellRepo} from "../../data/SpellRepo";


const filterSpellsEpic = (action$: ActionsObservable<Action>) => action$.pipe(
    filter(filterSpells.match),
    map((action) => {
        return SpellRepo.filteredSpells(action.payload);
    }),
    map((spells: Spell[]) => {
        return spellsFiltered(spells)
    })
);

export const spellsEpics = combineEpics(filterSpellsEpic);
