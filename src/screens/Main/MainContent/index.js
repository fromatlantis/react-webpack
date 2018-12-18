import React, { Component } from 'react'
import { Layout } from "antd";
import Header from "./Header/Connect";
import Content from "./Content/Content";

export default class MainContent extends Component {
    render() {
        return (
            <Layout>
                <Header></Header>
                <Content></Content>
            </Layout>
        )
    }
}

