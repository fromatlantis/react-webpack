import React, { PureComponent } from 'react'
import { Card, Input, Icon, DatePicker, Select } from 'antd'

import formView from '../FormView'

const Option = Select.Option

export default class Business extends PureComponent {
    render() {
        const items = [
            {
                label: '法定代表人',
                field: 'name',
                component: <Input />,
            },
            {
                label: '成立日期',
                field: 'date',
                component: <DatePicker />,
            },
            {
                label: '营业状态',
                field: 'name',
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
                field: 'name',
                component: <Input />,
            },
            {
                label: '实缴资本',
                field: 'name',
                component: <Input />,
            },
            {
                label: '企业类型',
                field: 'name',
                component: <Input />,
            },
            {
                label: '参保人数',
                field: 'name',
                component: <Input />,
            },
            {
                label: '所属行业',
                field: 'name',
                component: <Input />,
            },
            {
                label: '统一社会信用代码',
                field: 'name',
                component: <Input />,
            },
            {
                label: '进出口企业代码',
                field: 'name',
                component: <Input />,
            },
            {
                label: '工商注册号',
                field: 'name',
                component: <Input />,
            },
            {
                label: '组织机构代码',
                field: 'name',
                component: <Input />,
            },
            {
                label: '英文名',
                field: 'name',
                component: <Input />,
            },
            {
                label: '曾用名',
                field: 'name',
                component: <Input />,
            },
            {
                label: '企业地址',
                field: 'name',
                component: <Input />,
            },
            {
                label: '所属地区',
                field: 'name',
                component: <Input />,
            },
            {
                label: '营业期限',
                field: 'name',
                component: <Input />,
            },
            {
                label: '核准日期',
                field: 'name',
                component: <Input />,
            },
            {
                label: '登记机关',
                field: 'name',
                component: <Input />,
            },
            {
                label: '经营范围',
                field: 'name',
                component: <Input />,
            },
        ]
        const FormView = formView({ items, data: {} })
        return (
            <Card title="工商信息" bordered={false}>
                <FormView url="123" layout="inline" />
            </Card>
        )
    }
}
