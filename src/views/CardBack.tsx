import React, { Component } from "react";
import { Spell } from "../store/spells/types";
import "@rolodromo/gameicons-webfont/css/rpgen-gameicons.min.css";
import "../css/CardBack.css";
import { RootState } from "../store/store";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { selectSpellClass, selectSpellColor } from "../store/colors/selectors";
import { selectSpell, unselectSpell } from "../store/spells";
import { Box } from "@material-ui/core";
import { ClassIcon } from "./ClassIcon";
import _ from "lodash";
import {selectSpellAtIdx} from "../store/spells/selectors";

const mapStateToProps = (state: RootState, props: Props) => {
    let spell = selectSpellAtIdx(props.spellIndex)(state);
    return {
        spell: spell,
        selectionActive: state.spells.selected.length > 0,
        selected: state.spells.selected.includes(spell),
        cardColor: selectSpellColor(state, {spell}),
        cardClass: selectSpellClass(state, {spell}),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectSpell: (spell: Spell) => dispatch(selectSpell(spell)),
        unselectSpell: (spell: Spell) => dispatch(unselectSpell(spell)),
    };
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

interface Props {
    spellIndex: number;
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
        let baseAngle = (Math.atan2(146, 98) * 180) / Math.PI;

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

        let transform = `rotate(${angle} 50 50)`;
        // let transform = undefined;

        let smallText = _.times(32)
            .map(() => this.getSmallChar())
            .join("");
        let largeText = _.times(32)
            .map(() => this.getLargeChar())
            .join("");

        return (
            <svg className={"Diamond" + quadrant} viewBox={"0 0 100 100"}>
                <g transform={transform}>
                    <line
                        className={"DiamondLine"}
                        x1={-200}
                        y1={52}
                        x2={200}
                        y2={52}
                        stroke={this.props.cardColor}
                    />
                    <text
                        className={"gi DiamondTextSm"}
                        x={50}
                        y={49.5}
                        fill={this.props.cardColor}
                    >
                        {smallText}
                    </text>

                    <line
                        className={"DiamondLine"}
                        x1={-200}
                        y1={42}
                        x2={200}
                        y2={42}
                        stroke={this.props.cardColor}
                    />
                    <text className={"gi DiamondTextLg"} x={50} y={39} fill={this.props.cardColor}>
                        {largeText}
                    </text>
                </g>
            </svg>
        );
    }

    private getSmallChar(): string {
        switch (this.props.cardClass) {
            case "bard":
                return "\uefd8\uebe7"; // musical-notes double-quaver
            case "cleric":
                return "\uf3df\uedb1"; // trample hammer-drop
            case "druid":
                return "\uf001\ueb79"; // oak-leaf curled-leaf
            case "paladin":
                return "\uec2d\uecd6"; // edged-shield fist
            case "ranger":
                return "\uf064"; // pawprint
            case "sorcerer":
                return "\ueeff"; // lightning-slashes //kindle
            case "warlock":
                return "\uf123\uf1e5"; // raise-zombie sheikah-eye
            case "wizard":
                return "\uecbe"; // fire-ray
        }
    }

    private getLargeChar(): string {
        switch (this.props.cardClass) {
            case "bard":
                return "\uef32"; // lyre
            case "cleric":
                return "\uf1a6"; // scales
            case "druid":
                return "\uec29"; // eclipse-flare
            case "paladin":
                return "\uf42e"; // two-handed-sword
            case "ranger":
                return "\ueb80"; // curvy-knife
            case "sorcerer":
                return "\uee9e"; // kindle
            case "warlock":
                return "\ueb9d"; // death-juice
            case "wizard":
                return "\uec57"; // enlightenment
        }
    }
}

export default reduxConnector(CardBack);
