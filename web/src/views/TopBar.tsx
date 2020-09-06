import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    titleContainer: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'modesto-expanded',
        fontSize: 'xx-large',
    },
    version: {
        fontFamily: 'modesto-text',
        fontSize: 'small',
        marginLeft: 6,
        paddingTop: 30,
    },
});

function TopBar() {
    const classes = useStyles();
    return (
        <Box displayPrint="none">
            <AppBar position="static">
                <Toolbar>
                    <Box className={classes.titleContainer}>
                        <Typography className={classes.title}>SpellStudio</Typography>
                        <Typography className={classes.version}>ALPHA</Typography>
                    </Box>
                    <Box>
                        <IconButton
                            color="inherit"
                            aria-label="github"
                            href="https://github.com/nbadal/spell.studio"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar;
