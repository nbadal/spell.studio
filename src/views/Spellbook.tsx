import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";

import SpellCard from "./SpellCard";
import {Spell} from "../store/spells/types";
import {RootState} from "../store/store";

const mapStateToProps = (state: RootState) => ({
    spells: state.spells.filtered,
});

const reduxConnector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

class Spellbook extends Component<ReduxProps> {
    public render() {
        return (
            <div className="Spellbook">
                {this.props.spells.map((spell: Spell) => (
                    <SpellCard key={spell.name} spell={spell} />
                ))}
            </div>
        );
    }
}

export default reduxConnector(Spellbook);
