/**
 * 企服首页/企业详情
 */
import React, { PureComponent, Fragment } from 'react'
import { Input, Tag, Breadcrumb, Card, Menu, Row, Col, Modal } from 'antd'
import { Link, NavLink, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './CompanyDetails.module.css'
import { menuData } from './MenuData'
import routes from './MenuData'

import phont from '../../assets/QDZH.png'
import retime from '../../assets/retime.png'

const SubMenu = Menu.SubMenu

class CompanyDetails extends PureComponent {
    state = {
        // 路由Menu参数
        current: '',
        // modal对话框参数
        visible: false,
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
                element.scrollIntoView()
            }
        }, 20)
    }
    //导航Menu的便利方法
    renderMenu = data => {
        return data.map((item, index) => {
            if (item.children) {
                return (
                    <SubMenu
                        key={index}
                        title={
                            <NavLink
                                exact
                                className={styles.SubMenuTitle}
                                to={`/companyDetails/${item.path}`}
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
                        <NavLink to={`/companyDetails/${item.path}`}>
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
        return (
            <Fragment>
                <Breadcrumb className={styles.BreadcrumbSty}>
                    <Breadcrumb.Item>
                        <Link to={`/home`}>企服首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>企业详情</Breadcrumb.Item>
                </Breadcrumb>

                <Card className={styles.cardSty} /* style={{ height: 150 }} */>
                    <div className={styles.flexDiv}>
                        <img
                            src={phont}
                            alt=""
                            style={{ width: 100, height: 100, marginTop: 20 }}
                        />
                        <div style={{ paddingLeft: 30, width: '80%' }}>
                            <h1 className={styles.modalTd}>润江物业服务有限公司</h1>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <img
                                    src={retime}
                                    alt=""
                                    style={{ width: 14, height: 14, marginTop: 3 }}
                                />
                                <p style={{ padding: '0 10px' }}>更新时间：10分钟前</p>
                                <Tag color="#2db7f5" onClick={this.showModal}>
                                    发票抬头
                                </Tag>
                            </div>
                            <Row gutter={16} style={{ marginTop: 6 }}>
                                <Col span={7}>
                                    <div>法人：庄花</div>
                                </Col>
                                <Col span={7}>
                                    <div>注册资金：5000万元人民币</div>
                                </Col>
                                <Col span={7}>
                                    <div>成立时间：2019-10-23</div>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 6 }}>
                                <Col span={7}>
                                    <div>邮箱：zhuanghua@163.com</div>
                                </Col>
                                <Col span={7}>
                                    <div>联系电话：010-897788-906</div>
                                </Col>
                                <Col span={7}>
                                    <div>官网：http://www.example.com</div>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 6 }}>
                                <Col span={16}>
                                    <div>企业地址：石家庄市科技中心润江大厦B座1201室</div>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 6 }}>
                                <Col span={7}>
                                    <div>企服负责人：小红</div>
                                </Col>
                                <Col span={7}>
                                    <div>跟踪状态：在业</div>
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
                    width="400px"
                >
                    <table>
                        <tbody>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>企业名称：</td>
                                <td>小米科技有限公司</td>
                            </tr>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>企业税号：</td>
                                <td>9117674378947237Q</td>
                            </tr>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>企业地址：</td>
                                <td>蛊惑江湖核对好风景就哭哭</td>
                            </tr>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>企业电话：</td>
                                <td>010-03984757</td>
                            </tr>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>开户银行：</td>
                                <td>软件而诶热一人哦is人激怒股</td>
                            </tr>
                            <tr className={styles.modalTr}>
                                <td className={styles.modalTd}>银行账户：</td>
                                <td>11012947387889</td>
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
                                path={`/companyDetails/${item.path}`}
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
const mapStateToProps = state => {
    return {
        router: state.router,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CompanyDetails)
