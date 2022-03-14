import React from 'react';

import BrushIcon from '@mui/icons-material/Brush';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FilterListIcon from '@mui/icons-material/FilterList';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ButtonBase from '@mui/material/ButtonBase';

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

export function ActivityBar(props: ActivityBarProps) {
    const { onActivityClicked, selectedActivity } = props;

    const items = [
        { activity: Activity.STYLE, icon: <BrushIcon /> },
        { activity: Activity.LAYOUT, icon: <FileCopyIcon /> },
        { activity: Activity.FILTERING, icon: <FilterListIcon /> },
        { activity: Activity.EXPORT, icon: <CodeIcon /> },
    ];

    if (process.env.NODE_ENV === 'development') {
        items.push({ activity: Activity.DEBUG, icon: <BugReportIcon /> });
    }

    return (
        <Box className="ActivityBar">
            {items.map((item) => (
                <ActivityItem
                    key={item.activity}
                    title={item.activity}
                    selected={selectedActivity === item.activity}
                    icon={item.icon}
                    onItemClicked={() => onActivityClicked(item.activity)}
                />
            ))}
        </Box>
    );
}

interface ActivityItemProps {
    icon: React.ReactNode,
    title: string,
    selected: boolean,
    onItemClicked: () => any,
}

function ActivityItem(itemProps: ActivityItemProps) {
    const {
        title, onItemClicked, selected, icon,
    } = itemProps;
    return (
        <Tooltip title={title} placement="right">
            <ButtonBase
                onClick={() => {
                    onItemClicked();
                }}
            >
                <Box className={selected ? 'ActivityItem SelectedItem' : 'ActivityItem'}>
                    {icon}
                </Box>
            </ButtonBase>
        </Tooltip>
    );
}
