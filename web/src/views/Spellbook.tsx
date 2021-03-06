import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Box from '@material-ui/core/Box';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import { RootState } from '../store';
import { selectCardCount, selectFilteredCards } from '../store/cards/selectors';
import CardFront from './CardFront';
import CardBack from './CardBack';

const mapStateToProps = (state: RootState) => ({
    cards: selectFilteredCards(state),
    cardCount: selectCardCount(state),
    showCard: state.layout.showFront,
    showBack: state.layout.showBack,
});

const reduxConnector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

const Spellbook = (props: ReduxProps) => {
    const { showBack, showCard, cardCount } = props;

    const renderGrid = (gridSize: Size) => {
        let cellWidth = 0;
        if (showCard) {
            cellWidth += 256;
        }
        if (showBack) {
            cellWidth += 256;
        }
        if (cellWidth === 0) {
            return (<></>);
        }
        const cellHeight = 352;
        const columnCount = Math.max(1, Math.floor(gridSize.width / cellWidth));
        const rowCount = Math.max(1, Math.ceil(cardCount / columnCount));
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
                    if (idx >= cardCount) return <Box style={gridProps.style} />;
                    return (
                        <Box style={gridProps.style}>
                            {showCard && <CardFront cardIndex={idx} />}
                            {showBack && <CardBack spellIndex={idx} />}
                        </Box>
                    );
                }}
            </FixedSizeGrid>
        );
    };

    return (
        <Box className="Spellbook">
            <AutoSizer>{(size) => renderGrid(size)}</AutoSizer>
        </Box>
    );
};

export default reduxConnector(Spellbook);
