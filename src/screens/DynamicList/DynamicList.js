import React, { PureComponent } from 'react'
import { Pagination, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import styles from './dynamicList.module.css'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import request from '../../utils/request'

class dynamicList extends PureComponent {
    constructor() {
        super()
        this.state = {
            RecentNews: [],
            pageNo: 1,
            totalCount: 0,
        }
    }
    gopush(uri) {
        // this.props.push(nav)
        window.open(uri)
    }
    componentDidMount() {
        this.getRecentNews()
    }
    async getRecentNews() {
        var result = await request({
            type: 'post',
            url: '/enterprise/getRecentNews',
            data: {
                pageNo: this.state.pageNo,
                pageSize: 10,
            },
            contentType: 'multipart/form-data',
        })
        if (result.code === 1000) {
            this.setState({
                RecentNews: result.data.resultList,
                totalCount: result.data.totalCount,
            })
        } else {
            message.info(result.message)
        }
    }
    showRecentNews() {
        let { RecentNews } = this.state
        let item = []
        for (let i in RecentNews) {
            item.push(
                <div className={styles.dynamic} onClick={() => this.gopush(RecentNews[i].url)}>
                    <p className={styles.dynamicTitle}>{RecentNews[i].title}</p>
                    <div className={styles.dynamicDescribe}>
                        <span className={styles.dynamicCome}>来源：{RecentNews[i].website}</span>
                        <span className={styles.dynamicTime}>{RecentNews[i].time}</span>
                    </div>
                </div>,
            )
        }
        return item
    }
    pageOnChange(page, pageSize) {
        this.setState({
            pageNo: page,
        })
        let that = this
        setTimeout(() => {
            that.getRecentNews()
        }, 0)
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
                <div className={styles.dynamics}>{this.showRecentNews()}</div>
                <div className={styles.end}>
                    <Pagination
                        defaultCurrent={1}
                        total={this.state.totalCount}
                        hideOnSinglePage={true}
                        onChange={(page, pageSize) => this.pageOnChange(page, pageSize)}
                    />
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
