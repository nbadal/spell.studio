import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { selectFilteredCards } from '../store/cards/selectors';
import { TemplateCard } from './TemplateCard';
import { selectStyleCss } from '../store/template/selectors';

export function PrintSpellbook() {
    const cards = useSelector(selectFilteredCards);
    const style = useSelector(selectStyleCss);

    useEffect(() => {
        setTimeout(() => {
            window.print();
            window.close();
        }, 100);
    });

    const gutter = '0.1in'; // TODO: Use layout state

    return (
        <div>
            <style>{style}</style>
            {cards.map((card, index) => (
                <Box
                    key={card.uid}
                    sx={{
                        display: 'inline-block',
                        margin: `calc(${gutter} / 2)`,
                    }}
                >
                    <TemplateCard isPrint cardIndex={index} />
                </Box>
            ))}
        </div>
    );
}
