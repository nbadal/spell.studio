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
