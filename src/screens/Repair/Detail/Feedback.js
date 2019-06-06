import React, { PureComponent, Fragment } from 'react'
import moment from 'moment'
import { Descriptions, Input, InputNumber, DatePicker, Radio, Table } from 'antd'
import { FormView, PicturesWall, ImageView } from 'components'
import MaterialChip from './MaterialChip'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/feedback'
import { actions as configurationActions } from 'reduxDir/configuration'

const mapStateToProps = state => {
    return {
        setDataList: state.configuration.setDataList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            feedback: actions('feedback'),
            elevatorFeedback: actions('elevatorFeedback'),
            getSetInfo: configurationActions('getSetInfo'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Feedback extends PureComponent {
    state = {
        isPaid: false,
        values: {
            // 默认值
            fixResult: '完成',
            isPaid: '0',
            paymentMethod: '2',
        },
    }
    componentDidMount() {
        this.props.getSetInfo() //获取配置信息
        // console.log(this.props)
    }
    onSubmit = values => {
        //console.log(values)
        const { detail } = this.props
        let formData = new FormData()
        formData.append('repairId', detail.id)
        formData.append('fixResult', values.fixResult)
        formData.append('isPaid', values.isPaid)
        formData.append('fixBeginDate', moment(values.fixBeginDate).format('YYYY-MM-DD HH:mm:ss'))
        formData.append('fixEndDate', moment(values.fixEndDate).format('YYYY-MM-DD HH:mm:ss'))
        formData.append('fixDuration', values.fixDuration)
        formData.append('humans', values.humans)
        if (values.fixDesc) {
            formData.append('fixDesc', values.fixDesc)
        }
        if (values.fixImages) {
            values.fixImages.forEach(item => {
                formData.append('fixImages', item)
            })
        }
        if (values.materialBill) {
            formData.append('materialBill', JSON.stringify(values.materialBill))
        }
        if (values.paymentMethod) {
            formData.append('paymentMethod', values.paymentMethod)
        }
        if (values.materialCosts) {
            formData.append('materialCosts', values.materialCosts)
        }
        if (values.staffCosts) {
            formData.append('staffCosts', values.staffCosts)
        }
        if (values.totalCosts) {
            formData.append('totalCosts', values.totalCosts)
        }
        this.props.feedback(formData)
    }
    changeIsPaid = e => {
        if (e.target.value === '1') {
            this.setState({
                isPaid: true,
            })
        } else {
            this.setState({
                isPaid: false,
            })
        }
        const { form } = this.wrappedForm.props
        this.setState({
            values: {
                ...this.state.values,
                ...form.getFieldsValue(),
                isPaid: e.target.value,
            },
        })
    }
    // 计算维修时长
    pickStart = (value, dateString) => {
        const { form } = this.wrappedForm.props
        const end = form.getFieldValue('fixEndDate')
        if (end) {
            form.setFieldsValue({
                fixDuration: end.diff(value, 'minutes'),
            })
        }
    }
    pickEnd = (value, dateString) => {
        const { form } = this.wrappedForm.props
        const start = form.getFieldValue('fixBeginDate')
        if (start) {
            form.setFieldsValue({
                fixDuration: value.diff(start, 'minutes'),
            })
        }
    }
    // 计算人工费
    fixDurationChange = value => {
        const { form } = this.wrappedForm.props
        const humans = form.getFieldValue('humans')
        const { chargeableTimeLimit, standardLaborCost } = this.props.setDataList
        if (value > chargeableTimeLimit && humans) {
            const hours = Math.ceil((parseInt(value) - parseInt(chargeableTimeLimit)) / 60)
            form.setFieldsValue({
                staffCosts: hours * standardLaborCost * humans,
            })
            this.totalCost({ staffCosts: hours * standardLaborCost * value || '0' })
        } else {
            form.setFieldsValue({
                staffCosts: 0,
            })
            this.totalCost({ staffCosts: '0' })
        }
    }
    humansChange = value => {
        const { form } = this.wrappedForm.props
        const fixDuration = form.getFieldValue('fixDuration')
        const { chargeableTimeLimit, standardLaborCost } = this.props.setDataList
        if (fixDuration > chargeableTimeLimit && value) {
            const hours = Math.ceil((parseInt(fixDuration) - parseInt(chargeableTimeLimit)) / 60)
            form.setFieldsValue({
                staffCosts: hours * standardLaborCost * value,
            })
            this.totalCost({ staffCosts: hours * standardLaborCost * value || '0' })
        } else {
            form.setFieldsValue({
                staffCosts: 0,
            })
            this.totalCost({ staffCosts: '0' })
        }
    }
    // 物料费用计算
    materialChange = materials => {
        const totalCount = materials.reduce((total, item) => total + item.price * item.count, 0)
        const { form } = this.wrappedForm.props
        form.setFieldsValue({
            materialCosts: totalCount,
        })
        this.totalCost({ materialCosts: totalCount || '0' })
    }
    // 维修费总计
    staffCostsChange = value => {
        this.totalCost({ staffCosts: value || '0' })
    }
    materialCostsChange = value => {
        this.totalCost({ materialCosts: value || '0' })
    }
    // 总费用计算
    totalCost = ({ materialCosts, staffCosts }) => {
        const { form } = this.wrappedForm.props
        if (!materialCosts) {
            materialCosts = form.getFieldValue('materialCosts') || 0
        }
        if (!staffCosts) {
            staffCosts = form.getFieldValue('staffCosts') || 0
        }
        form.setFieldsValue({
            totalCosts: materialCosts + staffCosts,
        })
    }
    // 反馈-电梯
    onLiftSubmit = () => {
        const { form } = this.wrappedLiftForm.props
        const { detail } = this.props
        let values = form.getFieldsValue()
        values.repairId = detail.id
        values.repairTime = values.repairTime.format('YYYY-MM-DD HH:mm:ss')
        this.props.elevatorFeedback(values)
    }
    render() {
        const { isPaid, values } = this.state
        const { detail, type } = this.props
        const status = parseInt(detail.repairStatus)
        if (status === 1 && type === 'feedback') {
            const { category, classify, fault } = detail
            if (
                category.indexOf('电梯') !== -1 ||
                classify.indexOf('电梯') !== -1 ||
                fault.indexOf('电梯') !== -1
            ) {
                // 电梯类型
                const items = [
                    {
                        label: '设备编号',
                        field: 'equipmentNo',
                        component: <Input />,
                    },
                    {
                        label: '维保单位',
                        field: 'maintenanceCom',
                        component: <Input />,
                    },
                    {
                        label: '故障原因',
                        field: 'faultCause',
                        component: <Input />,
                    },
                    {
                        label: '修复结果',
                        field: 'repairResult',
                        component: <Input />,
                    },
                    {
                        label: '排除时间',
                        field: 'repairTime',
                        component: <DatePicker placeholder="请选择开始时间" showTime />,
                    },
                    {
                        label: '排除人',
                        field: 'repairWorker',
                        component: <Input />,
                    },
                    {
                        label: '跟踪人意见',
                        field: 'opinion',
                        component: <Input />,
                    },
                ]
                const formItemLayout = {
                    labelCol: { span: 3 },
                    wrapperCol: { span: 6 },
                }
                return (
                    <FormView
                        wrappedComponentRef={ref => {
                            this.wrappedLiftForm = ref
                        }}
                        formItemLayout={formItemLayout}
                        items={items}
                        onSubmit={this.onLiftSubmit}
                    />
                )
            } else {
                const items = [
                    {
                        label: '维修结果',
                        field: 'fixResult',
                        component: (
                            <Radio.Group>
                                <Radio value="未完成">未完成</Radio>
                                <Radio value="完成">完成</Radio>
                                <Radio value="业主外判维修">业主外判维修</Radio>
                            </Radio.Group>
                        ),
                        rules: [
                            {
                                required: true,
                                message: '请选择维修结果',
                            },
                        ],
                    },
                    {
                        label: '维修说明',
                        field: 'fixDesc',
                        component: <Input.TextArea autosize={{ minRows: 4 }} />,
                    },
                    {
                        label: '反馈图片',
                        field: 'fixImages',
                        component: <PicturesWall />,
                    },
                    {
                        label: '是否付费',
                        field: 'isPaid',
                        // initialValue: '0',
                        component: (
                            <Radio.Group onChange={this.changeIsPaid}>
                                <Radio value="1">是</Radio>
                                <Radio value="0">否</Radio>
                            </Radio.Group>
                        ),
                        rules: [
                            {
                                required: true,
                                message: '请选择是否付费',
                            },
                        ],
                    },
                    {
                        label: '开始时间',
                        field: 'fixBeginDate',
                        component: (
                            <DatePicker
                                placeholder="请选择开始时间"
                                showTime
                                onChange={this.pickStart}
                            />
                        ),
                    },
                    {
                        label: '结束时间',
                        field: 'fixEndDate',
                        component: (
                            <DatePicker
                                placeholder="请选择结束时间"
                                showTime
                                onChange={this.pickEnd}
                            />
                        ),
                    },
                    {
                        label: '维修时长',
                        field: 'fixDuration',
                        component: <InputNumber min={1} onChange={this.fixDurationChange} />,
                        rules: [
                            {
                                required: true,
                                message: '请填写维修时长',
                            },
                        ],
                    },
                    {
                        label: '人数',
                        field: 'humans',
                        component: <InputNumber min={1} onChange={this.humansChange} />,
                    },
                    {
                        label: '物料使用',
                        field: 'materialBill',
                        component: <MaterialChip onChange={this.materialChange} />,
                    },
                    {
                        label: '付款方式',
                        field: 'paymentMethod',
                        visible: isPaid,
                        component: (
                            <Radio.Group>
                                <Radio value="1">季度付</Radio>
                                <Radio value="2">付现</Radio>
                            </Radio.Group>
                        ),
                        rules: [
                            {
                                required: true,
                                message: '请选择付款方式',
                            },
                        ],
                    },
                    {
                        label: '物料费总计',
                        field: 'materialCosts',
                        visible: isPaid,
                        component: <InputNumber min={0} onChange={this.materialCostsChange} />,
                    },
                    {
                        label: '人工费总计',
                        visible: isPaid,
                        field: 'staffCosts',
                        component: <InputNumber min={0} onChange={this.staffCostsChange} />,
                    },
                    {
                        label: '维修费总计',
                        field: 'totalCosts',
                        visible: isPaid,
                        component: <InputNumber min={0} disabled />,
                    },
                ]
                const formItemLayout = {
                    labelCol: { span: 3 },
                    wrapperCol: { span: 14 },
                }
                return (
                    <FormView
                        wrappedComponentRef={ref => {
                            this.wrappedForm = ref
                        }}
                        formItemLayout={formItemLayout}
                        items={items}
                        onSubmit={this.onSubmit}
                        // onChange={this.onChange}
                        data={values}
                    />
                )
            }
        } else if (status > 1) {
            const { detail } = this.props
            const { category, classify, fault } = detail
            if (
                // 电梯类型
                category.indexOf('电梯') !== -1 ||
                classify.indexOf('电梯') !== -1 ||
                fault.indexOf('电梯') !== -1
            ) {
                return (
                    <Fragment>
                        <div style={{ margin: '15px 0' }}>{detail.repairTime}</div>
                        <Descriptions title="" column={1} size="small">
                            <Descriptions.Item label="设备编号">
                                {detail.equipmentNo}
                            </Descriptions.Item>
                            <Descriptions.Item label="维保单位">
                                {detail.maintenanceCom}
                            </Descriptions.Item>
                            <Descriptions.Item label="故障原因">
                                {detail.faultCause}
                            </Descriptions.Item>
                            <Descriptions.Item label="修复结果">
                                {detail.repairResult}
                            </Descriptions.Item>
                            <Descriptions.Item label="排除时间">
                                {detail.repairTime}
                            </Descriptions.Item>
                            <Descriptions.Item label="排除人">
                                {detail.repairWorker}
                            </Descriptions.Item>
                            <Descriptions.Item label="跟踪人意见">
                                {detail.opinion}
                            </Descriptions.Item>
                        </Descriptions>
                    </Fragment>
                )
            } else {
                const columns = [
                    {
                        title: '物料名称',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: '物料数量',
                        dataIndex: 'count',
                        key: 'count',
                    },
                    {
                        title: '物料单价',
                        dataIndex: 'price',
                        key: 'price',
                    },
                ]
                return (
                    <Fragment>
                        <div style={{ margin: '15px 0' }}>
                            {detail.fixBeginTime} - {detail.fixEndTime}
                        </div>
                        <Descriptions title="" column={1} size="small">
                            <Descriptions.Item label="维修结果">
                                {detail.fixResult}
                            </Descriptions.Item>
                            <Descriptions.Item label="维修说明">
                                <div style={{ width: '500px' }}>{detail.fixDesc}</div>
                            </Descriptions.Item>
                            <Descriptions.Item label="反馈图片">
                                <ImageView
                                    fileList={detail.fixImages && detail.fixImages.split(',')}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="是否付费">
                                {detail.isPaid === '1' ? '是' : '否'}
                            </Descriptions.Item>
                            <Descriptions.Item label="物料使用">
                                <Table
                                    bordered
                                    pagination={false}
                                    dataSource={
                                        detail.materialBill && JSON.parse(detail.materialBill)
                                    }
                                    columns={columns}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="维修时长">
                                {detail.fixDuration}
                            </Descriptions.Item>
                            <Descriptions.Item label="物料费总计">
                                {detail.materialCosts}
                            </Descriptions.Item>
                            <Descriptions.Item label="人工费总计">
                                {detail.staffCosts}
                            </Descriptions.Item>
                            <Descriptions.Item label="付款方式">
                                {detail.paymentMethod}
                            </Descriptions.Item>
                            <Descriptions.Item label="维修费总计">
                                {detail.totalCosts}
                            </Descriptions.Item>
                        </Descriptions>
                    </Fragment>
                )
            }
        } else {
            return <div />
        }
    }
}
export default Feedback
