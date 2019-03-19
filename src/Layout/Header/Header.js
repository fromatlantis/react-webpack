import React, { Component } from "react";
import { replace } from "connected-react-router";
import { Layout, Avatar, Popover, Button } from "antd";
import Navigation from '../Navigation/Navigation'
import styles from "./Header.module.css";
import hz from "assets/hz.png";
import mtou from "assets/mtou.png";
import { Link } from 'react-router-dom'
export default class Header extends Component {
    logout = () => {
        this.props.logout()
    }
    render() {
        let { name, account, photo } = this.props.user
        return (
            <Layout.Header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <Avatar shape="square" size="large" src={hz}/>
                        <span className={styles.title}>资产管理</span>
                    </div>
                    <Navigation />
                </div>
                <div className={styles.login} style={{ cursor: 'pointer' }}>
                    {
                        name && <Popover
                            trigger="click"
                            placement="bottomRight"
                            content={<span className={styles.linkBtn} onClick={this.logout} >退出登录</span>}
                            title={account} >
                            {photo===''?<Avatar src={mtou} size="user" />:<Avatar src={photo} size="user" />}
                            
                            <span className={styles.uname}>{name}</span>
                        </Popover>
                    }

                </div>
            </Layout.Header>
        );
    }
}
