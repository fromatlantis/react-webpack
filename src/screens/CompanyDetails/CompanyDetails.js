/**
 * 企服首页（企服管理）/企业详情
 */
import React, { PureComponent, Fragment } from 'react'
import {
    Avatar,
    Tag,
    Breadcrumb,
    Divider,
    Menu,
    Row,
    Col,
    Modal,
    BackTop,
    Descriptions,
} from 'antd'
import { Link, NavLink, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/companyDetails'

import moment from 'moment'
import styles from './CompanyDetails.module.css'
import { menuData } from './MenuData'
import routes from './MenuData'
import { IconFont } from 'components'

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
        current: '0',
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
        this.setState({ current: e.key })
        // 轮询-锚点跳转--功能不完善
        // const uiInt = setInterval(() => {
        //     let element = document.getElementById(e.key)
        //     if (element) {
        //         clearInterval(uiInt)
        //         element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' })
        //     }
        // }, 20)
    }
    //导航Menu的便利方法
    renderMenu = data => {
        const { company_id, type } = this.state
        return data.map((item, index) => {
            return (
                <Menu.Item key={index}>
                    <NavLink to={`/companyDetails/${item.path}/${company_id}/${type}`}>
                        <span>{item.title}</span>
                    </NavLink>
                </Menu.Item>
            )
            // if (item.children) {
            //     return (
            //         <SubMenu
            //             key={index}
            //             title={
            //                 <NavLink
            //                     exact
            //                     className={styles.SubMenuTitle}
            //                     to={`/companyDetails/${item.path}/${company_id}/${type}`}
            //                 >
            //                     {item.title}
            //                 </NavLink>
            //             }
            //         >
            //             {this.renderMenu(item.children)}
            //         </SubMenu>
            //     )
            // } else {
            //     return (
            //         <Menu.Item key={`${item.key}`}>
            //             <NavLink to={`/companyDetails/${item.path}/${company_id}/${type}`}>
            //                 <span>{item.title}</span>
            //             </NavLink>
            //         </Menu.Item>
            //     )
            // }
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
        const { type } = this.state
        let qualification = [],
            industry = []
        if (item.companyLabels) {
            qualification = item.companyLabels.filter(item => item.type === 'qualification')
            industry = item.companyLabels.filter(item => item.type === 'industry')
        }
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
                <div className={styles.infoCard}>
                    <div style={{ position: 'relative' }}>
                        <Avatar className={styles.avatar} src={item.logo} shape="square">
                            {item.name && item.name.substring(0, 4)}
                        </Avatar>
                        <div className={styles.levelChip}>
                            <div>实驻企业</div>
                            <div className={styles.level}>{item.companyLevel}</div>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1 className={styles.modalTd}>{item.name}</h1>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconFont type="icongengxinshijian" style={{ color: '#000' }} />
                            <span style={{ paddingLeft: '3px', paddingRight: '0.2rem' }}>
                                更新时间：
                                {moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                            <Tag color="#188FFD" onClick={this.showModal}>
                                发票抬头
                            </Tag>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            {industry.map((item, index) => (
                                <Tag color="red" key={index}>
                                    {item.label}
                                </Tag>
                            ))}
                            {qualification.map((item, index) => (
                                <Tag color="blue" key={index}>
                                    {item.label}
                                </Tag>
                            ))}
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
                        <Divider style={{ margin: '16px 0' }} />
                        <Row gutter={16} style={{ marginTop: 6 }}>
                            <Col span={7}>
                                <div>联系人：{item.linkman}</div>
                            </Col>
                            <Col span={7}>
                                <div>联系人手机号：{item.linkPhone}</div>
                            </Col>
                            <Col span={7}>
                                <div>联系人邮箱：{item.linkEmail}</div>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: 6 }}>
                            <Col span={7}>
                                <div>企服负责人：{item.enterpriseName}</div>
                            </Col>
                            <Col span={7}>
                                <div>招商负责人：{item.commerceName}</div>
                            </Col>
                            <Col span={7}>
                                <div>跟踪状态：{item.regStatus}</div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Modal
                    title="发票抬头"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width="600px"
                >
                    <Descriptions title="" column={1}>
                        <Descriptions.Item label="企业名称">{item.name}</Descriptions.Item>
                        <Descriptions.Item label="企业税号">{item.creditCode}</Descriptions.Item>
                        <Descriptions.Item label="企业地址">{item.regLocation}</Descriptions.Item>
                        <Descriptions.Item label="企业点哈">{item.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item label="开户银行">{item.depositBank}</Descriptions.Item>
                        <Descriptions.Item label="银行账户">{item.bankAccount}</Descriptions.Item>
                    </Descriptions>
                </Modal>
                <Menu
                    className={styles.menu}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    {this.renderMenu(menuData)}
                </Menu>
                <div style={{ flex: 1 }} id="markdownBody">
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
                    <BackTop target={() => document.getElementById('markdownBody')} />
                </div>
            </Fragment>
        )
    }
}
export default CompanyDetails
