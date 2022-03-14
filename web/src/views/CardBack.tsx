import React from 'react';
import '../css/CardBack.css';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import _ from 'lodash';
import { selectCard, unselectCard } from '../store/cards';
import { CardIconView } from './CardIconView';
import { RootState } from '../store';
import { selectCardAtIdx } from '../store/cards/selectors';
import { Card } from '../store/cards/types';

interface Props {
    spellIndex: number;
}

export function CardBack(props: Props) {
    const dispatch = useDispatch();
    const card = useSelector<RootState, Card>(selectCardAtIdx(props.spellIndex));
    const selectionActive = useSelector<RootState, boolean>(
        (state) => state.cards.selectedUids.length > 0,
    );
    const selected = useSelector<RootState, boolean>(
        (state) => state.cards.selectedUids.includes(card.uid),
    );

    const onClick = () => {
        if (selected) {
            dispatch(unselectCard(card));
        } else {
            dispatch(selectCard(card));
        }
    };

    const renderDiamond = (quadrant: 1 | 2 | 3 | 4) => {
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
            .map(() => card.backIconsSmall)
            .join('');
        const largeText = _.times(15)
            .map(() => card.backIconsLarge)
            .join('');

        const cardColor = card.color;
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
                    <text className="gi DiamondTextSm" x={50} y={50.5} fill={cardColor}>
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
                    <text className="DiamondTextLg" x={50} y={41} fill={cardColor}>
                        {largeText}
                    </text>
                </g>
            </svg>
        );
    };

    const cardColor = card.color;

    return (
        <Box
            className={
                !selectionActive || selected
                    ? 'CardBack'
                    : 'DisabledCardBack'
            }
            style={{ backgroundColor: cardColor }}
            onClick={onClick}
        >
            <Box className="ArtBackground" style={{ color: cardColor }}>
                <Box className="ArtInner" style={{ borderColor: cardColor }}>
                    {renderDiamond(1)}
                    {renderDiamond(2)}
                    {renderDiamond(3)}
                    {renderDiamond(4)}
                    <CardIconView
                        className="Icon"
                        height="1.5in"
                        icon={card.icon}
                        iconCharacter={card.iconCharacter}
                        fill={cardColor}
                    />
                    <Box className="TRCorner">{card.backCharacter}</Box>
                    <Box className="BLCorner">{card.backCharacter}</Box>
                </Box>
            </Box>
        </Box>
    );
}
