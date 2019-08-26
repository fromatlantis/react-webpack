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
        label: '应收款所属期',
        field: 'receiveDate',
    },
    {
        label: '账单编号',
        field: 'billNo',
    },
    {
        label: '应缴截止日期',
        field: 'limitDate',
    },
    {
        label: '应收款金额（元）',
        field: 'amount',
    },
]
const accountItems = [
    {
        label: '付款公司名称',
        field: 'payCompany',
    },
    {
        label: '付款银行账户',
        field: 'payBankAccount',
    },
    {
        label: '付款开户银行',
        field: 'payOpenBank',
    },
    {
        label: '缴费说明',
        field: 'payRemark',
    },
]
const costItems = {
    能源费: [
        {
            label: '单价（元）',
            field: 'price',
        },
        {
            label: '计费度数',
            field: 'count',
        },
    ],
    有偿服务费: [
        {
            label: '单位',
            field: 'price',
        },
        {
            label: '数量',
            field: 'count',
        },
    ],
    合同费用: [
        {
            label: '单价（元）',
            field: 'price',
        },
        {
            label: '面积（㎡）',
            field: 'count',
        },
        {
            label: '每月物业费（元）',
            field: 'propertyFee',
        },
        {
            label: '每月租金（元））',
            field: 'rentFee',
        },
    ],
    租金: [
        {
            label: '单价（元）',
            field: 'price',
        },
        {
            label: '面积（㎡）',
            field: 'count',
        },
        {
            label: '每月租金（元））',
            field: 'rentFee',
        },
    ],
    物业费: [
        {
            label: '单价（元）',
            field: 'price',
        },
        {
            label: '面积（㎡）',
            field: 'count',
        },
        {
            label: '每月物业费（元））',
            field: 'propertyFee',
        },
    ],
    其它综合费用: [],
}
@connect(state => ({
    billDetail: state.bill.billDetail,
}))
class BillDetail extends PureComponent {
    render() {
        const { billDetail } = this.props
        let items = [...baseItems, ...accountItems]
        if (billDetail.type) {
            items = [...items, ...costItems[billDetail.type]]
        }
        return (
            <Descriptions column={2}>
                {items.map(item => (
                    <Descriptions.Item label={item.label}>
                        {billDetail[item.field]}
                    </Descriptions.Item>
                ))}
            </Descriptions>
        )
    }
}
export default BillDetail
