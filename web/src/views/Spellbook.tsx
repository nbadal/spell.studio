import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import { RootState } from '../store';
import { selectCardAtIdx, selectCardCount, selectFilteredCards } from '../store/cards/selectors';
import { AddCard } from './AddCard';
import { AddCardButtons } from './AddCardButtons';
import { TemplateCard } from './TemplateCard';
import { selectStyleCss } from '../store/template/selectors';
import { CardHoverButtons } from './CardHoverButtons';
import {
    deleteCard, duplicateCard, selectCard, unselectCard,
} from '../store/cards';
import { Card } from '../store/cards/types';

export function Spellbook() {
    const { cardCount } = useSelector((state: RootState) => ({
        cards: selectFilteredCards(state),
        cardCount: selectCardCount(state),
    }));

    const renderGrid = (gridSize: Size) => {
        const cellWidth = 256;
        const cellHeight = 352;
        const cellCount = cardCount + 1;
        const columnCount = Math.max(1, Math.floor(gridSize.width / cellWidth));
        const rowCount = Math.max(1, Math.ceil(cellCount / columnCount));
        return (
            <FixedSizeGrid
                width={gridSize.width}
                height={gridSize.height}
                columnCount={columnCount}
                columnWidth={cellWidth}
                rowHeight={cellHeight}
                rowCount={rowCount}
            >
                {(gridProps: GridChildComponentProps) => {
                    const idx = gridProps.rowIndex * columnCount + gridProps.columnIndex;
                    if (idx === 0) {
                        return <Box style={gridProps.style}><AddCard /></Box>;
                    }
                    const cardIdx = idx - 1;
                    if (cardIdx >= cardCount) return <Box style={gridProps.style} />;
                    return (
                        <Box style={gridProps.style}>
                            <GridItem cardIdx={cardIdx} />
                        </Box>
                    );
                }}
            </FixedSizeGrid>
        );
    };

    const style = useSelector(selectStyleCss);

    return (
        <Box className="Spellbook">
            {typeof style === 'string' && (<style>{style}</style>)}
            {cardCount > 0 && (
                <AutoSizer>{(size) => renderGrid(size)}</AutoSizer>
            )}
            {cardCount === 0 && (
                <AddCardButtons />
            )}
        </Box>
    );
}

function GridItem(props: { cardIdx: number }) {
    const dispatch = useDispatch();

    const card = useSelector<RootState, Card>(selectCardAtIdx(props.cardIdx));

    const [isHovering, setHovering] = useState(false);

    const onDeleteClicked = () => {
        dispatch(deleteCard(card));
    };

    const onCopyClicked = () => {
        dispatch(duplicateCard(card));
    };

    const selected = useSelector<RootState, boolean>(
        (state) => state.cards.selectedUids.includes(card.uid),
    );

    const onCardClicked = () => {
        if (selected) {
            dispatch(unselectCard(card));
        } else {
            dispatch(selectCard(card));
        }
    };

    return (
        <Box
            onMouseEnter={() => setHovering(true)}
            onMouseMove={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {isHovering && (
                <CardHoverButtons onDeleteClicked={onDeleteClicked} onCopyClicked={onCopyClicked} />
            )}
            <Box
                onClick={onCardClicked}
                sx={{
                    '&:hover': {
                        opacity: 0.9,
                    },
                    cursor: 'pointer',
                    margin: '8px',
                }}
            >
                <TemplateCard cardIndex={props.cardIdx} />
            </Box>
        </Box>
    );
}
