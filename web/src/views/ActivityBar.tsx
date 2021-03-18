import React from 'react';

import BrushIcon from '@material-ui/icons/Brush';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FilterListIcon from '@material-ui/icons/FilterList';
import CodeIcon from '@material-ui/icons/Code';

import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

export enum Activity {
    STYLE = 'Style',
    LAYOUT = 'Layout',
    FILTERING = 'Filtering',
    EXPORT = 'Export',
}

interface ActivityBarProps {
    onActivityClicked: (activity: Activity) => any,
    selectedActivity: Activity | null,
}

export const ActivityBar = (props: ActivityBarProps) => {
    const { onActivityClicked, selectedActivity } = props;

    interface ActivityItemProps {
        icon: React.ReactNode,
        activity: Activity
    }

    const ActivityItem = (itemProps: ActivityItemProps) => {
        const selected = selectedActivity === itemProps.activity;
        return (
            <Tooltip title={itemProps.activity} placement="right">
                <Box
                    className={selected ? 'ActivityItem SelectedItem' : 'ActivityItem'}
                    onClick={() => {
                        console.log(`${itemProps.activity} Clicked!`);
                        onActivityClicked(itemProps.activity);
                    }}
                >
                    {itemProps.icon}
                </Box>
            </Tooltip>
        );
    };

    return (
        <Box className="ActivityBar">
            <ActivityItem activity={Activity.STYLE} icon={<BrushIcon />} />
            <ActivityItem activity={Activity.LAYOUT} icon={<FileCopyIcon />} />
            <ActivityItem activity={Activity.FILTERING} icon={<FilterListIcon />} />
            <ActivityItem activity={Activity.EXPORT} icon={<CodeIcon />} />
        </Box>
    );
};
