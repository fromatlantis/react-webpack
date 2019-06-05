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
            value: item.typeName,
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
        repairDetail: state.repair.repairDetail,
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
        this.props.getRepairsType({
            level: '3',
        })
    }
    changeApplyType = (value, selectedOptions) => {
        const { form } = this.wrappedForm.props
        const leaf = selectedOptions[selectedOptions.length - 1]
        this.setState({
            values: {
                ...form.getFieldsValue(),
                applyType: value,
            },
        })
        this.props.getRepairs({
            typeNodeId: leaf.id,
        })
    }
    render() {
        const { repairs, repairDetail, forwardedRef } = this.props
        const items = [
            {
                label: '派工类型',
                field: 'applyType',
                component: (
                    <Cascader
                        placeholder="请选择报修类型"
                        options={this.props.repairsType}
                        changeOnSelect
                        onChange={this.changeApplyType}
                    />
                ),
                rules: [
                    {
                        required: true,
                        message: '请选择报修类型',
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
                        message: '请选择服务类型',
                    },
                ],
            },
            {
                label: '维修/跟踪人',
                field: 'maintainersId',
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
                        message: '请选择维修/跟踪人',
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
        // 派工类型默认展示报修类型
        // let applyType = []
        // if (repairDetail.category) {
        //     applyType.push(repairDetail.category)
        // }
        // if (repairDetail.classify) {
        //     applyType.push(repairDetail.classify)
        // }
        // if (repairDetail.fault) {
        //     applyType.push(repairDetail.fault)
        // }
        // values.applyType = applyType
        return (
            <FormView
                ref={forwardedRef}
                wrappedComponentRef={ref => {
                    this.wrappedForm = ref
                }}
                formItemLayout={formItemLayout}
                items={items}
                saveBtn={false}
                data={values}
            />
        )
    }
}
export default DispatchForm
