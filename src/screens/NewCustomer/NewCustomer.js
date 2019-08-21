import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Breadcrumb, Input, Select, DatePicker, Divider } from 'antd'
import { FormView } from 'components'
import theme from 'Theme'
const { Option } = Select
const rentItems = [
    {
        label: '实际面积（㎡）',
        field: 'realArea',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '租赁起始日期',
        field: 'startDate',
        component: <DatePicker />,
    },
    {
        label: '租赁终止日期',
        field: 'endDate',
        component: <DatePicker />,
    },
    {
        label: '租赁期限',
        field: 'rentLimit',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '租赁单价（元/㎡）',
        field: 'realPrice',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '免租起始日期',
        field: 'customerName',
        component: <DatePicker />,
    },
    {
        label: '免租终止日期',
        field: 'freeStartDate',
        component: <DatePicker />,
    },
    {
        label: '免租期限',
        field: 'freeEndDate',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '租赁押金',
        field: 'deposit',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '租金总计',
        field: 'realPriceTotal',
        component: <Input placeholder="请输入" />,
    },
]
const sellItems = [
    {
        label: '预售单价（元/㎡）',
        field: 'advancePrice',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '预售面积（㎡）',
        field: 'advanceArea',
        component: <DatePicker />,
    },
    {
        label: '实际面积（㎡）',
        field: 'realArea',
        component: <DatePicker />,
    },
    {
        label: '预售总价（元）',
        field: 'advancePriceTotal',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '实际/最终总价（元）',
        field: 'realPriceTotal',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '实际面积单价（元/㎡)',
        field: 'realPrice',
        component: <DatePicker />,
    },
    {
        label: '交房日期',
        field: 'startDate',
        component: <DatePicker />,
    },
]
const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
}
export default class NewCustomer extends PureComponent {
    state = {
        base: {
            rentType: '1',
        },
    }
    changeType = value => {
        this.setState({
            base: {
                ...this.state.base,
                ...this.base.getFieldsValue(),
                rentType: value,
            },
        })
    }
    render() {
        const { base } = this.state
        const items = [
            {
                label: '产品类型',
                field: 'productType',
                component: <Input placeholder="请输入" />,
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '租售类型',
                field: 'rentType',
                component: (
                    <Select placeholder="请选择" onChange={this.changeType}>
                        <Option value="1">租</Option>
                        <Option value="2">售</Option>
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '楼栋',
                field: 'building',
                component: <Input placeholder="请输入" />,
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '房号',
                field: 'room',
                component: <Input placeholder="请输入" />,
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '客户名称',
                field: 'title',
                component: <Input placeholder="请输入" />,
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '业主姓名',
                field: 'customerName',
                component: <Input placeholder="请输入" />,
            },
            {
                label: '手机号',
                field: 'phone',
                component: <Input placeholder="请输入" />,
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '邮箱',
                field: 'email',
                component: <Input placeholder="请输入" />,
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '业务员',
                field: 'businessManager',
                component: <Input placeholder="请输入" />,
            },
            {
                label: '中介',
                field: 'medium',
                component: <Input placeholder="请输入" />,
            },
            {
                label: '签约日期',
                field: 'signDate',
                component: <DatePicker placeholder="请输入" />,
            },
            {
                label: '营业执照编号',
                field: 'licenseNo',
                component: <Input placeholder="请输入" />,
            },
            {
                label: '付款方式',
                field: 'payType',
                component: <Input placeholder="请输入" />,
            },
            {
                label: '合同编号',
                field: 'contractNo',
                component: <Input placeholder="请输入" />,
            },
        ]
        return (
            <div className={theme.card}>
                <div className={theme.title}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/bill">账单管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>新增客户</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={theme.content}>
                    <div style={{ width: '760px' }}>
                        <Divider>基本信息</Divider>
                        <FormView
                            items={items}
                            data={base}
                            layout="inline"
                            saveBtn={false}
                            ref={base => {
                                this.base = base
                            }}
                            formItemLayout={formItemLayout}
                        />
                        <Divider>其他信息</Divider>
                        <FormView
                            items={base.rentType === '1' ? rentItems : sellItems}
                            layout="inline"
                            saveBtn={false}
                            formItemLayout={formItemLayout}
                        />
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button type="primary" style={{ marginRight: '20px' }}>
                                保存
                            </Button>
                            <Button>取消</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
