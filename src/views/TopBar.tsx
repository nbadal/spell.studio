import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../store/store";
import {Dispatch} from "redux";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from '@material-ui/icons/GitHub';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {}
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

const styles = (theme: Theme) => createStyles({
    titleContainer: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: "modesto-expanded",
        fontSize: "xx-large",
    },
    version: {
        fontFamily: "modesto-text",
        fontSize: "small",
        marginLeft: 6,
        paddingTop: 30,
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
                        <Box className={classes.titleContainer}>
                            <Typography className={classes.title}>
                                SpellStudio
                            </Typography>
                            <Typography className={classes.version}>
                                ALPHA
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton color="inherit" aria-label="github" href="https://github.com/nbadal/spell.studio">
                                <GitHubIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default stylesConnector(reduxConnector(TopBar));
