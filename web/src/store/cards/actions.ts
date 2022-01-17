import { createAction } from '@reduxjs/toolkit';
import { Card } from './types';

export const addCards = createAction<Card[]>('addCards');
