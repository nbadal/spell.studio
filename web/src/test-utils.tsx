import React, { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PreloadedState } from '@reduxjs/toolkit';
import { configureAppStore, RootState } from './store';

function render(
    ui: ReactElement,
    preloadedState?: PreloadedState<RootState>,
    {
        store = configureAppStore(preloadedState),
        ...renderOptions
    } = {},
) {
    function Wrapper(props: { children: ReactElement }) {
        return <Provider store={store.store}>{props.children}</Provider>;
    }

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
