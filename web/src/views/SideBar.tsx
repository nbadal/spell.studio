import React from 'react';

import Box from '@material-ui/core/Box';
import { Activity } from './ActivityBar';

interface SideBarProps {
    selectedActivity: Activity | null,
}

export const SideBar = (props: SideBarProps) => (
    <Box className="SideBar">
        {props.selectedActivity && (
            <div>{`Selected: ${props.selectedActivity}`}</div>
        )}
    </Box>
);
