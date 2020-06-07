import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/store";
import Box from "@material-ui/core/Box";
import { selectFilteredSpells, selectSpellCount } from "../store/spells/selectors";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

const mapStateToProps = (state: RootState) => ({
    spells: selectFilteredSpells(state),
    spellCount: selectSpellCount(state),
    showCard: state.layout.showFront,
    showBack: state.layout.showBack,
});

const reduxConnector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

const styles = () =>
    createStyles({
        screenSpellbook: {
            display: "block",
            height: "100%",
            "@media print": {
                display: "none",
            },
        },
        printSpellbook: {
            display: "none",
            height: "100%",
            "@media print": {
                display: "block",
            },
        },
    });
type StyleProps = WithStyles<typeof styles>;
let stylesConnector = withStyles(styles);

class Spellbook extends Component<ReduxProps & StyleProps> {
    componentDidMount() {}

    public render() {
        const { classes } = this.props;
        return (
            <Box className="Spellbook">
                <Box className={classes.screenSpellbook}>
                    <AutoSizer>{(size) => this.renderGrid(size)}</AutoSizer>
                </Box>
                <Box className={classes.printSpellbook}>
                    {this.props.spells.map((spell, index) => (
                        <React.Fragment key={spell.name}>
                            {this.props.showCard && <CardFront spellIndex={index} />}
                            {this.props.showBack && <CardBack spellIndex={index} />}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        );
    }

    private renderGrid = (gridSize: Size) => {
        let cellWidth = 0;
        if (this.props.showCard) {
            cellWidth += 256;
        }
        if (this.props.showBack) {
            cellWidth += 256;
        }
        let cellHeight = 352;
        let columnCount = Math.max(1, Math.floor(gridSize.width / cellWidth));
        let rowCount = Math.max(1, this.props.spellCount / columnCount);
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
                    let idx = props.rowIndex * columnCount + props.columnIndex;
                    return this.renderCardCell(props, idx);
                }}
            </FixedSizeGrid>
        );
    };

    private renderCardCell = (props: GridChildComponentProps, spellIdx: number) => {
        if (spellIdx >= this.props.spellCount) return <Box style={props.style} />;

        return (
            <Box style={props.style}>
                {this.props.showCard && <CardFront spellIndex={spellIdx} />}
                {this.props.showBack && <CardBack spellIndex={spellIdx} />}
            </Box>
        );
    };
}

export default stylesConnector(reduxConnector(Spellbook));
