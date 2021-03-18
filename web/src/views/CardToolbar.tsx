import React, { useState } from 'react';
import '../css/CardToolbar.css';

import Box from '@material-ui/core/Box';
import { Activity, ActivityBar } from './ActivityBar';
import { SideBar } from './SideBar';

export const CardToolbar = () => {
    const [selectedActivity, setActivity] = useState<Activity | null>(null);

    const activityClicked = (clickedActivity: Activity) => {
        if (selectedActivity === clickedActivity) {
            // Deselect if clicked twice
            setActivity(null);
        } else {
            setActivity(clickedActivity);
        }
    };

    return (
        <Box className="CardToolbar">
            <ActivityBar
                onActivityClicked={activityClicked}
                selectedActivity={selectedActivity}
            />
            {selectedActivity && (<SideBar selectedActivity={selectedActivity} />)}
        </Box>
    );
};
