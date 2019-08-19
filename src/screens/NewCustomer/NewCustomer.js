import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Breadcrumb, Input } from 'antd'
import { FormView } from 'components'
import theme from 'Theme'
const searchItems = [
    {
        label: '楼栋',
        field: 'name',
        component: <Input />,
    },
    {
        label: '房号',
        field: 'title',
        component: <Input />,
    },
    {
        label: '客户名称',
        field: 'name',
        component: <Input />,
    },
    {
        label: '应收款所属期',
        field: 'title',
        component: <Input />,
    },
    {
        label: '应缴截止日期',
        field: 'name',
        component: <Input />,
    },
    {
        label: '状态',
        field: 'title',
        component: <Input />,
    },
    {
        label: '楼栋',
        field: 'name',
        component: <Input />,
    },
    {
        label: '房号',
        field: 'title',
        component: <Input />,
    },
    {
        label: '客户名称',
        field: 'name',
        component: <Input />,
    },
    {
        label: '应收款所属期',
        field: 'title',
        component: <Input />,
    },
    {
        label: '应缴截止日期',
        field: 'name',
        component: <Input />,
    },
    {
        label: '状态',
        field: 'title',
        component: <Input />,
    },
    {
        label: '楼栋',
        field: 'name',
        component: <Input />,
    },
    {
        label: '房号',
        field: 'title',
        component: <Input />,
    },
    {
        label: '客户名称',
        field: 'name',
        component: <Input />,
    },
    {
        label: '应收款所属期',
        field: 'title',
        component: <Input />,
    },
    {
        label: '应缴截止日期',
        field: 'name',
        component: <Input />,
    },
    {
        label: '状态',
        field: 'title',
        component: <Input />,
    },
    {
        label: '楼栋',
        field: 'name',
        component: <Input />,
    },
    {
        label: '房号',
        field: 'title',
        component: <Input />,
    },
    {
        label: '客户名称',
        field: 'name',
        component: <Input />,
    },
]
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
export default class NewCustomer extends PureComponent {
    render() {
        return (
            <div className={theme.card}>
                <div className={theme.title}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <Link to="/bill">账单管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>新增客户</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={theme.content}>
                    <div style={{ width: '760px' }}>
                        <FormView
                            items={searchItems}
                            layout="inline"
                            saveBtn={false}
                            formItemLayout={formItemLayout}
                        />
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button type="primary" style={{ marginRight: '20px' }}>
                                保存
                            </Button>
                            <Button>取消</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
