import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";

import SpellCard from "./SpellCard";
import {Spell} from "../store/spells/types";
import {RootState} from "../store/store";

const mapStateToProps = (state: RootState) => ({
    spells: state.spells.filtered,
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

    private cardColor(spell: Spell) {
        return "green";
    }
}

export default reduxConnector(Spellbook);
