import { createSelector } from '@reduxjs/toolkit';
import Handlebars from 'handlebars';
import { RootState } from '../index';
import { isList, isText } from '../cards/types';

const selectFrontHbs = (state: RootState) => state.template.frontHbs;
const selectBackHbs = (state: RootState) => state.template.backHbs;
export const selectStyleCss = (state: RootState) => state.template.styleCss;

const prepareFromHbs = (hbs: string) => {
    Handlebars.registerHelper('isTextDetail', isText);
    Handlebars.registerHelper('isListDetail', isList);
    Handlebars.registerHelper('processText', processText);
    return Handlebars.compile(hbs);
};

const processText = (text: string) => text;

export const selectFrontTemplate = createSelector([selectFrontHbs], prepareFromHbs);
export const selectBackTemplate = createSelector([selectBackHbs], prepareFromHbs);
