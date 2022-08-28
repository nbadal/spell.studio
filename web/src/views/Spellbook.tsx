import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import { RootState } from '../store';
import {
    selectAllCards, selectedCardAtIdx, selectedCardCount,
} from '../store/cards/selectors';
import { AddCard } from './AddCard';
import { AddCardButtons } from './AddCardButtons';
import { TemplateCard } from './TemplateCard';
import { selectStyleCss } from '../store/template/selectors';
import { CardHoverButtons } from './CardHoverButtons';
import { Card } from '../store/cards/types';
import { unselectCard } from '../store/cards';
import { Activity } from '../store/modals/types';

export function Spellbook() {
    const { cardCount, allCount } = useSelector((state: RootState) => ({
        allCount: selectAllCards(state).length,
        cardCount: selectedCardCount(state),
    }));

    const searchActivityShown = useSelector((state: RootState) =>
        state.modals.openActivity !== Activity.SEARCH);

    const renderGrid = (gridSize: Size) => {
        const cellWidth = 256;
        const cellHeight = 352;
        const cellCount = searchActivityShown ? cardCount + 1 : cardCount;
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
                    if (idx === 0 && searchActivityShown) {
                        return <Box style={gridProps.style}><AddCard /></Box>;
                    }
                    const cardIdx = searchActivityShown ? idx - 1 : idx;
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
            {allCount > 0 && (
                <AutoSizer>{(size) => renderGrid(size)}</AutoSizer>
            )}
            {allCount === 0 && (
                <AddCardButtons />
            )}
        </Box>
    );
}

function GridItem(props: { cardIdx: number }) {
    const dispatch = useDispatch();

    const card = useSelector<RootState, Card>(selectedCardAtIdx(props.cardIdx));

    const [isHovering, setHovering] = useState(false);
    const [showFront, setShowFront] = useState(true);

    const onDeleteClicked = () => {
        dispatch(unselectCard(card));
    };

    const onFlipClicked = useCallback(() => {
        setShowFront(!showFront);
    }, [showFront]);

    return (
        <Box
            onMouseEnter={() => setHovering(true)}
            onMouseMove={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {isHovering && (
                <CardHoverButtons
                    onFlipClicked={onFlipClicked}
                    onDeleteClicked={onDeleteClicked}
                />
            )}
            <Box
                sx={{
                    '&:hover': {
                        opacity: 0.9,
                    },
                    cursor: 'pointer',
                    margin: '8px',
                }}
            >
                <TemplateCard showFront={showFront} isPrint={false} cardIndex={props.cardIdx} />
            </Box>
        </Box>
    );
}
