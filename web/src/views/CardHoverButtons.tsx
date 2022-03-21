import React from 'react';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { CardHoverButtonItem } from './CardHoverButtonItem';

interface Props {
    onCopyClicked: () => any,
    onDeleteClicked: () => any,
}

export function CardHoverButtons(props: Props) {
    const iconStyle = { width: '16px', height: '16px' };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                zIndex: '1',
            }}
        >
            <CardHoverButtonItem
                icon={<ContentCopyIcon sx={iconStyle} />}
                onClick={() => props.onCopyClicked()}
            />
            <CardHoverButtonItem
                icon={<CloseIcon sx={iconStyle} />}
                onClick={() => props.onDeleteClicked()}
            />
        </Box>
    );
}
