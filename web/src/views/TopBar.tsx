import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';

export function TopBar() {
    const versionInfo = `${process.env.REACT_APP_REVISION} ${process.env.REACT_APP_BUILDTIME}`;
    return (
        <Box displayPrint="none">
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{
                        display: 'flex',
                        flexGrow: 1,
                        alignItems: 'center',
                    }}
                    >
                        <Typography sx={{
                            fontFamily: 'modesto-expanded',
                            fontSize: 'xx-large',
                        }}
                        >
                            SpellStudio
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: 'modesto-text',
                                fontSize: 'small',
                                marginLeft: 1,
                                paddingTop: 4,
                            }}
                            title={versionInfo}
                        >
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
