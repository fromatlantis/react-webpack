import React, { PureComponent } from 'react'

import { Input, Cascader, Select } from 'antd'
import { FormView } from 'components'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/dispatch'
import { actions as repairActions } from 'reduxDir/repair'
const { Option } = Select
const buildTree = data => {
    let result = data
        .map(item => ({
            value: item.id,
            label: item.typeName,
            id: item.id,
            pid: item.pid,
        }))
        .reduce((prev, item) => {
            prev[item.pid] ? prev[item.pid].push(item) : (prev[item.pid] = [item])
            return prev
        }, {})
    for (let prop in result) {
        result[prop].forEach(function(item, i) {
            //console.log(item)
            if (result[item.id]) {
                item.children = result[item.id]
            }
        })
    }
    return result[0]
}
const mapStateToProps = state => {
    return {
        repairsType: buildTree(state.repair.repairsType),
        repairs: state.dispatch.repairs,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getRepairs: actions('getRepairs'),
            getRepairsType: repairActions('getRepairsType'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class DispatchForm extends PureComponent {
    state = {
        values: {},
    }
    componentDidMount() {
        this.props.getRepairsType()
    }
    onChange = changedFields => {
        const { form } = this.wrappedForm.props
        if (changedFields.applyType) {
            const { applyType } = changedFields
            // 存放当前表单值
            this.setState({
                values: form.getFieldsValue(),
            })
            this.props.getRepairs({
                typeNodeId: applyType.value[applyType.value.length - 1],
            })
        }
    }
    render() {
        const { repairs } = this.props
        const items = [
            {
                label: '派工类型',
                field: 'applyType',
                component: (
                    <Cascader
                        placeholder="请选择报修类型"
                        options={this.props.repairsType}
                        changeOnSelect
                    />
                ),
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '服务类型',
                field: 'serviceType',
                component: (
                    <Select placeholder="请选择服务类型">
                        <Option value="公区">公区</Option>
                        <Option value="业户">业户</Option>
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '维修/跟踪人',
                field: 'maintainers',
                component: (
                    <Select placeholder="请选择维修/跟踪人" mode="multiple">
                        {repairs.map(item => (
                            <Option value={item.userId}>{item.userName}</Option>
                        ))}
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '派工说明',
                field: 'dispatchDesc',
                rules: [
                    {
                        message: '不能多于500字',
                        max: 500,
                    },
                ],
                component: <Input.TextArea autosize={{ minRows: 4 }} />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        const { values } = this.state
        return (
            <FormView
                wrappedComponentRef={ref => {
                    this.wrappedForm = ref
                }}
                formItemLayout={formItemLayout}
                items={items}
                saveBtn={false}
                data={values}
                onChange={this.onChange}
            />
        )
    }
}
export default DispatchForm
