declare module "react-textfit" {
    import React, {Component} from "react";

    export interface TextfitProps {
        mode?: "single" | "multi",
        forceSingleModeWidth?: boolean,
        min?: number,
        max?: number,
        throttle?: number,
        onReady?: () => any,
        content?: React.ReactNode,
    }

    export default class Textfit extends Component<TextfitProps> {
    }
}
