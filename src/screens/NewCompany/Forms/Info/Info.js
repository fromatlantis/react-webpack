import React, { PureComponent } from 'react'
import { Card, Input, Select, DatePicker, Modal } from 'antd'
import moment from 'moment'
import { UploadImg, FormView } from 'components'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/newCompany'

import AutoComplete from './AutoComplete'
import Toolbar from '../../Toolbar/Toolbar'

const Option = Select.Option
const mapStateToProps = state => {
    return {
        baseInfo: state.newCompany.baseInfo,
        loadAll: state.newCompany.loadAll,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            saveBasicInfo: actions('saveBasicInfo'),
            queryBasicInfoDetial: actions('queryBasicInfoDetial'),
            loadEnterpriseInfo: actions('loadEnterpriseInfo'),
            changeBasicInfoApprove: actions('changeBasicInfoApprove'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Info extends PureComponent {
    state = {
        dataSource: [],
    }
    componentDidMount = () => {
        const companyId = sessionStorage.getItem('companyId')
        if (companyId) {
            this.props.queryBasicInfoDetial(companyId)
        }
    }
    onSubmit = values => {
        const companyId = sessionStorage.getItem('companyId')
        values.estiblishTime = moment(values.estiblishTime.format('YYYY-MM-DD')).format('x')
        if (companyId === '000000') {
            // 新增
            const { baseInfo, saveBasicInfo } = this.props
            values.companyId = baseInfo.companyId
            saveBasicInfo(values)
        } else {
            // 编辑
            const { baseInfo, changeBasicInfoApprove } = this.props
            changeBasicInfoApprove({ ...baseInfo, ...values })
        }
    }
    render() {
        const items = [
            {
                label: '企业名称',
                field: 'name',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: (
                    <AutoComplete disabled={sessionStorage.companyId !== '000000' ? true : false} />
                ),
            },
            {
                label: '企业logo',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <UploadImg />,
            },
            {
                label: '企业税号',
                field: 'creditCode',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '开户银行',
                field: 'depositBank',
                component: <Input />,
            },
            {
                label: '银行账户',
                field: 'bankAccount',
                component: <Input />,
            },
            {
                label: '成立时间',
                field: 'estiblishTime',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                formatter: estiblishTime => {
                    return moment(parseInt(estiblishTime))
                },
                component: <DatePicker />,
            },
            {
                label: '法定代表人',
                field: 'legalPersonName',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '注册资金',
                field: 'regCapital',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '联系电话',
                field: 'phoneNumber',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '企业邮箱',
                field: 'email',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '企业地址',
                field: 'regLocation',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '企业类型',
                field: 'category',
                initialValue: '1',
                rules: [
                    {
                        required: true,
                        message: '请输入企业类型',
                    },
                ],
                component: (
                    <Select>
                        <Option value="1">实驻企业</Option>
                        <Option value="2">虚拟企业</Option>
                    </Select>
                ),
            },
        ]
        let { loadAll, baseInfo } = this.props
        // 时间处理
        if (baseInfo.estiblishTime) {
            console.log(baseInfo.estiblishTime)
            //baseInfo.estiblishTime = moment(parseInt(baseInfo.estiblishTime))
        }
        loadAll === 'yes' &&
            Modal.confirm({
                title: '是否保存其他信息?',
                content: '点击确定初始化其他全部信息',
                onOk: () => {
                    this.props.loadEnterpriseInfo()
                },
                onCancel() {
                    console.log('Cancel')
                },
            })
        return (
            <Card title="企业信息" bordered={false} extra={<Toolbar />}>
                <FormView items={items} data={baseInfo} onSubmit={this.onSubmit} />
            </Card>
        )
    }
}
export default Info
