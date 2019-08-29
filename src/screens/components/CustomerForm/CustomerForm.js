import React, { PureComponent } from 'react'
import { Button, DatePicker, Divider, Select, Input } from 'antd'
import { FormView } from 'components'
import moment from 'moment'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { goBack } from 'connected-react-router'
import { actions } from 'reduxDir/customerBill'
import { actions as customerActions } from 'reduxDir/customer'
const { Option } = Select
const rentItems = [
    {
        label: '签约日期',
        field: 'signDate',
        component: <DatePicker placeholder="请输入" />,
        formatter: signDate => signDate && moment(signDate),
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
    {
        label: '实际面积（㎡）',
        field: 'realArea',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '租赁起始日期',
        field: 'startDate',
        component: <DatePicker />,
        formatter: startDate => startDate && moment(startDate),
    },
    {
        label: '租赁终止日期',
        field: 'endDate',
        component: <DatePicker />,
        formatter: endDate => endDate && moment(endDate),
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
        field: 'freeStartDate',
        component: <DatePicker />,
        formatter: freeStartDate => freeStartDate && moment(freeStartDate),
    },
    {
        label: '免租终止日期',
        field: 'freeEndDate',
        component: <DatePicker />,
        formatter: freeEndDate => freeEndDate && moment(freeEndDate),
    },
    {
        label: '免租期限',
        field: 'freeLimit',
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
        label: '签约日期',
        field: 'signDate',
        component: <DatePicker placeholder="请输入" />,
        formatter: signDate => signDate && moment(signDate),
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
    {
        label: '预售单价（元/㎡）',
        field: 'advancePrice',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '预售面积（㎡）',
        field: 'advanceArea',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '实际面积（㎡）',
        field: 'realArea',
        component: <Input placeholder="请输入" />,
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
        component: <Input placeholder="请输入" />,
    },
    {
        label: '交房日期',
        field: 'startDate',
        component: <DatePicker />,
        formatter: startDate => startDate && moment(startDate),
    },
]
const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
}
@connect(
    state => ({
        customerBaseInfo: state.customer.customerBaseInfo,
        customerRentInfo: state.customer.customerRentInfo,
    }),
    dispatch => {
        return bindActionCreators(
            {
                goBack: goBack,
                addCustomer: actions('addCustomer'),
                updateCustomer: actions('updateCustomer'),
                getCustomerBaseInfo: customerActions('getCustomerBaseInfo'),
                getCustomerRentInfo: customerActions('getCustomerRentInfo'),
            },
            dispatch,
        )
    },
)
class CustomerForm extends PureComponent {
    state = {
        base: {
            rentType: '1',
        },
        rent: {},
    }
    componentDidMount() {
        const { id, getCustomerBaseInfo, getCustomerRentInfo } = this.props
        if (id) {
            getCustomerBaseInfo({
                customerId: id,
            })
            getCustomerRentInfo({
                customerId: id,
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.customerBaseInfo !== nextProps.customerBaseInfo) {
            let { customerBaseInfo } = nextProps
            this.setState({
                base: customerBaseInfo,
            })
        }
        if (this.props.customerRentInfo !== nextProps.customerRentInfo) {
            let { customerRentInfo } = nextProps
            this.setState({
                rent: customerRentInfo,
            })
        }
    }

    getCustomerId() {
        const {
            location: { pathname },
        } = this.props.router
        const params = pathname.match(/[^/]+/g)
        return params[params.length - 1]
    }
    changeType = value => {
        this.setState({
            base: {
                ...this.state.base,
                ...this.baseForm.getFieldsValue(),
                rentType: value,
            },
        })
    }
    add = () => {
        this.baseForm.validateFields((errors, values) => {
            if (!errors) {
                const { id, addCustomer, updateCustomer } = this.props
                const other = this.otherForm.getFieldsValue()
                // 时间处理
                if (other.signDate) {
                    other.signDate = other.signDate.format('YYYY-MM-DD')
                }
                if (other.startDate) {
                    other.startDate = other.startDate.format('YYYY-MM-DD')
                }
                if (other.endDate) {
                    other.endDate = other.endDate.format('YYYY-MM-DD')
                }
                if (other.freeStartDate) {
                    other.freeStartDate = other.freeStartDate.format('YYYY-MM-DD')
                }
                if (other.freeEndDate) {
                    other.freeEndDate = other.freeEndDate.format('YYYY-MM-DD')
                }
                if (id) {
                    //编辑
                    updateCustomer({
                        customerId: id,
                        ...values,
                        ...other,
                    })
                } else {
                    addCustomer({
                        ...values,
                        ...other,
                    })
                }
            }
        })
    }
    render() {
        const { base, rent } = this.state
        const items = [
            {
                label: '产品类型',
                field: 'productType',
                component: <Input placeholder="请输入" />,
                rules: [
                    {
                        required: true,
                        message: '请填写产品类型',
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
                        message: '请选择租售类型',
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
                        message: '请填写楼栋信息',
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
                        message: '请填写房号',
                    },
                ],
            },
            {
                label: '客户名称',
                field: 'customerName',
                component: <Input placeholder="请输入" />,
                rules: [
                    {
                        required: true,
                        message: '请填写客户名称',
                    },
                ],
            },
            {
                label: '业主姓名',
                field: 'ownerName',
                component: <Input placeholder="请输入" />,
            },
            {
                label: '手机号',
                field: 'phone',
                component: <Input placeholder="请输入" />,
                rules: [
                    {
                        required: true,
                        message: '请填写手机号',
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
                        message: '请填写邮箱',
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
        ]
        return (
            <div style={{ width: '860px' }}>
                <Divider>基本信息</Divider>
                <FormView
                    items={items}
                    data={base}
                    layout="inline"
                    saveBtn={false}
                    ref={baseForm => {
                        this.baseForm = baseForm
                    }}
                    formItemLayout={formItemLayout}
                />
                <Divider>其他信息</Divider>
                <FormView
                    items={base.rentType === '1' ? rentItems : sellItems}
                    data={rent}
                    layout="inline"
                    saveBtn={false}
                    ref={otherForm => {
                        this.otherForm = otherForm
                    }}
                    formItemLayout={formItemLayout}
                />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button type="primary" style={{ marginRight: '20px' }} onClick={this.add}>
                        保存
                    </Button>
                    <Button
                        onClick={() => {
                            this.props.goBack()
                        }}
                    >
                        取消
                    </Button>
                </div>
            </div>
        )
    }
}
export default CustomerForm
