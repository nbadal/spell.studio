import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";
import SpellCard from "./SpellCard";
import {Spell} from "../store/spells/types";
import {RootState} from "../store/store";
import Box from "@material-ui/core/Box";
import {selectFilteredSpells} from "../store/spells/selectors";

const mapStateToProps = (state: RootState) => ({
    spells: selectFilteredSpells(state),
});

const reduxConnector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

class Spellbook extends Component<ReduxProps> {
    public render() {
        return (
            <Box className="Spellbook">
                <Box>
                    {this.props.spells.map((spell: Spell) => (
                        <SpellCard key={spell.name} spell={spell}/>
                    ))}
                </Box>
            </Box>
        );
    }
}

export default reduxConnector(Spellbook);
