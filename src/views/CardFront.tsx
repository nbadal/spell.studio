import React, { Component, ReactNode } from "react";
import { Spell } from "../store/cards/types";
import "../css/CardFront.css";
import { ConcentrationIcon } from "./ConcentrationIcon";
import Textfit from "react-textfit";
import Box from "@material-ui/core/Box";
import { RootState } from "../store/store";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { selectSpellColor } from "../store/colors/selectors";
import { selectCard, unselectCard } from "../store/cards";
import {selectCardAtIdx} from "../store/cards/selectors";

const mapStateToProps = (state: RootState, props: Props) => {
    let card = selectCardAtIdx(props.spellIndex)(state)
    return {
        card: card,
        selectionActive: state.cards.selected.length > 0,
        selected: state.cards.selected.includes(card),
        cardColor: selectSpellColor(state, {spell: card}),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectCard: (spell: Spell) => dispatch(selectCard(spell)),
        unselectCard: (spell: Spell) => dispatch(unselectCard(spell)),
    };
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

interface Props {
    spellIndex: number;
}

class CardFront extends Component<Props & ReduxProps> {
    public render() {
        return (
            <div
                className={
                    !this.props.selectionActive || this.props.selected
                        ? "CardFront"
                        : "DisabledCardFront"
                }
                style={{ backgroundColor: this.props.cardColor }}
                onClick={this.onClick}
            >
                <div className="Name">
                    <Box>
                        <Textfit mode="single" max={14}>
                            {this.props.card.name}
                        </Textfit>
                    </Box>
                </div>
                <div className="Type">{this.spellTypeString()}</div>
                <table className="StatsTable">
                    <tbody>
                        <tr>
                            {this.statCell("Casting Time", this.props.card.castingTime)}
                            {this.statCell("Range", this.props.card.range)}
                        </tr>
                        <tr>
                            {this.statCell("Components", this.spellComponentsString())}
                            {this.statCell(
                                "Duration",
                                this.props.card.duration,
                                !this.props.card.concentration || (
                                    <ConcentrationIcon
                                        style={{
                                            fontSize: 18,
                                            color: this.props.cardColor,
                                        }}
                                    />
                                ),
                            )}
                        </tr>
                    </tbody>
                </table>
                <div className="DetailsContainer">
                    {this.props.card.components.materialInfo !== undefined && (
                        <div className="DetailsBlock">
                            Material: {this.props.card.components.materialInfo}
                        </div>
                    )}
                    {this.props.card.details
                        .filter((detail) => typeof detail === "string")
                        .map((detail, i, arr) => (
                            <div
                                className="DetailsBlock"
                                key={i}
                                style={{ flexGrow: i === arr.length - 1 ? 1 : 0 }}
                            >
                                {processText(detail)}
                            </div>
                        ))}
                    {this.props.card.higherLevels && (
                        <div className="HigherLevels">At Higher Levels</div>
                    )}
                    {this.props.card.higherLevels && (
                        <div className="DetailsBlock">
                            {processText(this.props.card.higherLevels)}
                        </div>
                    )}
                </div>
                <div className="CardFooter">
                    <div />
                    <div>SpellStudio°</div>
                </div>
            </div>
        );
    }

    private statCell = (title: string, value: string, badge?: ReactNode) => (
        <td>
            <div className="CellContent">
                <div className="StatsTitle" style={{ color: this.props.cardColor }}>
                    {title}
                </div>
                <div className="StatsValue">{value}</div>
                {badge && <div className="StatsBadge">{badge}</div>}
            </div>
        </td>
    );

    private spellTypeString(): string {
        let spellType: string = "";

        switch (this.props.card.level) {
            case 1:
                spellType += "1st-level ";
                break;
            case 2:
                spellType += "2nd-level ";
                break;
            case 3:
                spellType += "3rd-level ";
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                spellType += this.props.card.level + "th-level ";
                break;
        }

        spellType += this.props.card.school;

        if (this.props.card.level === 0) {
            spellType += " cantrip";
        }
        if (this.props.card.ritual) {
            spellType += " (ritual)";
        }

        // Capitalize first letter.
        spellType = spellType.substring(0, 1).toUpperCase() + spellType.substring(1);

        return spellType;
    }

    private spellComponentsString(): string {
        let components: string[] = [];
        if (this.props.card.components.verbal) components.push("V");
        if (this.props.card.components.somatic) components.push("S");
        if (this.props.card.components.material) components.push("M");
        return components.join(", ");
    }

    private onClick = () => {
        if (this.props.selected) {
            this.props.unselectCard(this.props.card);
        } else {
            this.props.selectCard(this.props.card);
        }
    };
}

export default reduxConnector(CardFront);

function processText(text: string): ReactNode {
    return text.split("***").map((value, index) => {
        if (index % 2) {
            // Odd indexes are within **'s
            return (
                <span key={index} className="BoldDetail">
                    {value}
                </span>
            );
        } else {
            return value;
        }
    });
}
