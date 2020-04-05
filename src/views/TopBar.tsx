import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../store/store";
import {Dispatch} from "redux";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {}
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

const styles = (theme: Theme) => createStyles({
    title: {
        flexGrow: 1,
        fontFamily: "modesto-text",
        fontStyle: "normal",
        fontSize: "xx-large",
        textAlign: "left",
        margin: 0,
    }
});
type StyleProps = WithStyles<typeof styles>;
let stylesConnector = withStyles(styles);

class TopBar extends Component<ReduxProps & StyleProps> {
    public render() {
        const {classes} = this.props;
        return (
            <Box displayPrint="none">
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title}>
                            SpellStudio
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default stylesConnector(reduxConnector(TopBar));
