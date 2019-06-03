import React, { PureComponent, Fragment } from 'react'

import { Descriptions, Input, InputNumber, DatePicker, Radio } from 'antd'
import { FormView } from 'components'
import MaterialChip from './MaterialChip'
export default class Feedback extends PureComponent {
    state = {
        isPaid: false,
        values: {
            // 默认值
            fixResult: '完成',
            isPaid: '0',
        },
    }
    onSubmit = values => {
        console.log(values)
    }
    onChange = changedFields => {
        const { form } = this.wrappedForm.props
        // 报修类型联动
        if (changedFields.isPaid) {
            // 存放当前表单值
            this.setState({
                values: {
                    ...this.state.values,
                    ...form.getFieldsValue(),
                },
            })
            const { isPaid } = changedFields
            if (isPaid.value) {
                this.setState({
                    isPaid: true,
                })
            } else {
                this.setState({
                    isPaid: false,
                })
            }
        }
    }
    render() {
        const { current } = this.props
        const { isPaid, values } = this.state
        console.log(values)
        const items = [
            {
                label: '维修结果',
                field: 'fixResult',
                // initialValue: '完成',
                component: (
                    <Radio.Group>
                        <Radio value="未完成">未完成</Radio>
                        <Radio value="完成">完成</Radio>
                        <Radio value="业主外判维修">业主外判维修</Radio>
                    </Radio.Group>
                ),
            },
            {
                label: '维修说明',
                field: 'fixDesc',
                component: <Input.TextArea autosize={{ minRows: 4 }} />,
            },
            {
                label: '反馈图片',
                field: 'fixImages',
                component: <Input />,
            },
            {
                label: '物料使用',
                field: 'materialBill',
                component: <MaterialChip />,
            },
            {
                label: '是否付费',
                field: 'isPaid',
                // initialValue: '0',
                component: (
                    <Radio.Group>
                        <Radio value="1">是</Radio>
                        <Radio value="0">否</Radio>
                    </Radio.Group>
                ),
            },
            {
                label: '开始时间',
                field: 'fixBeginDate',
                component: <DatePicker />,
            },
            {
                label: '结束时间',
                field: 'fixEndDate',
                component: <DatePicker />,
            },
            {
                label: '维修时长',
                field: 'fixDuration',
                component: <InputNumber min={1} />,
            },
            {
                label: '人数',
                field: 'humans',
                component: <InputNumber min={1} />,
            },
            {
                label: '付款方式',
                field: 'paymentMethod',
                visible: isPaid,
                component: (
                    <Radio.Group>
                        <Radio value={1}>季度付</Radio>
                        <Radio value={2}>付现</Radio>
                    </Radio.Group>
                ),
            },
            {
                label: '物料费总计',
                field: 'materialCosts',
                visible: isPaid,
                component: <InputNumber min={1} />,
            },
            {
                label: '人工费总计',
                visible: isPaid,
                field: 'staffCosts',
                component: <InputNumber min={1} />,
            },
            {
                label: '维修费总计',
                field: 'totalCosts',
                visible: isPaid,
                component: <Input />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
        }
        const { detail } = this.props
        const status = parseInt(detail.repairStatus)
        if (status === 1) {
            return (
                <FormView
                    wrappedComponentRef={ref => {
                        this.wrappedForm = ref
                    }}
                    formItemLayout={formItemLayout}
                    items={items}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    data={values}
                />
            )
        } else if (status > 1) {
            const { detail } = this.props
            return (
                <Fragment>
                    <div style={{ margin: '15px 0' }}>
                        {detail.fixBeginDate} - {detail.fixEndDate}
                    </div>
                    <Descriptions title="" column={1} size="small">
                        <Descriptions.Item label="维修结果">{detail.fixResult}</Descriptions.Item>
                        <Descriptions.Item label="维修说明">
                            {' '}
                            <div style={{ width: '500px' }}>{detail.fixDesc}</div>
                        </Descriptions.Item>
                        <Descriptions.Item label="反馈图片">{detail.fixImages}</Descriptions.Item>
                        <Descriptions.Item label="是否付费">{detail.isPaid}</Descriptions.Item>
                        <Descriptions.Item label="物料使用">
                            {detail.materialBill}
                        </Descriptions.Item>
                        <Descriptions.Item label="维修时长">{detail.fixDuration}</Descriptions.Item>
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
        } else {
            return <div />
        }
    }
}
