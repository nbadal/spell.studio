import { createAction } from '@reduxjs/toolkit';
import { Card } from '../cards/types';

export const setImportedCards = createAction<Card[]>('setImportedCards');
export const importJSON = createAction<string>('importJSON');
