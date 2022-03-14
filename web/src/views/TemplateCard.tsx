import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { sanitize } from 'dompurify';
import { Card } from '../store/cards/types';
import { RootState } from '../store';
import { selectCard, unselectCard } from '../store/cards';
import { selectCardAtIdx } from '../store/cards/selectors';
import { selectFrontTemplate } from '../store/template/selectors';

interface Props {
    cardIndex: number;
}

export function TemplateCard(props: Props) {
    const dispatch = useDispatch();

    const card = useSelector<RootState, Card>(selectCardAtIdx(props.cardIndex));
    const selected = useSelector<RootState, boolean>(
        (state) => state.cards.selectedUids.includes(card.uid),
    );

    const onClick = () => {
        if (selected) {
            dispatch(unselectCard(card));
        } else {
            dispatch(selectCard(card));
        }
    };

    const template = useSelector(selectFrontTemplate);
    const result = template(card);

    return (
        <Box
            className="CardContainer"
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html: sanitize(result, { FORCE_BODY: true }) }}
        />
    );
}
