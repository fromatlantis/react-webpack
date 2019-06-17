import React, { PureComponent } from 'react'
import { Card, Input, Cascader, Radio, message } from 'antd'
import { FormView, PicturesWall } from 'components'
import request from '../../../utils/request'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/repair'
import { actions as dispatchActions } from 'reduxDir/dispatch'

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
        user: state.authUser.user,
        addressType: buildTree(state.repair.addressType),
        repairsType: buildTree(state.repair.repairsType),
        dispatchors: state.dispatch.dispatchors,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getAddressType: actions('getAddressType'),
            getRepairsType: actions('getRepairsType'),
            applyRepair: actions('applyRepair'),
            getDispatchor: dispatchActions('getDispatchor'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Apply extends PureComponent {
    state = {
        lift: false, //电梯
        trappedFlag: false,
        values: {
            reporterContactWay: this.props.user.phone,
            isStuck: 2,
        },
    }
    componentDidMount() {
        this.props.getAddressType()
        this.props.getRepairsType({
            level: '3',
        })
    }
    async getDispatchor(addressId) {
        const res = await request({
            url: '/property/getDispatchor',
            data: {
                addressNodeId: addressId,
            },
        })
        return res
    }
    onChange = changedFields => {
        const { form } = this.wrappedForm.props
        // 报修类型联动
        if (changedFields.applyType) {
            const { applyType } = changedFields
            // 存放当前表单值
            this.setState({
                values: { ...this.state.values, ...form.getFieldsValue() },
            })
            // 报修类型包含电梯
            if (applyType.value.includes('电梯')) {
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
        }
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
    onSubmit = values => {
        var formData = new FormData()
        formData.append('repairLocation', values.repairLocation.join(''))
        if (values.repairAddress) {
            formData.append('repairAddress', values.repairAddress)
        }
        formData.append('reporterContactWay', values.reporterContactWay)
        if (values.applyType) {
            if (values.applyType.length === 1) {
                formData.append('category', values.applyType[0])
            } else if (values.applyType.length === 2) {
                formData.append('category', values.applyType[0])
                formData.append('classify', values.applyType[1])
            } else if (values.applyType.length === 3) {
                formData.append('category', values.applyType[0])
                formData.append('classify', values.applyType[1])
                formData.append('fault', values.applyType[2])
            }
        }
        formData.append('faultDesc', values.faultDesc)
        if (values.isStuck) {
            formData.append('isStuck', values.isStuck)
            if (values.stuckNum) {
                formData.append('stuckNum', values.stuckNum)
            }
        }
        if (values.faultImages) {
            values.faultImages.forEach(item => {
                formData.append('faultImages', item)
            })
        }
        // 派工人员
        const { dispatchors } = this.props
        formData.append('dispatchors', JSON.stringify({ dispatchors }))
        // if (dispatchors.length > 0) {
        //     formData.append('dispatcherId', dispatchors[0].userId)
        //     formData.append('dispatcherName', dispatchors[0].userName)
        // }
        this.props.applyRepair(formData)
    }
    // 切换地址
    changeAddress = (value, selectedOptions) => {
        const leaf = selectedOptions[selectedOptions.length - 1]
        const { form } = this.wrappedForm.props
        this.setState({
            values: {
                ...this.state.values,
                ...form.getFieldsValue(),
                repairLocation: value,
            },
        })
        if (leaf) {
            this.props.getDispatchor({
                addressNodeId: leaf.id,
            })
        }
    }
    render() {
        const { lift, trappedFlag, values } = this.state
        const items = [
            {
                label: '报修地址',
                field: 'repairLocation',
                rules: [
                    {
                        required: true,
                        message: '请选择地址',
                    },
                ],
                component: (
                    <Cascader
                        placeholder="请选择地址"
                        options={this.props.addressType}
                        onChange={this.changeAddress}
                        changeOnSelect
                    />
                ),
            },
            {
                label: '详细地址',
                field: 'repairAddress',
                component: <Input />,
            },
            {
                label: '报修类型',
                field: 'applyType',
                component: (
                    <Cascader
                        placeholder="请选择报修类型"
                        options={this.props.repairsType}
                        changeOnSelect
                    />
                ),
            },
            {
                label: '故障描述',
                field: 'faultDesc',
                rules: [
                    {
                        required: true,
                        message: '故障描述不能为空且不能多于500字',
                        max: 500,
                    },
                ],
                component: <Input.TextArea autosize={{ minRows: 4 }} />,
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
                label: '联系方式',
                field: 'reporterContactWay',
                component: <Input />,
                rules: [
                    {
                        required: true,
                        message: '请输入正确手机号',
                        pattern: /^1\d{10}$/,
                    },
                ],
            },
            // {
            //     label: '派工人员ID',
            //     field: 'dispatcherId',
            //     component: <Input />,
            //     visible: false,
            // },
            // {
            //     label: '派工人员名称',
            //     field: 'dispatcherName',
            //     component: <Input />,
            //     visible: false,
            // },
        ]
        return (
            <Card title="申请报修" bordered={false}>
                <FormView
                    wrappedComponentRef={ref => {
                        this.wrappedForm = ref
                    }}
                    items={items}
                    data={values}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />
            </Card>
        )
    }
}
export default Apply
