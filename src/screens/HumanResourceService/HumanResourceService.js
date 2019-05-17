import React, { PureComponent } from 'react'
import {} from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import styles from './humanResourceService.module.css'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { actions } from '../../redux/intermediary'

const routes1 = [
    {
        path: '/home',
        breadcrumbName: '企服首页',
    },
    {
        breadcrumbName: '知识产权',
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
    componentDidMount() {
        if (this.props.intermediarys.intermediary && this.props.intermediarys.intermediary.length) {
        } else {
            this.props.getServiceTypeList()
        }
    }
    showitems(items) {
        let item = []
        for (let i in items) {
            item.push(
                <div className={styles.item} key={i}>
                    <img className={styles.serviceImg} src={items[i].logo} alt="" />
                    <div className={styles.name}>
                        <h1>{items[i].typeName}</h1>
                        <p>{items[i].description}</p>
                    </div>
                    <div className={styles.name}>
                        <p className={styles.money}>¥{items[i].price}</p>
                    </div>
                    <div className={styles.name}>
                        <p
                            className={styles.lookAbout}
                            onClick={() =>
                                this.gopush(
                                    '/IntermediaryDetails/' +
                                        items[i].id +
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
        let { intermediary } = this.props.intermediarys
        let id = this.props.match.params.id
        let pids = []
        let pid = {}
        for (let i in intermediary) {
            if (intermediary[i].pid === id) {
                pids.push(intermediary[i])
            }
            if (intermediary[i].id === id) {
                pid = intermediary[i]
            }
        }
        let routes = [
            {
                path: '/home',
                breadcrumbName: '企服首页',
            },
            {
                breadcrumbName: pid.typeName,
            },
        ]

        return (
            <div className={styles.Container}>
                {this.show(routes)}
                {this.showitems(pids)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        router: state.router,
        intermediarys: state.intermediary,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            push: push,
            getServiceTypeList: actions('getServiceTypeList'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HumanResourceService)
