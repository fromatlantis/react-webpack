import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Boot } from "./screens";
import * as serviceWorker from "./serviceWorker";
// redux相关
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux";
// saga异步处理
import createSagaMiddleware from "redux-saga";
import { watchFetchData } from "./redux/saga";
// redux-logger
import { createLogger } from 'redux-logger';

// mockjs
import "./mock";
// 样式
import "./index.css";

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();
const middleware = [sagaMiddleware, loggerMiddleware];

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);
sagaMiddleware.run(watchFetchData);

// render
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Boot />
        </Router>
    </Provider>,
    document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
