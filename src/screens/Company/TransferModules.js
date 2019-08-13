import React, { PureComponent } from 'react'
import { Select, TreeSelect } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/company'
import { FormView } from 'components'
const { Option } = Select
const buildTree = data => {
    let result = data
        .map(item => ({
            label: item.model,
            value: item.modelKey,
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
    if (result[0]) {
        result[0].unshift({
            label: '全部',
            value: 'allModel',
        })
    }
    return result[0]
}
@connect(
    state => {
        return {
            auths: state.authUser.auths,
            principal: state.company.principal,
            serviceModel: state.company.serviceModel,
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                getPrincipalList: actions('getPrincipalList'),
                getServiceModel: actions('getServiceModel'),
            },
            dispatch,
        )
    },
)
class TransferModules extends PureComponent {
    componentDidMount() {
        const { auths } = this.props
        let auth = ''
        if (auths.includes('企服领导')) {
            auth = '企服人员'
        } else if (auths.includes('招商总监')) {
            auth = '招商专员'
        }
        this.props.getPrincipalList({
            auth,
        })
        this.props.getServiceModel()
    }
    render() {
        const { auths, principal, serviceModel, forwardedRef } = this.props
        let label = ''
        if (auths.includes('企服领导')) {
            label = '企服'
        } else if (auths.includes('招商总监')) {
            label = '招商'
        }
        return (
            <FormView
                ref={forwardedRef}
                wrappedComponentRef={ref => {
                    this.wrappedForm = ref
                }}
                formItemLayout={{ labelCol: { span: 7 }, wrapperCol: { span: 13 } }}
                items={[
                    {
                        label: `${label}负责人`,
                        field: 'person',
                        rules: [
                            {
                                required: true,
                                message: '请选择负责人',
                            },
                        ],
                        component: (
                            <Select placeholder="请选择负责人">
                                {principal.map(item => (
                                    <Option value={`${item.userId}-${item.userName}`}>
                                        {item.userName}
                                    </Option>
                                ))}
                            </Select>
                        ),
                    },
                    {
                        label: `${label}服务模块`,
                        field: 'modelKeys',
                        rules: [
                            {
                                required: true,
                                message: '请选择服务模块',
                            },
                        ],
                        component: (
                            <TreeSelect
                                multiple
                                placeholder="请选择服务模块"
                                style={{ width: 300 }}
                                dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                                treeData={buildTree(serviceModel)}
                                treeDefaultExpandAll
                                treeNodeLabelProp="label"
                            />
                        ),
                    },
                ]}
                saveBtn={false}
            />
        )
    }
}
export default TransferModules
