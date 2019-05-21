/**
 * 企服首页（企服管理）/企业详情
 */
import React, { PureComponent, Fragment } from 'react'
import { Tag, Breadcrumb, Card, Menu, Row, Col, Modal } from 'antd'
import { Link, NavLink, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../redux/companyDetails'
import moment from 'moment'
import styles from './CompanyDetails.module.css'
import { menuData } from './MenuData'
import routes from './MenuData'

import retime from '../../assets/retime.png'

const SubMenu = Menu.SubMenu

@connect(
    state => {
        return {
            BasicInfoDetial: state.companyDetails.BasicInfoDetial, //企业详情信息
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                queryBasicInfoDetial: actions('queryBasicInfoDetial'),
            },
            dispatch,
        )
    },
)
class CompanyDetails extends PureComponent {
    state = {
        // 路由Menu参数
        current: '',
        // modal对话框参数
        visible: false,
        //企业id
        company_id: '',
        //确定在哪页跳转的参数
        type: 'home',
    }
    //生命周期
    componentDidMount = () => {
        let company_id = this.props.match.params.company_id
        let type = this.props.match.params.type
        this.setState({ company_id, type })
        this.props.queryBasicInfoDetial(company_id)
    }
    //导航Menu点击回调
    handleClick = e => {
        console.log('click ', e.key)
        this.setState({ current: e.key })
        // 轮询-锚点跳转
        const uiInt = setInterval(() => {
            let element = document.getElementById(e.key)
            if (element) {
                clearInterval(uiInt)
                element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' })
            }
        }, 20)
    }
    //导航Menu的便利方法
    renderMenu = data => {
        const { company_id, type } = this.state
        return data.map((item, index) => {
            if (item.children) {
                return (
                    <SubMenu
                        key={index}
                        title={
                            <NavLink
                                exact
                                className={styles.SubMenuTitle}
                                to={`/companyDetails/${item.path}/${company_id}/${type}`}
                            >
                                {item.title}
                            </NavLink>
                        }
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={`${item.key}`}>
                        <NavLink to={`/companyDetails/${item.path}/${company_id}/${type}`}>
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
                )
            }
        })
    }
    // modal弹出/关闭方法
    showModal = () => {
        this.setState({ visible: true })
    }
    handleCancel = e => {
        this.setState({ visible: false })
    }

    render() {
        const item = this.props.BasicInfoDetial
        const d = new Date(item.updateTime)
        const times =
            d.getFullYear() +
            '-' +
            (d.getMonth() + 1) +
            '-' +
            d.getDate() +
            ' ' +
            d.getHours() +
            ':' +
            d.getMinutes() +
            ':' +
            d.getSeconds()
        const { type } = this.state
        return (
            <Fragment>
                <Breadcrumb className={styles.BreadcrumbSty}>
                    {type === 'home' ? (
                        <Breadcrumb.Item>
                            <Link to={`/home`}>企服首页</Link>
                        </Breadcrumb.Item>
                    ) : type === 'company' ? (
                        <Breadcrumb.Item>
                            <Link to={`/company`}>企服管理</Link>
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item>
                            <Link to={`/agency/companyRequire`}>中介服务</Link>
                        </Breadcrumb.Item>
                    )}
                    <Breadcrumb.Item>企业详情</Breadcrumb.Item>
                </Breadcrumb>

                <Card className={styles.cardSty} /* style={{ height: 150 }} */>
                    <div className={styles.flexDiv}>
                        <img
                            src={item.logo}
                            alt=""
                            style={{ width: 100, height: 100, marginTop: 20 }}
                        />
                        <div style={{ paddingLeft: 30, width: '80%' }}>
                            <h1 className={styles.modalTd}>{item.name}</h1>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <img
                                    src={retime}
                                    alt=""
                                    style={{ width: 14, height: 14, marginTop: 3 }}
                                />
                                <p style={{ padding: '0 10px' }}>
                                    更新时间：
                                    {moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}
                                </p>
                                <Tag color="#2db7f5" onClick={this.showModal}>
                                    发票抬头
                                </Tag>
                            </div>
                            <Row gutter={16} style={{ marginTop: 6 }}>
                                <Col span={7}>
                                    <div>法人：{item.legalPersonName}</div>
                                </Col>
                                <Col span={7}>
                                    <div>注册资金：{item.regCapital}</div>
                                </Col>
                                <Col span={7}>
                                    <div>
                                        成立时间：
                                        {moment(parseInt(item.estiblishTime)).format('YYYY-MM-DD')}
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 6 }}>
                                <Col span={7}>
                                    <div>邮箱：{item.email}</div>
                                </Col>
                                <Col span={7}>
                                    <div>联系电话：{item.phoneNumber}</div>
                                </Col>
                                <Col span={7}>
                                    <div>官网：{item.websiteList}</div>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 6 }}>
                                <Col span={16}>
                                    <div>企业地址：{item.regLocation}</div>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 6 }}>
                                <Col span={7}>
                                    <div>企服负责人：{item.directorName}</div>
                                </Col>
                                <Col span={7}>
                                    <div>跟踪状态：{item.regStatus}</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>
                <Modal
                    title="保存发票抬头"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width="600px"
                >
                    <table>
                        <tbody>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>企业名称：</td>
                                <td>{item.name}</td>
                            </tr>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>企业税号：</td>
                                <td>{item.creditCode}</td>
                            </tr>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>企业地址：</td>
                                <td>{item.regLocation}</td>
                            </tr>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>企业电话：</td>
                                <td>{item.phoneNumber}</td>
                            </tr>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>开户银行：</td>
                                <td>{item.depositBank}</td>
                            </tr>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>银行账户：</td>
                                <td>{item.bankAccount}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
                <Menu
                    style={{ margin: '20px 50px 0 50px' }}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    {this.renderMenu(menuData)}
                </Menu>

                <div style={{ flex: 1 }}>
                    {routes().map((item, index) => {
                        return (
                            <Route
                                exact
                                path={`/companyDetails/${item.path}/:company_id/:type`}
                                component={item.component}
                                key={index}
                            />
                        )
                    })}
                </div>
            </Fragment>
        )
    }
}
export default CompanyDetails
