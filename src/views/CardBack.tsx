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
                <Box className={"ArtBackground"} style={{ color: cardColor }}>
                    <Box className={"ArtInner"} style={{ borderColor: cardColor }}>
                        {this.renderDiamond(1)}
                        {this.renderDiamond(2)}
                        {this.renderDiamond(3)}
                        {this.renderDiamond(4)}
                        <ClassIcon
                            className={"Icon"}
                            height={"1.5in"}
                            spellClass={this.props.cardClass}
                            fill={cardColor}
                        />
                        <Box className={"TRCorner"}>{this.props.spell.level}</Box>
                        <Box className={"BLCorner"}>{this.props.spell.level}</Box>
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


    private renderDiamond(quadrant: 1 | 2 | 3 | 4) {
        // TODO: Use actual aspect ratio here:
        let baseAngle = Math.atan2(146, 98) * 180 / Math.PI;

        let angle: number;
        switch (quadrant) {
            case 1:
                angle = -baseAngle;
                break;
            case 2:
                angle = baseAngle;
                break;
            case 3:
                angle = -baseAngle - 180;
                break;
            case 4:
                angle = baseAngle + 180;
                break;
        }
        let transform = `rotate(${angle} 50 50)`
        // let transform = undefined;
        return (
            <svg
                className={"Diamond" + quadrant}
                viewBox={"0 0 100 100"}
                preserveAspectRatio={"midXmidY"}
            >
                <g transform={transform}>
                    <line className={"DiamondLine"} x1={-999} y1={52} x2={999} y2={52} stroke={this.props.cardColor} />
                    <text className={"DiamondTextSm"} x={50} y={49.5} fill={this.props.cardColor}>
                        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    </text>

                    <line className={"DiamondLine"} x1={-999} y1={42} x2={999} y2={42} stroke={this.props.cardColor} />
                    <text className={"DiamondTextLg"} x={50} y={40} fill={this.props.cardColor}>
                        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    </text>
                </g>
            </svg>
        );
    }
}

export default reduxConnector(CardBack);
