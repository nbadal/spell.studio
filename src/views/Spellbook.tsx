import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";

import SpellCard from "./SpellCard";
import {Spell, SpellClass} from "../store/spells/types";
import {RootState} from "../store/store";
import {Color} from "csstype";

const mapStateToProps = (state: RootState) => ({
    spells: state.spells.filtered,
    filter: state.spells.filter,
});

interface State {
    selectedSpells: string[];
}

const reduxConnector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

class Spellbook extends Component<ReduxProps, State> {

    constructor(props: Readonly<ReduxProps>) {
        super(props);

        this.state = {
            selectedSpells: [],
        }
    }

    public render() {
        return (
            <div className="Spellbook">
                {this.props.spells.map((spell: Spell) => (
                    <SpellCard key={spell.name} spell={spell}
                               selected={this.isSpellSelected(spell.name)}
                               cardColor={this.cardColor(spell)}
                               onClick={() => this.spellClicked(spell.name)}/>
                ))}
            </div>
        );
    }

    private spellClicked = (clickedSpell: string) => {
        if (this.state.selectedSpells.includes(clickedSpell)) {
            this.setState({
                selectedSpells: this.state.selectedSpells
                    .filter((spell) => spell !== clickedSpell)
            });
        } else {

            this.setState({selectedSpells: [clickedSpell, ...this.state.selectedSpells]});
        }
    };

    private isSpellSelected(spellName: string) {
        return this.state.selectedSpells.length === 0 || this.state.selectedSpells.includes(spellName);
    }

    private cardColor(spell: Spell): Color {
        let spellClasses = this.spellClasses(spell);
        if (spellClasses.length === 0) {
            console.error("Couldn't figure out a color for " + spell.name);
            return "gray";
        }
        // TODO: how should we handle multi-class spells?
        // Right now, just select the first class listed.
        return this.classColor(spellClasses[0]);
    }

    private classColor(spellClass: SpellClass): Color {
        // From D&D Beyond:
        switch (spellClass) {
            case "bard":
                return "#AB6DAC";
            case "cleric":
                return "#91A1B2";
            case "druid":
                return "#7A853B";
            case "paladin":
                return "#B59E54";
            case "ranger":
                return "#507F62";
            case "sorcerer":
                return "#992E2E";
            case "warlock":
                return "#7B469B";
            case "wizard":
                return "#2A50A1";
        }
    }

    private spellClasses(spell: Spell): SpellClass[] {
        if (this.props.filter.classes.length > 0) {
            return spell.classes.filter(c => this.props.filter.classes.includes(c));
        } else {
            return spell.classes;
        }
    }
}

export default reduxConnector(Spellbook);
