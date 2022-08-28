import Box from '@mui/material/Box';
import React, { CSSProperties } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { CardIconView } from './CardIconView';
import { Card } from '../store/cards/types';

export interface CardListProps {
    width: number,
    height: number,
    cards: Card[],
    onCardClicked: (cardUid: string) => any,
}

export function CardList(props: CardListProps) {
    return (
        <FixedSizeList
            width={props.width}
            height={props.height}
            itemCount={props.cards.length}
            itemSize={48}
        >
            {(itemProps: ListChildComponentProps) => {
                const { index, style } = itemProps;
                const card = props.cards[index];
                return (
                    <CardListItem
                        card={card}
                        onClick={props.onCardClicked}
                        style={style}
                    />
                );
            }}
        </FixedSizeList>
    );
}

interface ImportCardItemProps {
    card: Card,
    onClick: (uid: string) => any,
    style: CSSProperties,
}

function CardListItem(props: ImportCardItemProps) {
    return (
        <Box style={props.style}>
            <Box
                sx={{
                    backgroundColor: props.card.color,
                    height: '42px',
                    color: 'white',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '10px',
                    margin: '2px 16px 2px 0',
                    padding: '0 2px',
                    cursor: 'pointer',
                }}
                onClick={() => props.onClick(props.card.uid)}
            >
                <Box sx={{ flexGrow: 1, marginLeft: 1 }}>{props.card.title}</Box>
                <Box sx={{ margin: '0 10px' }}>
                    <CardIconView
                        height=".25in"
                        icon={props.card.icon}
                        iconCharacter={props.card.iconCharacter}
                        fill="white"
                    />
                </Box>
            </Box>
        </Box>
    );
}
