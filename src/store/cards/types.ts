import { CardColor } from "../colors/types";
import { SpellClass } from "../spells/types";

export type CardsState = {
    selectedTitles: string[];
};

export type Card = {
    title: string;
    subtitle: string;
    stats: CardStat[];
    details: CardDetail[];
    color: CardColor;
    icon: CardIcon;
    backCharacter: string | number;
    backIconsSmall: string;
    backIconsLarge: string;
};

export type CardIcon = SpellClass;

export type CardDetail = {
    header?: string;
    text: string;
    expand?: boolean;
};

export type CardStat = {
    name: string;
    value: string;
    icon?: boolean;
};
