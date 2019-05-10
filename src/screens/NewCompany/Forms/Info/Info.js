import React, { PureComponent } from 'react'
import { Card, Input, Icon, AutoComplete } from 'antd'
import { UploadImg } from 'components'
import formView from '../FormView'
export default class Info extends PureComponent {
    search = () => {
        alert('11')
    }
    render() {
        const dataSource = ['12345', '23456', '34567']
        const items = [
            {
                label: '公司名称',
                field: 'name',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: (
                    <AutoComplete
                        dropdownMatchSelectWidth={false}
                        dropdownStyle={{ width: 300 }}
                        size="large"
                        style={{ width: '100%' }}
                        dataSource={dataSource}
                        placeholder="请输入企业名称"
                        optionLabelProp="value"
                        onChange={this.search}
                    >
                        <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                    </AutoComplete>
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
                field: 'logo',
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
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '银行账户',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '成立时间',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '法定代表人',
                field: 'logo',
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
                field: 'logo',
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
                field: 'logo',
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
                field: 'logo',
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
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
        ]
        const FormView = formView({ items, data: { name: '123' } })
        return (
            <Card title="企业信息" bordered={false}>
                <FormView url="123" />
            </Card>
        )
    }
}
