import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

interface Props {
    icon: ReactNode,
    tooltip: string,
    onClick: () => any,
}

export function CardHoverButtonItem(props: Props) {
    return (
        <Box
            className="CardHoverButtonItem"
            title={props.tooltip}
            sx={{
                display: 'inline-flex',
                width: '24px',
                height: '24px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                '&:hover': {
                    opacity: '90%',
                },
                opacity: '75%',
                backgroundColor: 'lightgrey',
                marginLeft: '4px',
            }}
        >
            <ButtonBase onClick={props.onClick}>{props.icon}</ButtonBase>
        </Box>
    );
}
