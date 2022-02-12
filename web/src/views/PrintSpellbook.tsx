import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { selectFilteredCards } from '../store/cards/selectors';
import { TemplateCard } from './TemplateCard';
import { selectStyleCss } from '../store/template/selectors';

export function PrintSpellbook() {
    const cards = useSelector(selectFilteredCards);
    const style = useSelector(selectStyleCss);

    return (
        <Box className="Spellbook">
            <style>{style}</style>
            {cards.map((card, index) => (
                <React.Fragment key={card.uid}>
                    <TemplateCard cardIndex={index} />
                </React.Fragment>
            ))}
        </Box>
    );
}
