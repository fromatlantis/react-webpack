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
        detail: state.charge.detail,
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
        // 详情
        if (this.props.detail !== nextProps.detail) {
            console.log(nextProps.detail)
            // 时间处理
            const {
                shouldReceiveDateBegin,
                shouldReceiveDateEnd,
                realReceiveDateBegin,
                realReceiveDateEnd,
                limitDate,
                receiveDate,
                ...values
            } = nextProps.detail
            if (shouldReceiveDateBegin) {
                values.shouldReceiveDate = [
                    moment(shouldReceiveDateBegin, 'YYYY.MM.DD'),
                    moment(shouldReceiveDateEnd, 'YYYY.MM.DD'),
                ]
            }
            if (realReceiveDateBegin) {
                values.realReceiveDates = [
                    moment(realReceiveDateBegin, 'YYYY.MM.DD'),
                    moment(realReceiveDateEnd, 'YYYY.MM.DD'),
                ]
            }
            if (limitDate) {
                values.limitDate = moment(limitDate, 'YYYY.MM.DD')
            }
            if (receiveDate) {
                values.receiveDate = moment(receiveDate, 'YYYY.MM.DD')
            }
            console.log(values)
            this.setState({
                values,
            })
        }
    }
    getFormValues = callback => {
        const baseForm = this.baseForm.props.form
        baseForm.validateFields((errors, values) => {
            if (!errors) {
                // console.log(values)
                // 时间处理
                values.shouldReceiveDate = values.shouldReceiveDate
                    .map(item => item.format('YYYY.MM.DD'))
                    .join('~')
                values.realReceiveDates = values.realReceiveDates
                    .map(item => item.format('YYYY.MM.DD'))
                    .join('~')
                values.limitDate = values.limitDate.format('YYYY.MM.DD')
                values.receiveDate = values.receiveDate.format('YYYY.MM.DD')
                callback(values)
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
    render() {
        const { mode } = this.props
        const baseItems = [
            {
                label: '费用类型',
                field: 'type',
                component: (
                    <Select
                        placeholder="请选择"
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
                label: '账单编号',
                field: 'billNo',
                component: (
                    <Input style={{ width: 225 }} disabled={mode === 'edit' ? true : false} />
                ),
            },
            {
                label: '应收款所属期',
                field: 'shouldReceiveDate',
                component: <RangePicker style={{ width: 225 }} />,
                rules: [
                    {
                        required: true,
                        message: '请选择应收款所属期',
                    },
                ],
            },
            {
                label: '应缴截止日期',
                field: 'limitDate',
                component: <DatePicker style={{ width: 225 }} />,
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
            {
                label: '收款所属期',
                field: 'realReceiveDates',
                component: <RangePicker style={{ width: 225 }} />,
                rules: [
                    {
                        required: true,
                        message: '请选择收款所属期',
                    },
                ],
            },
            {
                label: '收款日期',
                field: 'receiveDate',
                component: <DatePicker style={{ width: 225 }} />,
                rules: [
                    {
                        required: true,
                        message: '请选择应收款日期',
                    },
                ],
            },
            {
                label: '实收款金额（元）',
                field: 'realAmount',
                component: <InputNumber min={0} style={{ width: 225 }} />,
                rules: [
                    {
                        required: true,
                        message: '请填写实收款金额',
                    },
                ],
            },
            {
                label: '凭证号',
                field: 'license',
                component: <Input style={{ width: 225 }} />,
            },
            {
                label: '未收金额（元）',
                field: 'restAmount',
                component: <InputNumber min={0} style={{ width: 225 }} />,
                rules: [
                    {
                        required: true,
                        message: '请填写未收金额',
                    },
                ],
            },
        ]
        const { values } = this.state
        return (
            <Fragment>
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
            </Fragment>
        )
    }
}
export default BillForm
