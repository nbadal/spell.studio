declare module 'react-textfit' {
    import React, { Component } from 'react';

    export interface TextfitProps {
        mode?: 'single' | 'multi';
        forceSingleModeWidth?: boolean;
        min?: number;
        max?: number;
        throttle?: number;
        onReady?: () => unknown;
        content?: React.ReactNode;
    }

    // eslint-disable-next-line react/prefer-stateless-function
    export default class Textfit extends Component<TextfitProps> {
    }
}
