import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import PrintIcon from "@material-ui/icons/Print";
import React, { Component } from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { RootState } from "../store/store";
import { selectFilteredSpells } from "../store/spells/selectors";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { clearSelection } from "../store/spells";

const mapStateToProps = (state: RootState) => ({
    spellCount: selectFilteredSpells(state).length,
    selectedCount: state.spells.selected.length,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        clearSelection: () => dispatch(clearSelection()),
    };
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

const styles = (theme: Theme) =>
    createStyles({
        fab: {
            position: "absolute",
            bottom: theme.spacing(2),
            right: theme.spacing(3),
        },
    });
type StyleProps = WithStyles<typeof styles>;
let stylesConnector = withStyles(styles);

class Overlays extends Component<ReduxProps & StyleProps> {
    render() {
        const { classes } = this.props;
        return (
            <Box displayPrint="none">
                <Snackbar
                    open={this.props.selectedCount > 0}
                    anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                    message={
                        "Selected: " + this.props.selectedCount + " / " + this.props.spellCount
                    }
                    action={
                        <Button color="secondary" size="small" onClick={this.clearSelection}>
                            CLEAR
                        </Button>
                    }
                />
                <Fab className={classes.fab} onClick={this.handlePrint}>
                    <PrintIcon color={"primary"} />
                </Fab>
            </Box>
        );
    }

    private clearSelection = () => {
        this.props.clearSelection();
    };

    private handlePrint = () => {
        window.print();
    };
}

export default stylesConnector(reduxConnector(Overlays));
