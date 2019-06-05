import React, { PureComponent } from 'react'

import { Input, Select } from 'antd'
import { FormView } from 'components'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/dispatch'

const { Option } = Select

const mapStateToProps = state => {
    return {
        companyDispatchorList: state.dispatch.companyDispatchorList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getCompanyDispatchorList: actions('getCompanyDispatchorList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class TransferForm extends PureComponent {
    componentDidMount() {
        this.props.getCompanyDispatchorList()
    }
    render() {
        const { companyDispatchorList, forwardedRef } = this.props
        const items = [
            {
                label: '接收人员',
                field: 'transferId',
                component: (
                    <Select style={{ width: 200 }} placeholder="请选择接受人员">
                        {companyDispatchorList.map(item => (
                            <Option value={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                        message: '请选择接受人员',
                    },
                ],
            },
            {
                label: '转办说明',
                field: 'transferDesc',
                component: <Input.TextArea autosize={{ minRows: 4 }} />,
                rules: [
                    {
                        message: '请填写故障描述且不能多于500字',
                        max: 500,
                    },
                ],
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        return (
            <FormView
                ref={forwardedRef}
                formItemLayout={formItemLayout}
                items={items}
                saveBtn={false}
            />
        )
    }
}
export default TransferForm
