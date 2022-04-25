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

    return (
        <div className="Spellbook">
            <style>{style}</style>
            {cards.map((card, index) => (
                <Box
                    key={card.uid}
                    sx={{
                        display: 'inline-block',
                        margin: '0px', // TODO: from layout settings
                    }}
                >
                    <TemplateCard cardIndex={index} />
                </Box>
            ))}
        </div>
    );
}
