import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import routes from "../../routes/routes";
import styles from "./Content.module.css";
import Footer from "../Footer/Footer";
export default class Content extends Component {
    render() {
        return (
            <Layout.Content className={styles.content}>
                <div className={styles.body}>
                    <Switch>
                        {routes().map((item, index) => {
                            return (
                                <Route
                                    exact
                                    //strict
                                    path={item.path}
                                    component={item.component}
                                    key={index}
                                />
                            );
                        })}
                        <Redirect exact path="/" to="/leaseApply" />
                        <Redirect to="/404" />
                    </Switch>
                </div>
                <Footer />
            </Layout.Content>
        )
    }
}
