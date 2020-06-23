import React, { Component } from 'react';
import '@rolodromo/gameicons-webfont/css/rpgen-gameicons.min.css';
import '../css/CardBack.css';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Box } from '@material-ui/core';
import _ from 'lodash';
import { selectCard, unselectCard } from '../store/cards';
import { CardIconView } from './CardIconView';
import { RootState } from '../store/store';
import { selectCardAtIdx } from '../store/cards/selectors';
import { Card } from '../store/cards/types';

const mapStateToProps = (state: RootState, props: Props) => {
    const card = selectCardAtIdx(props.spellIndex)(state);
    return {
        card,
        selectionActive: state.cards.selectedTitles.length > 0,
        selected: state.cards.selectedTitles.includes(card.title),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    selectCard: (card: Card) => dispatch(selectCard(card)),
    unselectCard: (card: Card) => dispatch(unselectCard(card)),
});

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

interface Props {
    spellIndex: number;
}

class CardBack extends Component<Props & ReduxProps> {
    private onClick = () => {
        if (this.props.selected) {
            this.props.unselectCard(this.props.card);
        } else {
            this.props.selectCard(this.props.card);
        }
    };

    private renderDiamond(quadrant: 1 | 2 | 3 | 4) {
        // TODO: Use actual aspect ratio here:
        const baseAngle = (Math.atan2(146, 98) * 180) / Math.PI;

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
            // no default
        }

        const transform = `rotate(${angle} 50 50)`;
        // let transform = undefined;

        const smallText = _.times(25)
            .map(() => this.props.card.backIconsSmall)
            .join('');
        const largeText = _.times(15)
            .map(() => this.props.card.backIconsLarge)
            .join('');

        const cardColor = this.props.card.color;
        return (
            <svg className={`Diamond${quadrant}`} viewBox="0 0 100 100">
                <g transform={transform}>
                    <line
                        className="DiamondLine"
                        x1={-200}
                        y1={52}
                        x2={200}
                        y2={52}
                        stroke={cardColor}
                    />
                    <text className="gi DiamondTextSm" x={50} y={49.5} fill={cardColor}>
                        {smallText}
                    </text>

                    <line
                        className="DiamondLine"
                        x1={-200}
                        y1={42}
                        x2={200}
                        y2={42}
                        stroke={cardColor}
                    />
                    <text className="gi DiamondTextLg" x={50} y={39} fill={cardColor}>
                        {largeText}
                    </text>
                </g>
            </svg>
        );
    }

    public render() {
        const cardColor = this.props.card.color;
        return (
            <Box
                className={
                    !this.props.selectionActive || this.props.selected
                        ? 'CardBack'
                        : 'DisabledCardBack'
                }
                style={{ backgroundColor: cardColor }}
                onClick={this.onClick}
            >
                <Box className="ArtBackground" style={{ color: cardColor }}>
                    <Box className="ArtInner" style={{ borderColor: cardColor }}>
                        {this.renderDiamond(1)}
                        {this.renderDiamond(2)}
                        {this.renderDiamond(3)}
                        {this.renderDiamond(4)}
                        <CardIconView
                            className="Icon"
                            height="1.5in"
                            icon={this.props.card.icon}
                            fill={cardColor}
                        />
                        <Box className="TRCorner">{this.props.card.backCharacter}</Box>
                        <Box className="BLCorner">{this.props.card.backCharacter}</Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default reduxConnector(CardBack);
