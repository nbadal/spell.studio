import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { makeStyles } from '@mui/styles';

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

export function TopBar() {
    const classes = useStyles();
    const versionInfo = `${process.env.REACT_APP_REVISION} ${process.env.REACT_APP_BUILDTIME}`;
    return (
        <Box displayPrint="none">
            <AppBar position="static">
                <Toolbar>
                    <Box className={classes.titleContainer}>
                        <Typography className={classes.title}>SpellStudio</Typography>
                        <Typography className={classes.version} title={versionInfo}>
                            ALPHA
                        </Typography>
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
