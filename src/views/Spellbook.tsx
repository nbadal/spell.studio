import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/store";
import Box from "@material-ui/core/Box";
import { selectSpellCount } from "../store/spells/selectors";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import SpellCard from "./SpellCard";
import CardBack from "./CardBack";

const mapStateToProps = (state: RootState) => ({
    spellCount: selectSpellCount(state),
    showCard: state.layout.showFront,
    showBack: state.layout.showBack,
});

const reduxConnector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

class Spellbook extends Component<ReduxProps> {
    componentDidMount() {}

    public render() {
        return (
            <Box className="Spellbook">
                <AutoSizer>{(size) => this.renderGrid(size)}</AutoSizer>
            </Box>
        );
    }

    private renderGrid = (gridSize: Size) => {
        let cellWidth = 0;
        if (this.props.showCard) {
            cellWidth += 260;
        }
        if (this.props.showBack) {
            cellWidth += 260;
        }
        let cellHeight = 350;
        let columnCount = Math.max(1, Math.floor(gridSize.width / cellWidth));
        let rowCount = Math.max(1, this.props.spellCount / columnCount);
        return (
            <FixedSizeGrid
                width={gridSize.width}
                height={gridSize.height}
                columnCount={columnCount}
                columnWidth={gridSize.width / columnCount}
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
                {this.props.showCard && <SpellCard spellIndex={spellIdx} />}
                {this.props.showBack && <CardBack spellIndex={spellIdx} />}
            </Box>
        );
    };
}

export default reduxConnector(Spellbook);
