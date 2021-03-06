import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';
import {Provider} from "react-redux";
import store from './store';
//import createHistory from 'history/createBrowserHistory';

WebFont.load({
    google: {
        families: ['Lato:300,300i,400,400i,700,700i']
    }
});

//const history = createHistory();

ReactDOM.render(
    <Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
