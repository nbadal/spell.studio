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
    isPrint: boolean;
}

export function TemplateCard({ cardIndex, isPrint }: Props) {
    // Bleed should only show when printing AND enabled
    // Corner should show if set AND not showing bleed (overridden by bleed)
    const bleedSetting = useSelector((state: RootState) =>
        state.layout.bleed);
    const cornerSetting = useSelector((state: RootState) =>
        state.layout.cornerRadius);
    const showBleed = isPrint && bleedSetting;
    const showCorner = !showBleed && cornerSetting;
    const layout = {
        bleed: showBleed ? `${bleedSetting}in` : '0in',
        cornerRadius: showCorner ? `${cornerSetting}in` : '0in',
    };

    const card = useSelector<RootState, Card>(selectCardAtIdx(cardIndex));
    const template = useSelector(selectFrontTemplate);
    const result = template({ ...card, layout });
    return (
        <Box
            sx={{
                width: `calc(2.5in + ${layout.bleed} * 2)`,
                height: `calc(3.5in + ${layout.bleed} * 2)`,
                breakInside: 'avoid',
                userSelect: 'none',
                borderRadius: layout.cornerRadius,
                overflow: 'hidden',
            }}
            dangerouslySetInnerHTML={{ __html: sanitize(result, { FORCE_BODY: true }) }}
        />
    );
}
