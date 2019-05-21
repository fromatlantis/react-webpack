import React, { Component } from 'react'

import { Layout, Avatar, Popover } from 'antd'
import Navigation from '../Navigation/Navigation'
import styles from './Header.module.css'
import hz from 'assets/hz.png'
import mtou from 'assets/mtou.png'

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
                        <Avatar shape="square" size="large" src={hz} />
                        <span className={styles.title}>企业服务</span>
                    </div>
                    <Navigation auths={this.props.auths} />
                </div>
                <div className={styles.login} style={{ cursor: 'pointer' }}>
                    {name && (
                        <div
                            onClick={() => {
                                window.location.href = '/portal/#/personal/profile'
                            }}
                        >
                            {photo === null ? (
                                <Avatar src={mtou} size="user" />
                            ) : (
                                <Avatar src={photo} size="user" />
                            )}

                            <span className={styles.uname}>{name}</span>
                        </div>
                    )}
                </div>
            </Layout.Header>
        )
    }
}
