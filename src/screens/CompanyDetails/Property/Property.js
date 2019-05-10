/**
 * 企服首页/企业详情==> Property 知识产权
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Steps } from 'antd'
import styles from '../CompanyDetails.module.css'

const Step = Steps.Step

export default class Property extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="property:1"
                        title={<span style={{ color: '#1890ff' }}>商标信息</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '商标名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '商标类型',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '注册号',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                                {
                                    title: '状态',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '申请时间',
                                    dataIndex: 'duess',
                                    key: 'duess',
                                    align: 'center',
                                },
                                {
                                    title: '使用期限',
                                    dataIndex: 'data',
                                    key: 'data',
                                    align: 'center',
                                },
                                {
                                    title: '公司',
                                    dataIndex: 'state',
                                    key: 'state',
                                    align: 'center',
                                },
                                {
                                    title: '申请进度',
                                    dataIndex: 'drgfdf',
                                    key: 'drgfdf',
                                    align: 'center',
                                },
                                {
                                    title: '服务项目',
                                    dataIndex: 'mumu',
                                    key: 'mumu',
                                    align: 'center',
                                },
                                {
                                    title: '代理机构',
                                    dataIndex: 'jigou',
                                    key: 'jigou',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: 'REMODEO',
                                    age: '普通商标',
                                    address: '36941601',
                                    money: '商标注册申请-受理通知书发文-结束',
                                    duess: '2019-03-04',
                                    data: '2022-03-05',
                                    state: 'XX有限公司',
                                    drgfdf: '结束',
                                    mumu: 'REMODEO智能耳机',
                                    jigou: 'XX事务所',
                                },
                                {
                                    key: '2',
                                    name: 'REMODEO',
                                    age: '普通商标',
                                    address: '36941601',
                                    money: '商标注册申请-受理通知书发文-结束',
                                    duess: '2019-03-04',
                                    data: '2022-03-05',
                                    state: 'XX有限公司',
                                    drgfdf: '结束',
                                    mumu: 'REMODEO智能耳机',
                                    jigou: 'XX事务所',
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        id="property:2"
                        title={<span style={{ color: '#1890ff' }}>专利信息</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '专利名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '申请号',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '申请日期',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                                {
                                    title: '授权日期',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '专利发明人',
                                    dataIndex: 'duess',
                                    key: 'duess',
                                    align: 'center',
                                },
                                {
                                    title: '专利申请人',
                                    dataIndex: 'data',
                                    key: 'data',
                                    align: 'center',
                                },
                                {
                                    title: '专利类型',
                                    dataIndex: 'state',
                                    key: 'state',
                                    align: 'center',
                                },
                                {
                                    title: '专利代理机构',
                                    dataIndex: 'drgfdf',
                                    key: 'drgfdf',
                                    align: 'center',
                                },
                                {
                                    title: '公开（公告）号',
                                    dataIndex: 'mumu',
                                    key: 'mumu',
                                    align: 'center',
                                },
                                {
                                    title: '法律状态',
                                    dataIndex: 'jigou',
                                    key: 'jigou',
                                    align: 'center',
                                    width: '15%',
                                    render: jigou => (
                                        <Steps direction="vertical" size="small" current={0}>
                                            {jigou.map((item, i) => {
                                                return (
                                                    <Step
                                                        key={i}
                                                        title={item.time}
                                                        description={item.str}
                                                    />
                                                )
                                            })}
                                        </Steps>
                                    ),
                                },
                                {
                                    title: '专利说明',
                                    dataIndex: 'shuoming',
                                    key: 'shuoming',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '消息推送方法及装置',
                                    age: 'CN201510595839.9',
                                    address: '2019-03-04',
                                    money: '2019-04-03',
                                    duess: '李四',
                                    data: 'XX有限责任公司',
                                    state: '发明授权',
                                    drgfdf: 'XX有限责任公司',
                                    mumu: 'CN105205140B',
                                    jigou: [
                                        { time: '2019-04-03', str: '授权' },
                                        { time: '2019-04-05', str: '审查生效' },
                                    ],
                                    shuoming: '专利说明专利说明专利说明',
                                },
                                {
                                    key: '2',
                                    name: '消息推送方法及装置',
                                    age: 'CN201510595839.9',
                                    address: '2019-03-04',
                                    money: '2019-04-03',
                                    duess: '李四',
                                    data: 'XX有限责任公司',
                                    state: '发明授权',
                                    drgfdf: 'XX有限责任公司',
                                    mumu: 'CN105205140B',
                                    jigou: [
                                        { time: '2019-04-03', str: '授权' },
                                        { time: '2019-04-05', str: '审查生效' },
                                    ],
                                    shuoming: '专利说明专利说明专利说明',
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        id="property:3"
                        title={<span style={{ color: '#1890ff' }}>软件著作权</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '著作权名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '著作权人',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '简称',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                                {
                                    title: '登记日期',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '登记号',
                                    dataIndex: 'duess',
                                    key: 'duess',
                                    align: 'center',
                                },
                                {
                                    title: '分类号',
                                    dataIndex: 'data',
                                    key: 'data',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '红包购软件',
                                    age: '张三',
                                    address: '红包购',
                                    money: '2019-04-03',
                                    duess: '2013SR036886',
                                    data: '30100-0000',
                                },
                                {
                                    key: '2',
                                    name: '红包购软件',
                                    age: '张三',
                                    address: '红包购',
                                    money: '2019-04-03',
                                    duess: '2013SR036886',
                                    data: '30100-0000',
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        id="property:4"
                        title={<span style={{ color: '#1890ff' }}>作品著作权</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '著作权名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '著作权类别',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '著作权人',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                                {
                                    title: '登记日期',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '登记号',
                                    dataIndex: 'duess',
                                    key: 'duess',
                                    align: 'center',
                                },
                                {
                                    title: '完成创作时间',
                                    dataIndex: 'data',
                                    key: 'data',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '手机铃音',
                                    age: '音乐',
                                    address: '李四',
                                    money: '2019-04-03',
                                    duess: '国作登字-2013-F-00576287',
                                    data: '2013-04-01',
                                },
                                {
                                    key: '2',
                                    name: '手机铃音',
                                    age: '音乐',
                                    address: '李四',
                                    money: '2019-04-03',
                                    duess: '国作登字-2013-F-00576287',
                                    data: '2013-04-01',
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        id="property:5"
                        title={<span style={{ color: '#1890ff' }}>网站域名</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '主办单位/域名/网站',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '机构代码',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '主办单位性质',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                                {
                                    title: '备案号',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '网站首页',
                                    dataIndex: 'duess',
                                    key: 'duess',
                                    align: 'center',
                                },
                                {
                                    title: '审核时间',
                                    dataIndex: 'data',
                                    key: 'data',
                                    align: 'center',
                                },
                                {
                                    title: '状态',
                                    dataIndex: 'state',
                                    key: 'state',
                                    align: 'center',
                                },
                                {
                                    title: '创建时间',
                                    dataIndex: 'drgfdf',
                                    key: 'drgfdf',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: 'mi.com',
                                    age: '551385082',
                                    address: '企业',
                                    money: '京ICP备10046444号-17',
                                    duess: 'www.mi.com',
                                    data: '2022-03-05',
                                    state: '正常',
                                    drgfdf: '2015-04-01',
                                },
                                {
                                    key: '2',
                                    name: 'mi.com',
                                    age: '551385082',
                                    address: '企业',
                                    money: '京ICP备10046444号-17',
                                    duess: 'www.mi.com',
                                    data: '2022-03-05',
                                    state: '正常',
                                    drgfdf: '2015-04-01',
                                },
                            ]}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
