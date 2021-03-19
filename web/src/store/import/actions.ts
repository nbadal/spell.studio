import { createAction } from '@reduxjs/toolkit';
import { Card } from '../cards/types';

export const importCards = createAction<Card[]>('cardsImported');
export const importJSON = createAction<string>('importJSON');
