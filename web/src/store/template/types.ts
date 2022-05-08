export type TemplateState = {
    selectedTemplate: 'standard';
    customTemplate?: CardTemplate;
};

export type CardTemplate = {
    frontHbs: string;
    backHbs: string;
    styleCss: string;
};
