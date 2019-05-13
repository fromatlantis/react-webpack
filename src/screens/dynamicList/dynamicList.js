import React, { PureComponent } from 'react'
import { Pagination } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import styles from './DynamicList.module.css'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

class dynamicList extends PureComponent {
    gopush(nav) {
        this.props.push(nav)
    }
    render() {
        return (
            <div className={styles.Container}>
                <Breadcrumb className={styles.BreadcrumbSty}>
                    <Breadcrumb.Item>
                        <Link to={`/home`}>企服首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>企服动态</Breadcrumb.Item>
                </Breadcrumb>
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
