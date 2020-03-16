import React, {Component} from 'react';
import spells from "../data/srd/srd-spells.json";
import SpellCard from "./SpellCard";
import {Spell} from "../store/spells/types";

export default class Spellbook extends Component {
    public render() {
        return (
            <div className="Spellbook">
                {spells.map((spell: Spell) => (
                    <SpellCard spell={spell} />
                ))}
            </div>
        );
    }
}
