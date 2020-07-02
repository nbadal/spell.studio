import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import PrintIcon from '@material-ui/icons/Print';
import React, { Component } from 'react';
import {
    createStyles, Theme, withStyles, WithStyles,
} from '@material-ui/core/styles';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { selectFilteredCards } from '../store/cards/selectors';
import { clearSelection } from '../store/cards';

const mapStateToProps = (state: RootState) => ({
    spellCount: selectFilteredCards(state).length,
    selectedCount: state.cards.selectedUids.length,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    clearSelection: () => dispatch(clearSelection()),
});

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

const styles = (theme: Theme) =>
    createStyles({
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(3),
        },
    });
type StyleProps = WithStyles<typeof styles>;
const stylesConnector = withStyles(styles);

class Overlays extends Component<ReduxProps & StyleProps> {
    private clearSelection = () => {
        this.props.clearSelection();
    };

    render() {
        const { classes } = this.props;
        return (
            <Box className="Overlays" displayPrint="none">
                <Snackbar
                    open={this.props.selectedCount > 0}
                    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    message={
                        `Selected: ${this.props.selectedCount} / ${this.props.spellCount}`
                    }
                    action={(
                        <Button color="secondary" size="small" onClick={this.clearSelection}>
                            CLEAR
                        </Button>
                    )}
                />
                <Fab className={classes.fab} component={Link} to="/print" target="_blank">
                    <PrintIcon color="primary" />
                </Fab>

            </Box>
        );
    }
}

export default stylesConnector(reduxConnector(Overlays));
