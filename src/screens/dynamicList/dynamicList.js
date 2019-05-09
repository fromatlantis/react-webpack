import React, { PureComponent } from 'react'
import { Pagination } from 'antd'
import { Crumbs } from '../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import styles from './dynamicList.module.css'

const routes = [
    {
        path: '/home',
        breadcrumbName: '企服首页',
    },
    {
        path: '/dynamicList',
        breadcrumbName: '企服动态',
    },
]
class dynamicList extends PureComponent {
    gopush(nav) {
        this.props.push(nav)
    }
    render() {
        return (
            <div className={styles.Container}>
                <Crumbs routes={routes} />

                <div className={styles.dynamics}>
                    <div className={styles.dynamic} onClick={() => this.gopush('dynamicDetails/1')}>
                        <p className={styles.dynamicTitle}>题目</p>
                        <div className={styles.dynamicDescribe}>
                            <span className={styles.dynamicCome}>来源：来源</span>
                            <span className={styles.dynamicTime}>时间</span>
                        </div>
                    </div>
                    <div className={styles.dynamic} onClick={() => this.gopush('dynamicDetails/1')}>
                        <p className={styles.dynamicTitle}>
                            题目题目题目题目题目题目题目题目题目题目
                        </p>
                        <p className={styles.dynamicAbout}>一段描述，</p>
                        <div className={styles.dynamicDescribe}>
                            <span className={styles.dynamicCome}>来源：数据来源数据来源</span>
                            <span className={styles.dynamicTime}>时间</span>
                        </div>
                    </div>
                    <div className={styles.dynamic} onClick={() => this.gopush('dynamicDetails/1')}>
                        <p className={styles.dynamicTitle}>
                            题目题目题目题目题目题目题目题目题目题目
                        </p>
                        <div className={styles.dynamicDescribe}>
                            <span className={styles.dynamicCome}>来源：数据来源数据来源</span>
                            <span className={styles.dynamicTime}>时间</span>
                        </div>
                    </div>
                    <div className={styles.dynamic} onClick={() => this.gopush('dynamicDetails/1')}>
                        <p className={styles.dynamicTitle}>题目</p>
                        <p className={styles.dynamicAbout}>
                            1、展示爬取到的园区企业的新闻（存放在企服管理的基本信息的企业动态中），按照时间顺序倒序排列；
                        </p>
                        <div className={styles.dynamicDescribe}>
                            <span className={styles.dynamicCome}>来源：数据来源数据来源</span>
                            <span className={styles.dynamicTime}>时间</span>
                        </div>
                    </div>
                    <div className={styles.dynamic} onClick={() => this.gopush('dynamicDetails/1')}>
                        <p className={styles.dynamicTitle}>
                            题目很长很长很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长
                        </p>
                        <p className={styles.dynamicAbout}>
                            1、展示爬取到的园区企业的新闻（存放在企服管理的基本信息的企业动态中），按照时间顺序倒序排列；
                        </p>
                        <div className={styles.dynamicDescribe}>
                            <span className={styles.dynamicCome}>来源：数据来源数据来源</span>
                            <span className={styles.dynamicTime}>时间</span>
                        </div>
                    </div>
                    <div className={styles.dynamic} onClick={() => this.gopush('dynamicDetails/1')}>
                        <p className={styles.dynamicTitle}>题目</p>
                        <p className={styles.dynamicAbout}>
                            1、展示爬取到的园区企业的新闻（存放在企服管理的基本信息的企业动态中），按照时间顺序倒序排列；
                        </p>
                        <div className={styles.dynamicDescribe}>
                            <span className={styles.dynamicCome}>来源：来源</span>
                            <span className={styles.dynamicTime}>时间</span>
                        </div>
                    </div>
                </div>
                <div className={styles.end}>
                    <Pagination defaultCurrent={1} total={50} hideOnSinglePage={true} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        router: state.router,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            push: push,
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(dynamicList)
