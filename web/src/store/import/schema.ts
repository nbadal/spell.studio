import Ajv, { JSONSchemaType, Schema } from 'ajv';

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
