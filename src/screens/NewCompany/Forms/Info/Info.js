import React, { PureComponent } from 'react'
import { Card, Input, Select, DatePicker, Modal } from 'antd'
import moment from 'moment'
import { UploadImg } from 'components'
import FormView from '../FormView2'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/newCompany'

import AutoComplete from './AutoComplete'

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
    handleSearch = word => {
        this.props.getSearchWord(word)
    }
    handleChange = word => {
        this.props.getSearchWord(word)
        console.log(word)
    }
    onSubmit = values => {
        console.log(values)
        values.companyId = sessionStorage.getItem('companyId')
        values.estiblishTime = moment(values.estiblishTime).format('YYYY-MM-DD')
        this.props.saveBasicInfo(values)
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
                component: <AutoComplete disabled={sessionStorage.companyId ? true : false} />,
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
                type: 'date',
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
        if (!sessionStorage.companyId) baseInfo = {} //新增时清空redux数据
        // 时间处理
        baseInfo.estiblishTime = moment(parseInt(baseInfo.estiblishTime))
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
            <Card title="企业信息" bordered={false}>
                <FormView items={items} data={baseInfo} onSubmit={this.onSubmit} />
            </Card>
        )
    }
}
export default Info
