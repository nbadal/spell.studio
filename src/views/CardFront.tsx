import React, { Component, ReactNode } from "react";
import { Card, CardStat } from "../store/cards/types";
import "../css/CardFront.css";
import { ConcentrationIcon } from "./ConcentrationIcon";
import Textfit from "react-textfit";
import { RootState } from "../store/store";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { selectCard, unselectCard } from "../store/cards";
import { selectCardAtIdx } from "../store/cards/selectors";

const mapStateToProps = (state: RootState, props: Props) => {
    let card: Card = selectCardAtIdx(props.cardIndex)(state);
    return {
        card: card,
        selectionActive: state.cards.selectedTitles.length > 0,
        selected: state.cards.selectedTitles.includes(card.title),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectCard: (card: Card) => dispatch(selectCard(card)),
        unselectCard: (card: Card) => dispatch(unselectCard(card)),
    };
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

interface Props {
    cardIndex: number;
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
                style={{ backgroundColor: this.props.card.color }}
                onClick={this.onClick}
            >
                <div className="Title">
                    <Textfit mode="single" max={14}>
                        {this.props.card.title}
                    </Textfit>
                </div>
                <div className="Subtitle">{this.props.card.subtitle}</div>
                <div className="StatsTable">
                    {this.props.card.stats.map((prop) => this.statCell(prop))}
                </div>
                <div className="DetailsContainer">
                    {this.props.card.details.map((detail) => (
                        <>
                            {detail.header && <div className="HigherLevels">{detail.header}</div>}
                            <div
                                className="DetailsBlock"
                                style={{ flexGrow: detail.expand ? 1 : 0 }}
                            >
                                {processText(detail.text)}
                            </div>
                        </>
                    ))}
                </div>
                <div className="CardFooter">
                    <div />
                    <div>SpellStudio°</div>
                </div>
            </div>
        );
    }

    private statCell = (prop: CardStat) => (
        <div className="StatCell">
            <div className="CellContent">
                <div className="StatsTitle" style={{ color: this.props.card.color }}>
                    {prop.name}
                </div>
                <div className="StatsValue">{prop.value}</div>
                {prop.icon && (
                    <div className="StatsBadge">
                        <ConcentrationIcon
                            style={{
                                fontSize: 18,
                                color: this.props.card.color,
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );

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
