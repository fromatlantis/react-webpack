import React, { PureComponent } from 'react'
import { Card, Input, Select, DatePicker, Modal, Divider } from 'antd'
import moment from 'moment'
import { UploadImg, FormView } from 'components'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/newCompany'
import { actions as configureActions } from 'reduxDir/configure'
import AutoComplete from './AutoComplete'
import Toolbar from '../../Toolbar/Toolbar'

const Option = Select.Option
const mapStateToProps = state => {
    return {
        baseInfo: state.newCompany.baseInfo,
        loadAll: state.newCompany.loadAll,
        // complate: state.loading.complate,
        industryList: state.configure.industryList,
        qualityList: state.configure.qualityList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            saveBasicInfo: actions('saveBasicInfo'),
            queryBasicInfoDetial: actions('queryBasicInfoDetial'),
            loadEnterpriseInfo: actions('loadEnterpriseInfo'),
            updateBasicInfo: actions('updateBasicInfo'),
            changeBasicInfoApprove: actions('changeBasicInfoApprove'),
            storeLoadAll: actions('storeLoadAll'),
            getLabelList: configureActions('getLabelList'),
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
        this.props.getLabelList({ type: 'industry' })
        this.props.getLabelList({ type: 'qualification' })
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
            const { industries, qualification, ...basicInfo } = values
            const { baseInfo, saveBasicInfo } = this.props
            basicInfo.companyId = baseInfo.companyId
            saveBasicInfo({
                basicInfo,
                industries: industries.join(','),
                qualification: qualification.join(','),
            })
        } else {
            // 编辑
            const { baseInfo, updateBasicInfo } = this.props
            const { industries = [], qualification = [], ...basicInfo } = values
            updateBasicInfo({
                basicInfo: {
                    keyId: baseInfo.keyId,
                    parkId: baseInfo.parkId,
                    tenantId: baseInfo.tenantId,
                    ...basicInfo,
                },
                industries: industries.join(','),
                qualification: qualification.join(','),
            })
        }
    }
    render() {
        const { industryList, qualityList } = this.props
        const items = [
            {
                label: '企业名称',
                field: 'name',
                rules: [
                    {
                        required: true,
                        message: '未找到相关企业的工商信息',
                    },
                ],
                component: (
                    <AutoComplete disabled={sessionStorage.companyId !== '000000' ? true : false} />
                ),
            },
            {
                label: '企业logo',
                field: 'logo',
                component: <UploadImg />,
            },
            {
                label: '企业税号',
                field: 'creditCode',
                rules: [
                    {
                        required: true,
                        message: '请输入信息',
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
                        message: '请输入信息',
                    },
                ],
                formatter: estiblishTime => {
                    return moment(estiblishTime)
                },
                component: <DatePicker />,
            },
            {
                label: '法定代表人',
                field: 'legalPersonName',
                rules: [
                    {
                        required: true,
                        message: '请输入信息',
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
                        message: '请输入信息',
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
                        message: '请输入信息',
                    },
                ],
                component: <Input />,
            },
            {
                label: '企业邮箱',
                field: 'email',
                component: <Input />,
            },
            {
                label: '企业地址',
                field: 'regLocation',
                rules: [
                    {
                        required: true,
                        message: '请输入信息',
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
                        message: '请输入信息',
                    },
                ],
                component: (
                    <Select>
                        <Option value="1">实驻企业</Option>
                        <Option value="2">虚拟企业</Option>
                    </Select>
                ),
            },
            {
                label: '企业分级',
                field: 'companyLevel',
                initialValue: 'A',
                rules: [
                    {
                        required: true,
                        message: '请输入信息',
                    },
                ],
                component: (
                    <Select>
                        <Option value="A">A级</Option>
                        <Option value="B">B级</Option>
                        <Option value="C">C级</Option>
                        <Option value="D">D级</Option>
                    </Select>
                ),
            },
            {
                label: '引入时间',
                field: 'introduceTime',
                formatter: introduceTime => {
                    return moment(introduceTime)
                },
                component: <DatePicker />,
            },
            {
                label: '行业标签',
                field: 'industries',
                component: (
                    <Select mode="multiple" placeholder="请选择行业标签">
                        {industryList.map(item => (
                            <Option value={item.id}>{item.label}</Option>
                        ))}
                    </Select>
                ),
            },
            {
                label: '资质标签',
                field: 'qualification',
                component: (
                    <Select mode="multiple" placeholder="请选择资质标签">
                        {qualityList.map(item => (
                            <Option value={item.id}>{item.label}</Option>
                        ))}
                    </Select>
                ),
            },
            {
                component: <Divider style={{ marginLeft: '15%' }}>企业联系人</Divider>,
            },
            {
                label: '联系人',
                field: 'linkman',
                component: <Input />,
            },
            {
                label: '联系人手机号',
                field: 'linkPhone',
                component: <Input />,
            },
            {
                label: '联系人邮箱',
                field: 'linkEmail',
                component: <Input />,
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
                onCancel: () => {
                    this.props.storeLoadAll('no')
                },
            })
        // alert(this.props.complate)
        return (
            <Card title="企业信息" bordered={false} extra={<Toolbar />}>
                <FormView
                    items={items}
                    data={baseInfo}
                    onSubmit={this.onSubmit}
                    // loading={!this.props.complate}
                />
            </Card>
        )
    }
}
export default Info
