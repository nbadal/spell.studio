import React, { Component } from 'react';
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

class Spellbook extends Component<ReduxProps & StyleProps> {
    private renderGrid = (gridSize: Size) => {
        let cellWidth = 0;
        if (this.props.showCard) {
            cellWidth += 256;
        }
        if (this.props.showBack) {
            cellWidth += 256;
        }
        if (cellWidth === 0) {
            return (<></>);
        }
        const cellHeight = 352;
        const columnCount = Math.max(1, Math.floor(gridSize.width / cellWidth));
        const rowCount = Math.max(1, this.props.cardCount / columnCount);
        return (
            <FixedSizeGrid
                width={gridSize.width}
                height={gridSize.height}
                columnCount={columnCount}
                columnWidth={cellWidth}
                rowHeight={cellHeight}
                rowCount={rowCount}
            >
                {(props: GridChildComponentProps) => {
                    const idx = props.rowIndex * columnCount + props.columnIndex;
                    return this.renderCardCell(props, idx);
                }}
            </FixedSizeGrid>
        );
    };

    private renderCardCell = (props: GridChildComponentProps, spellIdx: number) => {
        if (spellIdx >= this.props.cardCount) return <Box style={props.style} />;

        return (
            <Box style={props.style}>
                {this.props.showCard && <CardFront cardIndex={spellIdx} />}
                {this.props.showBack && <CardBack spellIndex={spellIdx} />}
            </Box>
        );
    };

    public render() {
        const { classes } = this.props;
        return (
            <Box className="Spellbook">
                <Box className={classes.screenSpellbook}>
                    <AutoSizer>{(size) => this.renderGrid(size)}</AutoSizer>
                </Box>
                <Box className={classes.printSpellbook}>
                    {this.props.cards.map((card, index) => (
                        <React.Fragment key={card.title}>
                            {this.props.showCard && <CardFront cardIndex={index} />}
                            {this.props.showBack && <CardBack spellIndex={index} />}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        );
    }
}

export default stylesConnector(reduxConnector(Spellbook));
