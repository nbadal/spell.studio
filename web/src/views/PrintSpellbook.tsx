import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { RootState } from '../store';
import { selectFilteredCards } from '../store/cards/selectors';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';

export function PrintSpellbook() {
    const cards = useSelector(selectFilteredCards);
    const showCard = useSelector((state: RootState) => state.layout.showFront);
    const showBack = useSelector((state: RootState) => state.layout.showBack);

    return (
        <Box className="Spellbook">
            {cards.map((card, index) => (
                <React.Fragment key={card.uid}>
                    {showCard && <CardFront cardIndex={index} />}
                    {showBack && <CardBack spellIndex={index} />}
                </React.Fragment>
            ))}
        </Box>
    );
}
