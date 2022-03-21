import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

interface Props {
    icon: ReactNode,
    onClick: () => any,
}

export function CardHoverButtonItem(props: Props) {
    return (
        <Box
            className="CardHoverButtonItem"
            sx={{
                display: 'inline-flex',
                width: '24px',
                height: '24px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                opacity: '75%',
                backgroundColor: 'lightgrey',
                marginLeft: '4px',
            }}
        >
            <ButtonBase onClick={props.onClick}>{props.icon}</ButtonBase>
        </Box>
    );
}
