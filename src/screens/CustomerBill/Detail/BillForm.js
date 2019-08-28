import React, { PureComponent, Fragment } from 'react'
import { Input, InputNumber, DatePicker, Divider, Select } from 'antd'
import { FormView } from 'components'
import moment from 'moment'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/bill'
const { Option } = Select
const { RangePicker } = DatePicker
const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
}
@connect(
    state => ({
        billNo: state.bill.billNo,
        billDetail: state.bill.billDetail,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getBillNo: actions('getBillNo'),
            },
            dispatch,
        )
    },
    null,
    { withRef: true },
)
class BillForm extends PureComponent {
    state = {
        values: {
            type: '能源费',
        },
    }
    componentDidMount() {
        const { values } = this.state
        if (this.props.mode === 'add') {
            this.props.getBillNo({
                type: values.type,
                limitDate: moment().format('YYYYMMDD'),
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        // 生成账单编号
        if (this.props.billNo !== nextProps.billNo) {
            const baseForm = this.baseForm.props.form
            const accountForm = this.accountForm.props.form
            this.setState({
                values: {
                    ...baseForm.getFieldsValue(),
                    billNo: nextProps.billNo,
                    ...accountForm.getFieldsValue(),
                },
            })
        }
        // 详情
        if (this.props.billDetail !== nextProps.billDetail) {
            // 时间处理
            const { receiveDateBegin, receiveDateEnd, limitDate, ...values } = nextProps.billDetail
            values.receiveDate = [
                moment(receiveDateBegin, 'YYYY.MM.DD'),
                moment(receiveDateEnd, 'YYYY.MM.DD'),
            ]
            values.limitDate = moment(limitDate, 'YYYY.MM.DD')
            this.setState({
                values,
            })
        }
    }
    changeType = type => {
        const baseForm = this.baseForm.props.form
        const accountForm = this.accountForm.props.form
        this.setState({
            values: {
                ...baseForm.getFieldsValue(),
                type,
                ...accountForm.getFieldsValue(),
            },
        })
        this.props.getBillNo({
            type: type,
            limitDate: moment().format('YYYYMMDD'),
        })
    }
    changeLimitData = (date, dateStr) => {
        // const { values } = this.state
        // this.props.getBillNo({
        //     type: values.type,
        //     limitDate: date.format('YYYYMMDD'),
        // })
    }
    getFormValues = callback => {
        const baseForm = this.baseForm.props.form
        const accountForm = this.accountForm.props.form
        baseForm.validateFields((errors, values) => {
            if (!errors) {
                let params = {
                    ...values,
                    ...accountForm.getFieldsValue(),
                }
                if (this.costForm) {
                    const costForm = this.costForm.props.form
                    params = { ...params, ...costForm.getFieldsValue() }
                }
                // 时间处理
                const { receiveDate, limitDate, ...newParams } = params
                const [receiveDateBegin, receiveDateEnd] = receiveDate
                newParams.receiveDateBegin = receiveDateBegin.format('YYYY.MM.DD')
                newParams.receiveDateEnd = receiveDateEnd.format('YYYY.MM.DD')
                newParams.limitDate = limitDate.format('YYYY.MM.DD')
                callback(newParams)
            }
        })
    }
    clearValues = () => {
        this.setState({
            values: {
                type: '能源费',
            },
        })
    }
    renderCostForm = () => {
        const costItems = {
            能源费: [
                {
                    label: '单价（元）',
                    field: 'price',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
                {
                    label: '计费度数',
                    field: 'count',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
            ],
            有偿服务费: [
                {
                    label: '单位',
                    field: 'price',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
                {
                    label: '数量',
                    field: 'count',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
            ],
            合同费用: [
                {
                    label: '单价（元）',
                    field: 'price',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
                {
                    label: '面积（㎡）',
                    field: 'count',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
                {
                    label: '每月物业费（元）',
                    field: 'propertyFee',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
                {
                    label: '每月租金（元））',
                    field: 'rentFee',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
            ],
            租金: [
                {
                    label: '单价（元）',
                    field: 'price',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
                {
                    label: '面积（㎡）',
                    field: 'count',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
                {
                    label: '每月租金（元））',
                    field: 'rentFee',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
            ],
            物业费: [
                {
                    label: '单价（元）',
                    field: 'price',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
                {
                    label: '面积（㎡）',
                    field: 'count',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
                {
                    label: '每月物业费（元））',
                    field: 'propertyFee',
                    component: <InputNumber min={0} style={{ width: 225 }} />,
                },
            ],
            其它综合费用: [],
        }
        const { values } = this.state
        const items = costItems[values.type]
        if (items.length > 0) {
            return (
                <Fragment>
                    <Divider>收费信息</Divider>
                    <FormView
                        items={items}
                        data={values}
                        layout="inline"
                        saveBtn={false}
                        wrappedComponentRef={costForm => {
                            this.costForm = costForm
                        }}
                        formItemLayout={formItemLayout}
                    />
                </Fragment>
            )
        } else {
            return <Fragment />
        }
    }
    render() {
        const { mode } = this.props
        const baseItems = [
            {
                label: '费用类型',
                field: 'type',
                component: (
                    <Select
                        placeholder="请选择"
                        onChange={this.changeType}
                        style={{ width: 225 }}
                        disabled={mode === 'edit' ? true : false}
                    >
                        <Option value="能源费">能源费</Option>
                        <Option value="有偿服务费">有偿服务费</Option>
                        <Option value="合同费用">合同费用</Option>
                        <Option value="租金">租金</Option>
                        <Option value="物业费">物业费</Option>
                        <Option value="其它综合费用">其它综合费用</Option>
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                        message: '请选择费用类型',
                    },
                ],
            },
            {
                label: '费用名称',
                field: 'name',
                component: (
                    <Input style={{ width: 225 }} disabled={mode === 'edit' ? true : false} />
                ),
            },
            {
                label: '应收款所属期',
                field: 'receiveDate',
                component: <RangePicker style={{ width: 225 }} />,
                rules: [
                    {
                        required: true,
                        message: '请选择应收款所属期',
                    },
                ],
            },
            {
                label: '账单编号',
                field: 'billNo',
                component: (
                    <Input
                        disabled
                        placeholder="根据类型和当前日期自动生成"
                        style={{ width: 225 }}
                    />
                ),
            },
            {
                label: '应缴截止日期',
                field: 'limitDate',
                component: <DatePicker style={{ width: 225 }} onChange={this.changeLimitData} />,
                rules: [
                    {
                        required: true,
                        message: '请选择应缴截止日期',
                    },
                ],
            },
            {
                label: '应收款金额（元）',
                field: 'amount',
                component: <InputNumber min={0} style={{ width: 225 }} />,
                rules: [
                    {
                        required: true,
                        message: '请填写应收款金额',
                    },
                ],
            },
        ]
        const accountItems = [
            {
                label: '付款公司名称',
                field: 'payCompany',
                component: <Input placeholder="请输入" style={{ width: 225 }} />,
            },
            {
                label: '付款银行账户',
                field: 'payBankAccount',
                component: <Input placeholder="请输入" style={{ width: 225 }} />,
            },
            {
                label: '付款开户银行',
                field: 'payOpenBank',
                component: <Input placeholder="请输入" style={{ width: 225 }} />,
            },
            {
                component: <div style={{ width: 225 }} />,
            },
            {
                label: '缴费说明',
                field: 'payRemark',
                component: <Input.TextArea placeholder="请输入" style={{ marginTop: 6 }} />,
                rules: [
                    {
                        max: 300,
                        message: '不能超过300字',
                    },
                ],
            },
        ]

        const { values } = this.state
        return (
            <Fragment>
                <Divider>基本信息</Divider>
                <FormView
                    items={baseItems}
                    data={values}
                    layout="inline"
                    saveBtn={false}
                    wrappedComponentRef={baseForm => {
                        this.baseForm = baseForm
                    }}
                    formItemLayout={formItemLayout}
                />
                {this.renderCostForm()}
                <Divider>付款账户</Divider>
                <FormView
                    items={accountItems}
                    data={values}
                    layout="inline"
                    saveBtn={false}
                    wrappedComponentRef={accountForm => {
                        this.accountForm = accountForm
                    }}
                    formItemLayout={formItemLayout}
                />
            </Fragment>
        )
    }
}
export default BillForm
