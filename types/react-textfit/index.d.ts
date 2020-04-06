import React, {Component} from "react";

declare module "react-textfit"

export interface TextfitProps {
    mode?: "single" | "multi",
    forceSingleModeWidth?: boolean,
    min?: number,
    max?: number,
    throttle?: number,
    onReady?: () => any,
    content?: React.ReactNode,
}

export default class Textfit extends Component<TextfitProps> {}
