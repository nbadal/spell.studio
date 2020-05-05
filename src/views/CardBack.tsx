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
                <Box className={"ArtContainer"} style={{ color: cardColor }}>
                    <Box className={"ArtInner"} style={{ borderColor: cardColor }}>
                        <Box className={"ArtBackground"}>
                            <svg viewBox={"0 0 196 292"}>
                                {this.renderDiamond(196 * 0.98, 292 * 0.98)}
                                {this.renderDiamond(196 * 1.15, 292 * 1.15)}
                            </svg>
                        </Box>
                        <Box className={"Art"}>
                            <Box className={"TopCorner"}>{this.props.spell.level}</Box>
                            <ClassIcon spellClass={this.props.cardClass} color={cardColor} />
                            <Box className={"BotCorner"}>{this.props.spell.level}</Box>
                        </Box>
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

    private renderDiamond(width: number, height: number) {
        let stroke = this.props.cardColor;
        return (
            <g transform={"translate(" + 196 / 2 + " " + 292 / 2 + ")"}>
                <path
                    d={`
                        M ${-width / 2} 0
                        L 0 ${-height / 2}
                        L ${width / 2} 0
                        L 0 ${height / 2}
                        Z
                    `}
                    stroke={stroke}
                    fill={"none"}
                    strokeWidth={3}
                />
            </g>
        );
    }
}

export default reduxConnector(CardBack);
