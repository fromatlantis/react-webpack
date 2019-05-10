/**
 * 企服首页/企业详情==> Information 基本信息
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Timeline } from 'antd'
import styles from '../CompanyDetails.module.css'

export default class Information extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="information:1"
                        title={<span style={{ color: '#1890ff' }}>企业动态</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                        // tabList={[{ key: '企业动态', tab: '企业动态' }]}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '标题',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '新闻来源',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '发布时间',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '小米不只要做互联网公司，还要成为AI公司',
                                    age: '金额未知',
                                    address: '2019-4-29 18:05',
                                },
                                {
                                    key: '2',
                                    name: '智能音箱中场：“小爱同学”喜提3000万月活',
                                    age: '1亿美金',
                                    address: '2019-4-29 18:05',
                                },
                            ]}
                        />
                        {/* <Timeline>
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
                    </Timeline> */}
                    </Card>
                    <Card
                        id="information:2"
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
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>经营范围</td>
                                    <td
                                        style={{
                                            width: '84%',
                                            border: '1px rgb(230, 235, 241) solid',
                                            textAlign: 'center',
                                        }}
                                    >
                                        软件技术开发、技术咨询、技术服务、通讯设备、计算机技术维修、软件服务、技术进出口、代理进出口企业管理咨询销售计算
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                    <Card
                        id="information:3"
                        title={<span style={{ color: '#1890ff' }}>融资历程</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
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
                        id="information:4"
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
                        id="information:5"
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
                </div>
            </Fragment>
        )
    }
}
