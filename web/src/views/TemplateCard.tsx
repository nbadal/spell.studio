import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { sanitize } from 'dompurify';
import { Card } from '../store/cards/types';
import { RootState } from '../store';
import { selectCardAtIdx } from '../store/cards/selectors';
import { selectFrontTemplate } from '../store/template/selectors';

interface Props {
    cardIndex: number;
}

export function TemplateCard(props: Props) {
    const card = useSelector<RootState, Card>(selectCardAtIdx(props.cardIndex));
    const template = useSelector(selectFrontTemplate);
    const result = template(card);

    return (
        <Box
            sx={{
                width: '2.5in', // TODO: from layout settings
                height: '3.5in', // TODO: from layout settings
            }}
            dangerouslySetInnerHTML={{ __html: sanitize(result, { FORCE_BODY: true }) }}
        />
    );
}
