import React from 'react';

import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { configureAppStore } from './store';

const appStore = configureAppStore();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <Provider store={appStore.store}>
        <PersistGate persistor={appStore.persistor}>
            <App />
        </PersistGate>
    </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
