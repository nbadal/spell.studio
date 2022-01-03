import React, { ReactNode } from 'react';
import Textfit from 'react-textfit';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import {
    Card, CardStat, isList, isText,
} from '../store/cards/types';
import '../css/CardFront.css';
import { ConcentrationIcon } from './ConcentrationIcon';
import { RootState } from '../store';
import { selectCard, unselectCard } from '../store/cards';
import { selectCardAtIdx } from '../store/cards/selectors';

interface Props {
    cardIndex: number;
}

export function CardFront(props: Props) {
    const dispatch = useDispatch();

    const card = useSelector<RootState, Card>(selectCardAtIdx(props.cardIndex));
    const selectionActive = useSelector<RootState, boolean>(
        (state) => state.cards.selectedUids.length > 0,
    );
    const selected = useSelector<RootState, boolean>(
        (state) => state.cards.selectedUids.includes(card.uid),
    );

    const statCell = (prop: CardStat, idx: number) => {
        // If we're the last cell in an odd list of stats, stretch to fill remaining space
        const cardCount = card.stats.length;
        const cellClasses = ['StatCell'];
        if (cardCount % 2 !== 0 && idx === cardCount - 1) cellClasses.push('StatCellStretch');

        return (
            <div className={cellClasses.join(' ')} key={prop.name}>
                <div className="CellContent">
                    <div className="StatsTitle" style={{ color: card.color }}>
                        {prop.name}
                    </div>
                    <div className="StatsValue">{prop.value}</div>
                    {prop.icon && (
                        <div className="StatsBadge">
                            <ConcentrationIcon
                                style={{
                                    fontSize: 18,
                                    color: card.color,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const onClick = () => {
        if (selected) {
            dispatch(unselectCard(card));
        } else {
            dispatch(selectCard(card));
        }
    };

    return (
        <Box
            className={
                !selectionActive || selected
                    ? 'CardFront'
                    : 'DisabledCardFront'
            }
            style={{ backgroundColor: card.color }}
            onClick={onClick}
        >
            <div className="Title">
                <Textfit mode="single" max={14}>
                    {card.title}
                </Textfit>
            </div>
            <div className="Subtitle">{card.subtitle}</div>
            <div className="StatsTable">
                {card.stats.map((prop, idx) => statCell(prop, idx))}
            </div>
            <div className="DetailsContainer">
                {card.details.map((detail) => {
                    if (isText(detail)) {
                        return (
                            <React.Fragment key={detail.text}>
                                {detail.header && <div className="HigherLevels">{detail.header}</div>}
                                <div
                                    className="DetailsBlock"
                                    style={{ flexGrow: detail.expand ? 1 : 0 }}
                                >
                                    {processText(detail.text)}
                                </div>
                            </React.Fragment>
                        );
                    }
                    if (isList(detail)) {
                        return (
                            <div
                                key={detail.items.join(',')}
                                className="DetailsBlock"
                                style={{ flexGrow: detail.expand ? 1 : 0 }}
                            >
                                <ul>
                                    {detail.items.map((item) => (
                                        <li key={item}>{processText(item)}</li>
                                    ))}
                                </ul>
                            </div>
                        );
                    }

                    return undefined;
                })}
            </div>
            <div className="CardFooter">
                <div className="Category">{card.category}</div>
                <div>SpellStudio°</div>
            </div>
        </Box>
    );
}

function processText(text: string): ReactNode {
    return text.split('***').map((value, index) => {
        if (index % 2) {
            // Odd indexes are within ***'s
            return (
                <span key={value} className="BoldDetail">
                    {value}
                </span>
            );
        }
        return value.split('*').map((value2, index2) => {
            if (index2 % 2) {
                // Odd indexes are within *'s
                return (
                    <span key={value2} className="ItalicDetail">
                        {value2}
                    </span>
                );
            }
            return value2;
        });
    });
}
