import React from 'react';

import BrushIcon from '@material-ui/icons/Brush';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FilterListIcon from '@material-ui/icons/FilterList';
import CodeIcon from '@material-ui/icons/Code';
import BugReportIcon from '@material-ui/icons/BugReport';

import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonBase from '@material-ui/core/ButtonBase';

export enum Activity {
    STYLE = 'Style',
    LAYOUT = 'Layout',
    FILTERING = 'Filtering',
    EXPORT = 'Export',
    DEBUG = 'Debugging',
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
                <ButtonBase
                    onClick={() => {
                        console.log(`${itemProps.activity} Clicked!`);
                        onActivityClicked(itemProps.activity);
                    }}
                >
                    <Box className={selected ? 'ActivityItem SelectedItem' : 'ActivityItem'}>
                        {itemProps.icon}
                    </Box>
                </ButtonBase>
            </Tooltip>
        );
    };

    return (
        <Box className="ActivityBar">
            <ActivityItem activity={Activity.STYLE} icon={<BrushIcon />} />
            <ActivityItem activity={Activity.LAYOUT} icon={<FileCopyIcon />} />
            <ActivityItem activity={Activity.FILTERING} icon={<FilterListIcon />} />
            <ActivityItem activity={Activity.EXPORT} icon={<CodeIcon />} />
            {process.env.NODE_ENV === 'development' && (
                <ActivityItem activity={Activity.DEBUG} icon={<BugReportIcon />} />
            )}
        </Box>
    );
};
