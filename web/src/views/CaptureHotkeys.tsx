import { ReactElement, useEffect } from 'react';

export interface Props {
    children: ReactElement,
    onPrintHotkey?: () => any,
}

export function CaptureHotkeys(props: Props) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'p' && (event.metaKey || event.ctrlKey)) {
                if (props.onPrintHotkey) {
                    event.preventDefault();
                    props.onPrintHotkey();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => { document.removeEventListener('keydown', handleKeyDown); };
    });

    return props.children;
}
