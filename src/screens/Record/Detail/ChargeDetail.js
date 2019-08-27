import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Descriptions } from 'antd'
const baseItems = [
    {
        label: '费用类型',
        field: 'type',
    },
    {
        label: '费用名称',
        field: 'name',
    },
    {
        label: '账单编号',
        field: 'billNo',
    },
    {
        label: '应收款所属期',
        field: 'receiveDate',
    },
    {
        label: '应缴截止日期',
        field: 'limitDate',
    },
    {
        label: '应收款金额（元）',
        field: 'amount',
    },
    {
        label: '收款所属期',
        field: 'amount',
    },
    {
        label: '收款日期',
        field: 'amount',
    },
    {
        label: '实收款金额（元）',
        field: 'amount',
    },
    {
        label: '凭证号',
        field: 'amount',
    },
    {
        label: '未收余额（元）',
        field: 'amount',
    },
]
@connect(state => ({
    detail: state.charge.detail,
}))
class BillDetail extends PureComponent {
    render() {
        const { detail } = this.props
        return (
            <Descriptions column={2}>
                <Descriptions.Item label="费用类型">{detail.type}</Descriptions.Item>
                <Descriptions.Item label="费用名称">{detail.name}</Descriptions.Item>
                <Descriptions.Item label="账单编号">{detail.billNo}</Descriptions.Item>
                <Descriptions.Item label="应收款所属期">{`${detail.shouldReceiveDateBegin}~${detail.shouldReceiveDateEnd}`}</Descriptions.Item>
                <Descriptions.Item label="应缴截止日期">{detail.limitDate}</Descriptions.Item>
                <Descriptions.Item label="应收款金额（元）">{detail.amount}</Descriptions.Item>
                <Descriptions.Item label="收款所属期">{`${detail.realReceiveDateBegin}~${detail.realReceiveDateEnd}`}</Descriptions.Item>
                <Descriptions.Item label="收款日期">{detail.receiveDate}</Descriptions.Item>
                <Descriptions.Item label="实收款金额（元）">{detail.realAmount}</Descriptions.Item>
                <Descriptions.Item label="赁证号">{detail.license}</Descriptions.Item>
                <Descriptions.Item label="未收余额（元）">{detail.restAmount}</Descriptions.Item>
            </Descriptions>
        )
    }
}
export default BillDetail
