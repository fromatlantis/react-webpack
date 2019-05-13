import React, { PureComponent } from 'react'
import {} from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import styles from './HumanResourceService.module.css'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

const routes1 = [
    {
        path: '/home',
        breadcrumbName: '企服首页',
    },
    {
        breadcrumbName: '知识产权',
    },
]
const routes2 = [
    {
        path: '/home',
        breadcrumbName: '企服首页',
    },
    {
        breadcrumbName: '代理记账',
    },
]
const routes3 = [
    {
        path: '/home',
        breadcrumbName: '企服首页',
    },
    {
        breadcrumbName: '法律服务',
    },
]
const routes4 = [
    {
        path: '/home',
        breadcrumbName: '企服首页',
    },
    {
        breadcrumbName: '人资服务',
    },
]
const items4 = [
    {
        title: '代缴社保',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
    {
        title: '人才招聘',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
    {
        title: '人力咨询',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
]
const items3 = [
    {
        title: '法律咨询',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
    {
        title: '合同服务',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
    {
        title: '法律顾问',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
]
const items2 = [
    {
        title: '代理记账',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
    {
        title: '税务代办',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
    {
        title: '财务审计',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
]
const items1 = [
    {
        title: '商标注册',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
    {
        title: '专利申请',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
    {
        title: '软著申请',
        about: '0元代理费，高效递交申请，随时查看状态',
        money: '¥998',
    },
]
class HumanResourceService extends PureComponent {
    gopush(nav) {
        this.props.push(nav)
    }
    showitems(items) {
        let item = []
        for (let i in items) {
            item.push(
                <div className={styles.item} key={i}>
                    <div className={styles.name}>
                        <h1>{items[i].title}</h1>
                        <p>{items[i].about}</p>
                    </div>
                    <div className={styles.name}>
                        <p className={styles.money}>{items[i].money}</p>
                    </div>
                    <div className={styles.name}>
                        <p
                            className={styles.lookAbout}
                            onClick={() =>
                                this.gopush(
                                    '/IntermediaryDetails/' +
                                        (i - -1) +
                                        '/' +
                                        this.props.match.params.id,
                                )
                            }
                        >
                            查看详情
                        </p>
                    </div>
                </div>,
            )
        }
        return item
    }
    show(routes) {
        let items = []
        for (let i in routes) {
            if (routes[i].path) {
                items.push(
                    <Breadcrumb.Item>
                        <Link to={routes[i].path}>{routes[i].breadcrumbName}</Link>
                    </Breadcrumb.Item>,
                )
            } else {
                items.push(<Breadcrumb.Item>{routes[i].breadcrumbName}</Breadcrumb.Item>)
            }
        }

        return <Breadcrumb className={styles.BreadcrumbSty}>{items}</Breadcrumb>
    }
    render() {
        let id = this.props.match.params.id
        let routes = []
        let items = []
        if (id === '4') {
            routes = routes4
            items = items4
        } else if (id === '3') {
            routes = routes3
            items = items3
        } else if (id === '2') {
            routes = routes2
            items = items2
        } else if (id === '1') {
            routes = routes1
            items = items1
        }
        return (
            <div className={styles.Container}>
                {this.show(routes)}
                {this.showitems(items)}
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
)(HumanResourceService)
