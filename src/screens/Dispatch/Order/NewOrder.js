import React, { PureComponent } from 'react'
import { Input, Cascader, Radio, Select } from 'antd'
import { FormView, PicturesWall } from 'components'

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
        addressType: buildTree(state.repair.addressType),
        repairsType: buildTree(state.repair.repairsType),
        repairs: state.dispatch.repairs,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getRepairs: actions('getRepairs'),
            getAddressType: repairActions('getAddressType'),
            getRepairsType: repairActions('getRepairsType'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class NewOrder extends PureComponent {
    state = {
        lift: false, //电梯
        trappedFlag: false,
        values: {
            isStuck: 2, //默认值
        },
    }
    componentDidMount() {
        this.props.getAddressType()
        this.props.getRepairsType({
            level: '3',
        })
    }
    onChange = changedFields => {
        const { form } = this.wrappedForm.props
        // console.log(changedFields.applyType)
        // 是否困人
        if (changedFields.isStuck) {
            const { isStuck } = changedFields
            // 存放当前表单值
            this.setState({
                values: { ...this.state.values, ...form.getFieldsValue() },
            })
            // 是否困人
            if (isStuck.value === 1) {
                this.setState({
                    trappedFlag: true,
                })
            } else {
                this.setState({
                    trappedFlag: false,
                })
            }
        }
    }
    typeChange = (value, selectedOptions) => {
        const leaf = selectedOptions[selectedOptions.length - 1]
        const { form } = this.wrappedForm.props
        // 报修类型包含电梯
        if (value.includes('电梯')) {
            this.setState({
                lift: true,
                trappedFlag: false,
            })
        } else {
            this.setState({
                lift: false,
                trappedFlag: false,
            })
        }
        this.setState({
            values: {
                ...this.state.values,
                ...form.getFieldsValue(),
                applyType: value,
            },
        })
        this.props.getRepairs({
            typeNodeId: leaf.id,
        })
    }
    render() {
        const { lift, trappedFlag, values } = this.state
        const { repairs } = this.props
        const items = [
            {
                label: '报修位置',
                field: 'repairLocation',
                component: (
                    <Cascader
                        placeholder="请选择地址"
                        options={this.props.addressType}
                        changeOnSelect
                    />
                ),
                rules: [
                    {
                        required: true,
                        message: '请选择报修位置',
                    },
                ],
            },
            {
                label: '详细地址',
                field: 'repairAddress',
                component: <Input />,
            },
            {
                label: '报修类型',
                field: 'applyType',
                rules: [
                    {
                        required: true,
                        message: '请选择报修类型',
                    },
                ],
                component: (
                    <Cascader
                        placeholder="请选择报修类型"
                        options={this.props.repairsType}
                        changeOnSelect
                        onChange={this.typeChange}
                    />
                ),
            },
            {
                label: '故障描述',
                field: 'faultDesc',
                component: <Input.TextArea autosize={{ minRows: 4 }} />,
                rules: [
                    {
                        required: true,
                        message: '请填写故障描述且不能多于500字',
                        max: 500,
                    },
                ],
            },
            {
                label: '是否困人',
                field: 'isStuck',
                visible: lift,
                //initialValue: 1,
                component: (
                    <Radio.Group>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </Radio.Group>
                ),
            },
            {
                label: '被困人数',
                field: 'stuckNum',
                visible: lift && trappedFlag,
                component: <Input />,
            },
            {
                label: '故障图片',
                field: 'faultImages',
                component: <PicturesWall />,
            },
            {
                label: '派工描述',
                field: 'dispatchDesc',
                component: <Input.TextArea autosize={{ minRows: 4 }} />,
                rules: [
                    {
                        message: '不能多于500字',
                        max: 500,
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
                        message: '请选择地址',
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
                        message: '请选择地址',
                    },
                ],
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        const { forwardedRef } = this.props //传递ref
        return (
            <FormView
                ref={forwardedRef}
                wrappedComponentRef={ref => {
                    this.wrappedForm = ref
                }}
                formItemLayout={formItemLayout}
                items={items}
                data={values}
                onChange={this.onChange}
                saveBtn={false}
            />
        )
    }
}
export default NewOrder
