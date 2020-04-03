import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import './index.css';
import 'typeface-roboto';

import App from './App';
import * as serviceWorker from './serviceWorker';
import {configureAppStore} from "./store/store";
import {CssBaseline} from "@material-ui/core";

// import {processBTM} from "./scripts/btm-processing";
// processBTM();

const store = configureAppStore();

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <CssBaseline/>
            <App/>
        </React.Fragment>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
