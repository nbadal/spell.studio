import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import SpellCard from "./SpellCard";
import { Spell } from "../store/spells/types";
import { RootState } from "../store/store";
import Box from "@material-ui/core/Box";
import { selectFilteredSpells } from "../store/spells/selectors";
import CardBack from "./CardBack";

const mapStateToProps = (state: RootState) => ({
    spells: selectFilteredSpells(state),
});

const reduxConnector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

class Spellbook extends Component<ReduxProps> {
    public render() {
        return (
            <Box className="Spellbook">
                {this.props.spells.map((spell: Spell) => (
                    <React.Fragment key={spell.name}>
                        <SpellCard spell={spell} />
                        <CardBack spell={spell} />
                    </React.Fragment>
                ))}
            </Box>
        );
    }
}

export default reduxConnector(Spellbook);
