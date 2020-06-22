import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Box from '@material-ui/core/Box';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { RootState } from '../store/store';
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

const styles = () =>
    createStyles({
        screenSpellbook: {
            display: 'block',
            height: '100%',
            '@media print': {
                display: 'none',
            },
        },
        printSpellbook: {
            display: 'none',
            height: '100%',
            '@media print': {
                display: 'block',
            },
        },
    });
type StyleProps = WithStyles<typeof styles>;
const stylesConnector = withStyles(styles);

const renderGrid = (props: ReduxProps, gridSize: Size) => {
    const { showBack, showCard, cardCount } = props;

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
    const rowCount = Math.max(1, cardCount / columnCount);
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

const Spellbook = (props: ReduxProps & StyleProps) => {
    const {
        classes, cards, showCard, showBack,
    } = props;

    return (
        <Box className="Spellbook">
            <Box className={classes.screenSpellbook}>
                <AutoSizer>{(size) => renderGrid(props, size)}</AutoSizer>
            </Box>
            <Box className={classes.printSpellbook}>
                {cards.map((card, index) => (
                    <React.Fragment key={card.title}>
                        {showCard && <CardFront cardIndex={index} />}
                        {showBack && <CardBack spellIndex={index} />}
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
};

export default stylesConnector(reduxConnector(Spellbook));
