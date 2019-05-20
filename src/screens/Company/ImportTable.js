import React, { PureComponent } from 'react'
import { Table } from 'antd'
import moment from 'moment'

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]

const columns = [
    {
        title: '企业名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '法人',
        dataIndex: 'legalPersonName',
        key: 'legalPersonName',
    },
    {
        title: '公司类型',
        dataIndex: 'companyType',
        key: 'companyType',
    },
    {
        title: '注册资金',
        dataIndex: 'regCapital',
        key: 'regCapital',
    },
    {
        title: '开业时间',
        dataIndex: 'estiblishTime',
        key: 'estiblishTime',
        render: estiblishTime => <span>{moment(estiblishTime).format('YYYY-MM-DD')}</span>,
    },
    {
        title: '企业类型',
        dataIndex: 'category',
        key: 'category',
    },
]
export default class ImportTable extends PureComponent {
    render() {
        return (
            <Table dataSource={this.props.dataSource || []} columns={columns} pagination={false} />
        )
    }
}
