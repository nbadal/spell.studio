import { CardColor } from '../colors/types';
import { SpellClass } from '../spells/types';

export type CardsState = {
    selectedUids: string[];
};

export type Card = {
    uid: string;
    title: string;
    subtitle: string;
    stats: CardStat[];
    details: CardDetail[];
    category: string;
    color: CardColor;
    icon: CardIcon;
    backCharacter: string | number;
    backIconsSmall: string;
    backIconsLarge: string;
};

export type CardIcon = SpellClass;

export type CardDetail = (CardTextDetail | CardListDetail) & { type: 'text' | 'list' };

export function isText(detail: CardDetail): detail is CardTextDetail {
    return detail.type === 'text';
}

export function isList(detail: CardDetail): detail is CardListDetail {
    return detail.type === 'list';
}

export type CardTextDetail = {
    type: 'text',
    header?: string;
    text: string;
    expand?: boolean;
};

export type CardListDetail = {
    type: 'list',
    items: string[];
    expand?: boolean;
}

export type CardStat = {
    name: string;
    value: string;
    icon?: boolean;
};
