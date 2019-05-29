import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../screens/Login/Login'
import NotFound from '../screens/404/NotFound'

import Main from './Main'

export default class Layout extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/404" component={NotFound} />
                <Route component={Main} />
            </Switch>
        )
    }
}
