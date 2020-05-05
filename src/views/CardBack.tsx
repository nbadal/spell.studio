import React, { Component } from "react";
import { Spell } from "../store/spells/types";
import "../css/CardBack.css";
import { RootState } from "../store/store";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { selectSpellColor, selectSpellClass } from "../store/colors/selectors";
import { selectSpell, unselectSpell } from "../store/spells";
import { Box } from "@material-ui/core";
import { ClassIcon } from "./ClassIcon";

const mapStateToProps = (state: RootState, props: Props) => ({
    selectionActive: state.spells.selected.length > 0,
    selected: state.spells.selected.includes(props.spell),
    cardColor: selectSpellColor(state, props),
    cardClass: selectSpellClass(state, props),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectSpell: (spell: Spell) => dispatch(selectSpell(spell)),
        unselectSpell: (spell: Spell) => dispatch(unselectSpell(spell)),
    };
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

interface Props {
    spell: Spell;
}

class CardBack extends Component<Props & ReduxProps> {
    public render() {
        let { cardColor } = this.props;
        return (
            <Box
                className={
                    !this.props.selectionActive || this.props.selected
                        ? "CardBack"
                        : "DisabledCardBack"
                }
                style={{ backgroundColor: cardColor }}
                onClick={this.onClick}
            >
                <Box className={"ArtBorder"} style={{ color: cardColor }}>
                    <Box className={"Art"} style={{ borderColor: cardColor }}>
                        <Box className={"TopCorner"}>{this.props.spell.level}</Box>
                        <ClassIcon spellClass={this.props.cardClass} color={cardColor} />
                        <Box className={"BotCorner"}>{this.props.spell.level}</Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    private onClick = () => {
        if (this.props.selected) {
            this.props.unselectSpell(this.props.spell);
        } else {
            this.props.selectSpell(this.props.spell);
        }
    };
}

export default reduxConnector(CardBack);
