import { createSelector } from '@reduxjs/toolkit';
import Handlebars from 'handlebars';
import { RootState } from '../index';
import { isList, isText } from '../cards/types';
import { standardTemplate } from '../../templates';

const selectTemplate = (state: RootState) => {
    if (state.template.customTemplate) return state.template.customTemplate;
    switch (state.template.selectedTemplate) {
        case 'standard':
        default:
            return standardTemplate;
    }
};

const selectFrontHbs = createSelector([selectTemplate], (t) => t.frontHbs);
const selectBackHbs = createSelector([selectTemplate], (t) => t.backHbs);
export const selectStyleCss = createSelector([selectTemplate], (t) => t.styleCss);

const prepareFromHbs = (hbs: string) => {
    Handlebars.registerHelper('isTextDetail', isText);
    Handlebars.registerHelper('isListDetail', isList);
    Handlebars.registerHelper('processText', processText);
    Handlebars.registerHelper('isEqual', (a, b) => a === b);
    Handlebars.registerHelper('times', (n, block) => {
        let accum = '';
        for (let i = 0; i < n; i += 1) accum += block.fn(i);
        return accum;
    });
    return Handlebars.compile(hbs);
};

const processText = (text: string) => text.split('***').map((value, index) => {
    if (index % 2) {
        // Odd indexes are within ***'s
        return `<span class="BoldDetail">${value}</span>`;
    }
    return value.split('*').map((value2, index2) => {
        if (index2 % 2) {
            // Odd indexes are within *'s
            return `<span class="ItalicDetail">${value2}</span>`;
        }
        return value2;
    }).join('');
}).join('');

export const selectFrontTemplate = createSelector([selectFrontHbs], prepareFromHbs);
export const selectBackTemplate = createSelector([selectBackHbs], prepareFromHbs);
