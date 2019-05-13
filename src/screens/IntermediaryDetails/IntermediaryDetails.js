import React, { PureComponent } from 'react'
import { Icon, Button } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import styles from './IntermediaryDetails.module.css'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import banner from '../../assets/banner.png'

const routes1 = [
    {
        path: '/home',
        breadcrumbName: '企服首页',
    },
    {
        path: '/humanResourceService/1',
        breadcrumbName: '知识产权',
    },
]
const routes2 = [
    {
        path: '/home',
        breadcrumbName: '企服首页',
    },
    {
        path: '/humanResourceService/2',
        breadcrumbName: '代理记账',
    },
]
const routes3 = [
    {
        path: '/home',
        breadcrumbName: '企服首页',
    },
    {
        path: '/humanResourceService/3',
        breadcrumbName: '法律服务',
    },
]
const routes4 = [
    {
        path: '/home',
        breadcrumbName: '企服首页',
    },
    {
        path: '/humanResourceService/4',
        breadcrumbName: '人资服务',
    },
]

class IntermediaryDetails extends PureComponent {
    constructor() {
        super()
        this.state = {
            num: 1,
        }
    }
    setnum(num) {
        let that = this
        let newnum = that.state.num
        if (num) {
            newnum = newnum + 1
            this.setState({
                num: newnum,
            })
        } else {
            if (newnum > 1) {
                newnum = newnum - 1
                this.setState({
                    num: newnum,
                })
            }
        }
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
        let type = this.props.match.params.type
        let id = this.props.match.params.id
        let routes = []
        let routeIne = [
            {
                breadcrumbName: '详情',
            },
        ]
        if (type === '4') {
            routes = [...routes4, ...routeIne]
        } else if (type === '3') {
            routes = [...routes3, ...routeIne]
        } else if (type === '2') {
            routes = [...routes2, ...routeIne]
        } else if (type === '1') {
            routes = [...routes1, ...routeIne]
        }
        return (
            <div className={styles.Container}>
                {this.show(routes)}
                <div className={styles.Content}>
                    <div className={styles.imgView}>
                        <img src={banner} alt="" />
                    </div>
                    <div className={styles.details}>
                        <h1>法律咨询服务</h1>
                        <p className={styles.about}>资深法律律师，法律条文不用愁</p>
                        <div className={styles.moneyView}>
                            <p className={styles.money}>
                                价 格: <span>¥998</span>
                            </p>
                        </div>
                        <div className={styles.numView}>
                            <p className={styles.numTitle}>数量</p>
                            <Icon
                                style={{ fontSize: '24px' }}
                                type="plus-circle"
                                theme="filled"
                                onClick={() => this.setnum(1)}
                            />
                            <p>{this.state.num}</p>
                            <Icon
                                style={{ fontSize: '24px' }}
                                type="minus-circle"
                                theme="filled"
                                onClick={() => this.setnum(0)}
                            />
                        </div>
                        <Button type="primary" className={styles.yes}>
                            立即下单
                        </Button>
                    </div>
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
)(IntermediaryDetails)
