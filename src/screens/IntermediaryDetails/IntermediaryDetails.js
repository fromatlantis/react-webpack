import React, { PureComponent } from 'react'
import { Icon, Button, message } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import styles from './IntermediaryDetails.module.css'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import request from '../../utils/request'
import { actions } from '../../redux/intermediary'

class IntermediaryDetails extends PureComponent {
    constructor() {
        super()
        this.state = {
            num: 1,
            pid: {},
            pidType: {},
        }
    }
    componentDidMount() {
        if (this.props.intermediarys.intermediary && this.props.intermediarys.intermediary.length) {
        } else {
            this.props.getServiceTypeList()
        }
    }
    async addDemand(pid) {
        var result = await request({
            type: 'post',
            url: '/enterprise/addDemand',
            contentType: 'multipart/form-data',
            data: {
                category: this.props.match.params.id,
                item: this.state.num,
                companyType: this.props.user.user.type,
                enterpriseName: this.props.user.user.company_name,
                email: this.props.user.user.email,
                address: '',
                contract: this.props.user.user.name,
                telephone: this.props.user.user.phone,
                amount: (this.state.num - 0) * (pid.price - 0),
            },
        })

        if (result.code === 1000) {
            message.success('成功')
        } else {
            message.error(result.message)
        }
    }
    getDemandList() {
        this.props.getDemandList({
            pageSize: 1,
            pageNo: 1,
        })
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

        let { intermediary } = this.props.intermediarys
        let pid = {}
        let pidType = {}
        for (let i in intermediary) {
            if (intermediary[i].id === id) {
                pid = intermediary[i]
            }
            if (intermediary[i].id === type) {
                pidType = intermediary[i]
            }
        }
        let routes = [
            {
                path: '/home',
                breadcrumbName: '企服首页',
            },
            {
                path: '/humanResourceService/' + pidType.id,
                breadcrumbName: pidType.typeName,
            },
            {
                breadcrumbName: '详情',
            },
        ]
        return (
            <div className={styles.Container}>
                {this.show(routes)}
                <div className={styles.Content}>
                    <div className={styles.imgView}>
                        <img src={pid.logo} alt="" />
                    </div>
                    <div className={styles.details}>
                        <h1>{pid.typeName}</h1>
                        <p className={styles.about}>{pid.description}</p>
                        <div className={styles.moneyView}>
                            <p className={styles.money}>
                                价 格: <span>¥{pid.price}</span>
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
                        <Button
                            type="primary"
                            className={styles.yes}
                            onClick={() => this.addDemand(pid)}
                        >
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
        intermediarys: state.intermediary,
        user: state.authUser,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            push: push,
            addDemand: actions('addDemand'),
            getDemandList: actions('getDemandList'),
            getServiceTypeList: actions('getServiceTypeList'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IntermediaryDetails)
