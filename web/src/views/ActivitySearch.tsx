import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { createSelector } from '@reduxjs/toolkit';
import { notSelectedCards } from '../store/cards/selectors';
import { CardList } from './CardList';
import { selectCardUid } from '../store/cards';

export function ActivitySearch() {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const filteredCards = createSelector(
        [notSelectedCards, () => searchValue],
        (cards, search) => cards.filter(
            (card) => search === '' || card.title.toLowerCase().includes(search.toLowerCase()),
        ),
    );
    const cards = useSelector(filteredCards);
    const noResults = cards.length === 0 && searchValue !== '';
    return (
        <Box sx={{ width: '100%', height: '100%', padding: 1 }}>
            <TextField
                sx={{
                    padding: 1,
                    width: '100%',
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start"><Search /></InputAdornment>
                    ),
                }}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                variant="standard"
            />
            {!noResults && (
                <AutoSizer>
                    {(size) => (
                        <CardList
                            width={size.width}
                            height={size.height}
                            cards={cards}
                            onCardClicked={(uid) => dispatch(selectCardUid(uid))}
                        />
                    )}
                </AutoSizer>
            )}
            {noResults && (
                // eslint-disable-next-line react/jsx-one-expression-per-line
                <Box>No results found for &apos;{searchValue}&apos;</Box>
            )}
        </Box>
    );
}
