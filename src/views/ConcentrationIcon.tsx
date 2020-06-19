import React from "react";
import SvgIcon, {SvgIconProps} from "@material-ui/core/SvgIcon";

export function ConcentrationIcon(props?: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path
                d="M12-0.17l-9,12l9,12l9-12L12-0.17z M14.24,16.8c-0.18,0-1.21,0.19-2.18,0.19c-2.62,0-4.73-1.8-4.73-4.99
	c0-3.33,2.4-4.99,4.73-4.99c0.86,0,1.96,0.16,2.18,0.16c0.29,0,0.49-0.08,0.49-0.08l0.53,2.83l-0.41,0.12
	c-0.27-0.88-1.45-1.03-2.24-1.03c-1.43,0-2.74,0.88-2.74,3.01c0,2.14,1.41,2.91,2.79,2.91c1.17,0,1.93-0.26,2.24-1.19l0.43,0.12
	l-0.59,3.02C14.74,16.87,14.53,16.8,14.24,16.8z"
            />
        </SvgIcon>
    );
}
