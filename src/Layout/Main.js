import React, { Component } from 'react'
import styles from './Main.module.css'
// 中文语言处理
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

import { Layout } from 'antd'

import Header from './Header/Connect'
import Content from './Content/Content'
import { FullScreenLoading } from '../components'

import { connect } from 'react-redux'

import { actions } from 'reduxDir/authUser'

class Main extends Component {
    componentWillMount() {
        /**
         * 刷新页面redux数据会丢失
         * 用户信息不想放在storage
         * 如果session过期，userinfo接口不会返回401状态
         * 所以每次刷新页面需要重新获取用户信息
         */
        this.props.userInfo()
    }
    renderLayout = () => {
        let { user } = this.props
        if (user) {
            return (
                <Layout className={styles.container}>
                    <Header />
                    <Content auths={this.props.auths} />
                </Layout>
            )
        } else {
            // 获取用户信息前添加loading效果
            return <FullScreenLoading />
        }
    }
    render() {
        return <LocaleProvider locale={zh_CN}>{this.renderLayout()}</LocaleProvider>
    }
}

const mapStateToProps = state => {
    return {
        user: state.authUser.user,
        auths: state.authUser.auths,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        userInfo: () => dispatch(actions('getUserInfo')()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main)
