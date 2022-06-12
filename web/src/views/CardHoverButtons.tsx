import React from 'react';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import FlipIcon from '@mui/icons-material/Flip';
import { CardHoverButtonItem } from './CardHoverButtonItem';

interface Props {
    onFlipClicked: () => any,
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
                icon={<FlipIcon sx={iconStyle} />}
                tooltip="Flip"
                onClick={() => props.onFlipClicked()}
            />
            <CardHoverButtonItem
                icon={<ContentCopyIcon sx={iconStyle} />}
                tooltip="Copy"
                onClick={() => props.onCopyClicked()}
            />
            <CardHoverButtonItem
                icon={<CloseIcon sx={iconStyle} />}
                tooltip="Remove"
                onClick={() => props.onDeleteClicked()}
            />
        </Box>
    );
}
