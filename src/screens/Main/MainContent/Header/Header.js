import React, { Component } from "react";
import { Layout, Icon, Avatar, Badge } from "antd";
import styles from "./Header.module.css";
import avatar from "assets/avatar.png";
export default class Header extends Component {
    render() {
        let { name } = this.props.user
        return (
            <Layout.Header className={styles.header}>
                <div className={styles.fold}>
                    <Icon type="menu-fold" theme="outlined" />
                </div>
                <div>
                    <Badge dot className={styles.bell}>
                        <Icon type="bell" theme="outlined" />
                    </Badge>
                    <Avatar src={avatar} size="user" />
                    <span className={styles.uname}>{name}</span>
                </div>
            </Layout.Header>
        );
    }
}
