import Ajv, { JSONSchemaType, Schema } from 'ajv';
import {
    Card, CardDetail, CardStat, isText,
} from '../cards/types';
import { getGameIcon } from '../spells/convert';

const ajv = new Ajv();

const rpgCardDefs: Schema = {
    $id: 'https://spell.studio/schemas/rpgcard/defs.json',
    definitions: {
        card: {
            type: 'object',
            properties: {
                count: { type: 'integer' },
                color: { type: 'string' },
                title: { type: 'string' },
                icon: { type: 'string' },
                icon_back: { type: 'string' },
                background_image: { type: 'string' },
                contents: { type: 'array', items: { type: 'string' } },
                tags: { type: 'array', items: { type: 'string' } },
            },
            required: ['count', 'color', 'title', 'icon', 'contents', 'tags'],
        } as JSONSchemaType<RpgCard>,
    },
};
ajv.addSchema(rpgCardDefs);

const rpgCardSchema: Schema = {
    $id: 'https://spell.studio/schemas/rpgcard/card.json',
    $ref: 'defs.json#/definitions/card',
};

const rpgCardListSchema: Schema = {
    $id: 'https://spell.studio/schemas/rpgcard/list.json',
    type: 'array',
    items: { $ref: 'defs.json#/definitions/card' },
};

/* eslint-disable camelcase */
export type RpgCard = {
    count: number,
    color: string,
    title: string,
    icon: string,
    icon_back: string | null,
    background_image: string | null,
    contents: string[],
    tags: string[],
}
/* eslint-enable camelcase */

export const validateRpgCard = ajv.compile<RpgCard>(rpgCardSchema);

export const validateRpgCardList = ajv.compile<RpgCard[]>(rpgCardListSchema);

export const convertRpgCard = (rpgCard: RpgCard): Card => {
    let subtitle = '';
    const stats: {[id: string]: CardStat} = {};
    const details: CardDetail[] = [];

    let sectionTitle: string | undefined;
    rpgCard.contents.forEach((contentStr) => {
        const parts = contentStr.split('|').map((s) => s.trim());

        /* eslint-disable prefer-destructuring */
        switch (parts[0]) {
            case 'subtitle':
                subtitle = parts[1];
                break;
            case 'property':
                stats[parts[1]] = { name: parts[1], value: parts[2] };
                break;
            case 'section':
                sectionTitle = parts[1];
                break;
            case 'text':
                details.push({
                    header: sectionTitle,
                    type: 'text',
                    text: parts[1],
                });
                // We only need to use the section title once
                if (sectionTitle) sectionTitle = undefined;
                break;
            case 'description':
                details.push({
                    type: 'text',
                    text: `***${parts[1]}.*** ${parts[2]}`,
                });
                break;
            case 'rule':
            case 'ruler':
            case 'boxes':
            case 'dndstats':
            case 'center':
            case 'justify':
            case 'bullet':
            case 'fill':
            case 'disabled':
            case 'picture':
            case 'icon':
            default:
                // STUB. Unhandled.
                break;
        }
        /* eslint-enable prefer-destructuring */
    });

    // Replace bold / italic HTML tags
    details.filter(isText).forEach((detail) => {
        detail.text = detail.text.replaceAll(/<\/?b>/g, '***');
        detail.text = detail.text.replaceAll(/<\/?i>/g, '*');
    });

    if (details.length > 0) {
        details[details.length - 1].expand = true;
    } else {
        throw new Error('Details are required for a card.');
    }

    const rpgIcon = getGameIcon(rpgCard.icon_back || '');
    return {
        uid: Math.random().toString(36),
        title: rpgCard.title,
        color: rpgCard.color,
        stats,
        subtitle,
        details,
        backIconsSmall: rpgIcon,
        backIconsLarge: rpgIcon,
        iconCharacter: rpgIcon,
        // TODO: how to support these?
        backCharacter: subtitle.substring(0, 1),
        category: 'TODO',
    };
};

export const convertRpgCards = (rpgCards: RpgCard[]): Card[] => rpgCards.map(convertRpgCard);
