import '../css/CardList.css';
import { makeStyles } from '@mui/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import React, { CSSProperties } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { CardIconView } from './CardIconView';
import { Card } from '../store/cards/types';

export interface CardListProps {
    width: number,
    height: number,
    cards: Card[],
    selectedCards: Set<string>,
    onCardSelected: (cardUid: string, selected: boolean) => any,
}

export function CardList(props: CardListProps) {
    return (
        <FixedSizeList
            width={props.width}
            height={props.height}
            className="ImportCardList"
            itemCount={props.cards.length}
            itemSize={46}
        >
            {(itemProps: ListChildComponentProps) => {
                const { index, style } = itemProps;
                const card = props.cards[index];
                return (
                    <ImportCardItem
                        card={card}
                        isSelected={props.selectedCards.has(card.uid)}
                        onChange={(checked) => {
                            props.onCardSelected(card.uid, checked);
                        }}
                        style={style}
                    />
                );
            }}
        </FixedSizeList>
    );
}

interface ImportCardItemProps {
    card: Card,
    isSelected: boolean,
    onChange: (checked: boolean) => any,
    style: CSSProperties,
}

function ImportCardItem(props: ImportCardItemProps) {
    const useStyles = makeStyles({
        checkbox: {
            color: grey[50],
            '& checked': {
                color: grey[200],
            },
        },
        cardItem: {
            backgroundColor: props.card.color,
        },
    });

    const classes = useStyles();

    return (
        <Box style={props.style}>
            <Box className={`CardItem ${classes.cardItem}`}>
                <Checkbox
                    color="default"
                    className={classes.checkbox}
                    checked={props.isSelected}
                    onChange={(e) => props.onChange(e.target.checked)}
                />
                <Box className="CardItemTitle">{props.card.title}</Box>
                <CardIconView
                    className="CardItemIcon"
                    height=".25in"
                    icon={props.card.icon}
                    iconCharacter={props.card.iconCharacter}
                    fill="white"
                />
            </Box>
        </Box>
    );
}
