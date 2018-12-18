import React, {Component} from "react";
import { Switch, Route } from "react-router-dom";
import 'moment/locale/zh-cn';
import Login from "../Login/Login";
import Main from '../Main/Main'

export default class Boot extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route component={Main}/>
            </Switch>
        )
    }
}


