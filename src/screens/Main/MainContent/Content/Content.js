import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import routers from "../../../../route/router";
import styles from "./Content.module.css";
import Footer from "../Footer/Footer";
export default class Content extends Component {
    render() {
        return (
            <Layout.Content className={styles.content}>
                {routers.map((item, index) => {
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
                <Footer />
            </Layout.Content>
        )
    }
}
