import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../screens/Login/Login'
import Exception from '../screens/Exception/Exception'

import Main from './Main'

export default class Layout extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/404" component={() => <Exception statusCode="404" />} />
                <Route path="/500" component={() => <Exception statusCode="500" />} />
                <Route component={Main} />
            </Switch>
        )
    }
}
