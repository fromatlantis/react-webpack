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
        title: '序号',
        dataIndex: 'num',
        key: 'num',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
        title: '物料类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '物料名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '物料型号',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: '用途说明    ',
        dataIndex: 'remark',
        key: 'remark',
    },
]
export default class ImportTable extends PureComponent {
    render() {
        return (
            <Table dataSource={this.props.dataSource || []} columns={columns} pagination={false} />
        )
    }
}
