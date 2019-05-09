/**
 * 企服首页/企业详情
 */
import React, { PureComponent, Fragment } from 'react'
import { Input, Tag, Breadcrumb, Card, Menu, Icon, Timeline, Table } from 'antd'
import { Link, NavLink, Route } from 'react-router-dom'
import styles from './CompanyDetails.module.css'

import Information from './Information/Information'

import avatar from 'assets/avatar.png'

const Search = Input.Search
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export default class CompanyDetails extends PureComponent {
    state = {
        current: '',
    }

    handleClick = e => {
        console.log('click ', e)
        this.setState({ current: e.key })
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
                <Card style={{ width: '80%', marginLeft: '2%' }}>复用</Card>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{ margin: '20px 18% 0 2%' }}
                >
                    {/* <SubMenu title={<span className={styles.SubMenuTitle}>基本信息</span>}> */}
                    <SubMenu
                        title={
                            <NavLink
                                exact
                                className={styles.SubMenuTitle}
                                to="/companyDetails/information"
                            >
                                基本信息
                            </NavLink>
                        }
                    >
                        <MenuItemGroup>
                            <Menu.Item key="information:1">工商信息</Menu.Item>
                            <Menu.Item key="information:2">融资历程</Menu.Item>
                            <Menu.Item key="information:3">核心人员</Menu.Item>
                            <Menu.Item key="information:4">相关新闻</Menu.Item>
                            <Menu.Item key="information:5">主要产品</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <SubMenu title={<span className={styles.SubMenuTitle}>投资关系</span>}>
                        <MenuItemGroup>
                            <Menu.Item key="Investment:1">投资事件</Menu.Item>
                            <Menu.Item key="Investment:2">对外投资</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <SubMenu title={<span className={styles.SubMenuTitle}>企业关系</span>}>
                        <MenuItemGroup>
                            <Menu.Item key="company:1">企业图谱</Menu.Item>
                            <Menu.Item key="company:2">投资图谱</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <SubMenu title={<span className={styles.SubMenuTitle}>知识产权</span>}>
                        <MenuItemGroup>
                            <Menu.Item key="property:1">商标信息</Menu.Item>
                            <Menu.Item key="property:2">专利信息</Menu.Item>
                            <Menu.Item key="property:3">软件著作权</Menu.Item>
                            <Menu.Item key="property:4">作品著作权</Menu.Item>
                            <Menu.Item key="property:5">网站域名</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <SubMenu title={<span className={styles.SubMenuTitle}>更新记录</span>}>
                        <MenuItemGroup>
                            <Menu.Item key="renew:1">更新消息</Menu.Item>
                            <Menu.Item key="renew:2">历史记录</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <Menu.Item key="news">新闻舆情</Menu.Item>
                    <Menu.Item key="need">企业需求</Menu.Item>
                    <Menu.Item key="advice">改进建议</Menu.Item>
                    <Menu.Item key="otherMes">其他信息</Menu.Item>
                    <Menu.Item key="archives">企业档案</Menu.Item>
                </Menu>
                <Card
                    title={<span style={{ color: '#1890ff' }}>企业动态</span>}
                    extra={<a>展开更多>></a>}
                    className={styles.cardSty}
                    // tabList={[{ key: '企业动态', tab: '企业动态' }]}
                >
                    <Timeline>
                        <Timeline.Item color="green">
                            <p>2015-09-01 公司成立</p>
                        </Timeline.Item>
                        <Timeline.Item color="green">
                            <p>2015-09-01 营收增长50%</p>
                        </Timeline.Item>
                        <Timeline.Item color="red">
                            <p>2015-08-01 公司利润增长60%</p>
                        </Timeline.Item>
                        <Timeline.Item color="red">
                            <p>2015-08-01《XXPlay》产品发布</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>2015-07-01 公司董事会成立，确立公司章程，确认董事会人选及董事长</p>
                        </Timeline.Item>
                    </Timeline>
                </Card>
                <Route exact path="/companyDetails/information" component={Information} />
                {/* <div className={styles.messageCard}>
                    <Card
                        className={styles.cardSty}
                        tabList={[{ key: '工商信息', tab: '工商信息' }]}
                    >
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>法人</td>
                                    <td className={styles.tdright}>张三</td>
                                    <td className={styles.tdleft}>注册资本</td>
                                    <td className={styles.tdright}>2011.0899万元人民币</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>经营状态</td>
                                    <td className={styles.tdright}>开业</td>
                                    <td className={styles.tdleft}>实缴资本</td>
                                    <td className={styles.tdright}>2011.0899万元人民币</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>统一社会信用代码</td>
                                    <td className={styles.tdright}>911101080964417131D</td>
                                    <td className={styles.tdleft}>成立日期</td>
                                    <td className={styles.tdright}>2014-04-03</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>工商注册号</td>
                                    <td className={styles.tdright}>1108016971123</td>
                                    <td className={styles.tdleft}>纳税人识别号</td>
                                    <td className={styles.tdright}>09644173-1</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>公司类型</td>
                                    <td className={styles.tdright}>其他责任有限公司</td>
                                    <td className={styles.tdleft}>组织机构代码</td>
                                    <td className={styles.tdright}>MA90DGJJ-1</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>核准日期</td>
                                    <td className={styles.tdright}>2018-5-12</td>
                                    <td className={styles.tdleft}>所属行业</td>
                                    <td className={styles.tdright}>销售业</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>所属地区</td>
                                    <td className={styles.tdright}>北京市</td>
                                    <td className={styles.tdleft}>登记机关</td>
                                    <td className={styles.tdright}>北京市工商行政管理局海淀分局</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>曾用名</td>
                                    <td className={styles.tdright}>北京思明软件系统有限公司</td>
                                    <td className={styles.tdleft}>英文名</td>
                                    <td className={styles.tdright}>enriiodreo</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>人员规模</td>
                                    <td className={styles.tdright}>100～499人</td>
                                    <td className={styles.tdleft}>参保人数</td>
                                    <td className={styles.tdright}>466</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>企业地址</td>
                                    <td className={styles.tdright}>
                                        北京市海淀区中关村东路1号院1号楼10层1002
                                    </td>
                                    <td className={styles.tdleft}>营业期限</td>
                                    <td className={styles.tdright}>2014-04-03 至 2034-04-02</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                    <Card
                        title={<span style={{ color: '#1890ff' }}>融资历程</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                        // tabList={[{ key: '融资历程', tab: '融资历程' }]}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '时间',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '金额',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '投资方',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '2019-4-29',
                                    age: '金额未知',
                                    address: 'xxx公司',
                                },
                                {
                                    key: '2',
                                    name: '2019-4-29',
                                    age: '1亿美金',
                                    address: 'xxx公司',
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        title={<span style={{ color: '#1890ff' }}>核心人员</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '姓名',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                    width: '30%',
                                },
                                {
                                    title: '职位',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                    width: '30%',
                                },
                                {
                                    title: '介绍',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '张三',
                                    age: '董事长兼联合创始人',
                                    address:
                                        '王川，小米公司联合创始人兼副总裁，毕业于北京科技大学，1997年创立了雷石科技，并将其发展为中国最大的影音娱乐设备公司。2012年加入小米科技，担任联合创始人及副总裁。目前负责小米盒子',
                                },
                                {
                                    key: '2',
                                    name: '张三',
                                    age: '联合创始人',
                                    address:
                                        '王川，小米公司联合创始人兼副总裁，毕业于北京科技大学，1997年创立了雷石科技，并将其发展为中国最大的影音娱乐设备公司。',
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        title={<span style={{ color: '#1890ff' }}>相关新闻</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '姓名',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '新闻来源',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                    width: '30%',
                                },
                                {
                                    title: '发布时间',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                    width: '30%',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name:
                                        '小米联手北京时代美术馆推出科技艺术大展：超级对撞Xcelerator',
                                    age: '董事长兼联合创始人',
                                    address: '2019-4-29 18:05',
                                },
                                {
                                    key: '2',
                                    name: '小米不只要做互联网公司，还要成为AI公司',
                                    age: '联合创始人',
                                    address: '2019-4-29 18:05',
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        title={<span style={{ color: '#1890ff' }}>主要产品</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '产品名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                    width: '20%',
                                },
                                {
                                    title: '产品介绍',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                    width: '40%',
                                },
                                {
                                    title: '主要功能',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '哎呀宝贝',
                                    age:
                                        '世界的新看法，期待总于意料之外。小米VR满足你对这个世界的好奇心，换一种方式感知前所未有的体验。',
                                    address: '主要功能描述',
                                },
                                {
                                    key: '2',
                                    name: '小米VR Play',
                                    age:
                                        '世界的新看法，期待总于意料之外。小米VR满足你对这个世界的好奇心，换一种方式感知前所未有的体验。',
                                    address: '主要功能描述',
                                },
                            ]}
                        />
                    </Card>
                </div> */}
            </Fragment>
        )
    }
}
