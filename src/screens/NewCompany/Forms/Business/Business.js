import React, { PureComponent } from 'react'
import { Card, Input, Icon, DatePicker, Select } from 'antd'

import FormView from '../FormView2'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/business'

import styles from './Business.module.css'

const Option = Select.Option

const mapStateToProps = state => {
    return {
        businessInfo: state.business.businessInfo,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            queryBaseInfoDetial: actions('queryBaseInfoDetial'),
            changeBaseInfoApprove: actions('changeBaseInfoApprove'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Business extends PureComponent {
    componentDidMount = () => {
        const companyId = sessionStorage.getItem('companyId')
        if (companyId) {
            this.props.queryBaseInfoDetial(companyId)
        }
    }
    render() {
        const items = [
            {
                label: '法定代表人',
                field: 'legalPersonName',
                component: <Input />,
            },
            {
                label: '成立日期',
                field: 'estiblishTime',
                component: <Input />,
            },
            {
                label: '营业状态',
                field: 'regStatus',
                component: (
                    <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                ),
            },
            {
                label: '注册资本',
                field: 'regCapital',
                component: <Input />,
            },
            {
                label: '实缴资本',
                field: 'actualCapital',
                component: <Input />,
            },
            {
                label: '企业类型',
                field: 'companyOrgType',
                component: <Input />,
            },
            {
                label: '参保人数',
                field: 'socialStaffNum',
                component: <Input />,
            },
            {
                label: '所属行业',
                field: 'industry',
                component: <Input />,
            },
            {
                label: '统一社会信用代码',
                field: 'creditCode',
                component: <Input />,
            },
            // {
            //     label: '进出口企业代码',
            //     field: 'name',
            //     component: <Input />,
            // },
            {
                label: '工商注册号',
                field: 'regNumber',
                component: <Input />,
            },
            {
                label: '组织机构代码',
                field: 'orgNumber',
                component: <Input />,
            },
            {
                label: '英文名',
                field: 'property3',
                component: <Input />,
            },
            {
                label: '曾用名',
                field: 'historyNames',
                component: <Input />,
            },
            {
                label: '企业地址',
                field: 'regLocation',
                component: <Input />,
            },
            {
                label: '所属地区',
                field: 'base',
                component: <Input />,
            },
            {
                label: '营业期限',
                field: 'toTime',
                component: <Input />,
            },
            {
                label: '核准日期',
                field: 'approvedTime',
                component: <Input />,
            },
            {
                label: '登记机关',
                field: 'regInstitute',
                component: <Input />,
            },
            {
                label: '经营范围',
                field: 'businessScope',
                style: { width: '90%', marginTop: '5px' },
                component: <Input.TextArea autosize={{ minRows: 3, maxRows: 6 }} />,
            },
        ]
        const { businessInfo } = this.props
        return (
            <Card title="工商信息" bordered={false} className={styles.root}>
                <FormView layout="inline" items={items} data={businessInfo} />
            </Card>
        )
    }
}
export default Business
