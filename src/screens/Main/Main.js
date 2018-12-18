import React, {Component} from "react";
import styles from "./Main.module.css";
// 中文语言处理
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { Layout } from "antd";
import NavMenu from "./NavMenu/NavMenu";
import MainContent from "./MainContent";

import { connect } from 'react-redux'

import {
    userInfo
} from 'reduxDir/authUser';

const { Sider } = Layout;
class Home extends Component {
    componentWillMount() {
        this.props.userInfo();
    }


    render() {
        // 方案1: 在此处无用户信息了redirect到login页面

        // 方案2: response状态吗401了，在axios response拦截器中重定向到login页面
        
        // 关于用户的权限信息这些带有数据结构的放在，redux便于管理，sessionstorage存放sessionId这些记住密码的东西
        
        return (
            <LocaleProvider locale={zh_CN}>
                <Layout className={styles.container}>
                    <Sider className={styles.sider}>
                        <NavMenu />
                    </Sider>
                    <MainContent />
                </Layout>
            </LocaleProvider>
        )
    }
}  

const mapStateToProps = state => {
    
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
        userInfo: () => dispatch(userInfo())
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)