import React, { Component } from "react";
import { replace } from "connected-react-router";
import { Layout, Avatar, Popover, Button } from "antd";
import Navigation from '../Navigation/Navigation'
import styles from "./Header.module.css";
import avatar from "assets/avatar.png";
import { Link } from 'react-router-dom'
export default class Header extends Component {
    logout = () => {
        this.props.logout()
    }
    render() {
        let { name, account, photo } = this.props.user
        return (
            <Layout.Header className={styles.header}>
                <div style={{ display: 'flex', alignItems:'center' }}>
                    <div>
                        <Avatar shape="square" size="large" />
                        <span className={styles.title}>资产管理</span>
                    </div>
                    <Navigation />
                </div>
                <div className={styles.login} style={{cursor:'pointer'}}>
                    {
                    name ? <Popover
                        trigger="click"
                        placement="bottomRight"
                        content={<span className={styles.linkBtn} onClick={this.logout} >退出登录</span>}
                        title={account} >
                            <Avatar src={photo} size="user" />
                            <span className={styles.uname}>{name}</span>
                    </Popover> 
                    :
                    <Link to='/login'>
                        <Button type="primary">登录 | 注册</Button>
                    </Link>
                    }

                </div> 
            </Layout.Header>
        );
    }
}
