import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory } from 'history'
import * as serviceWorker from './serviceWorker'
// redux相关
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux'
// saga中间件：异步处理
import createSagaMiddleware from 'redux-saga'
// router中间件：router放入redux
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { watchFetchData } from './redux/saga'
// redux-logger
import { createLogger } from 'redux-logger'
// 页面入口
import Layout from './Layout/Layout'
// 样式
import './index.css'

const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger()
const history = createHashHistory()
const middleware = [sagaMiddleware, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
    // mockjs
    //require("./mock")
    middleware.push(loggerMiddleware)
}

export const store = createStore(rootReducer(history), applyMiddleware(...middleware))
sagaMiddleware.run(watchFetchData)
// render
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
