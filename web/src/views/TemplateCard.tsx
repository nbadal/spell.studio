import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { sanitize } from 'dompurify';
import { Card } from '../store/cards/types';
import { RootState } from '../store';
import {
    deleteCard, duplicateCard, selectCard, unselectCard,
} from '../store/cards';
import { selectCardAtIdx } from '../store/cards/selectors';
import { selectFrontTemplate } from '../store/template/selectors';
import { CardHoverButtons } from './CardHoverButtons';

interface Props {
    cardIndex: number;
}

export function TemplateCard(props: Props) {
    const dispatch = useDispatch();

    const [isHovering, setHovering] = useState(false);

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

    const onDeleteClicked = () => {
        dispatch(deleteCard(card));
    };

    const onCopyClicked = () => {
        dispatch(duplicateCard(card));
    };

    const template = useSelector(selectFrontTemplate);
    const result = template(card);

    return (
        <Box
            onMouseEnter={() => setHovering(true)}
            onMouseMove={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {isHovering && (
                <CardHoverButtons onDeleteClicked={onDeleteClicked} onCopyClicked={onCopyClicked} />
            )}
            <Box
                sx={{
                    width: '2.5in',
                    height: '3.5in',
                    margin: '8px',
                }}
                onClick={onClick}
                dangerouslySetInnerHTML={{ __html: sanitize(result, { FORCE_BODY: true }) }}
            />
        </Box>
    );
}
