import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Table, Input } from 'antd'
import { FormView } from 'components'
import theme from 'Theme'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
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
        label: '状态',
        field: 'title',
        component: <Input />,
    },
]
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
]
@connect(
    state => ({}),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
            },
            dispatch,
        )
    },
)
class Record extends PureComponent {
    render() {
        return (
            <div className={`${theme.content} ${theme.defaultBg}`}>
                <FormView
                    items={searchItems}
                    layout="inline"
                    saveBtn={false}
                    formItemLayout={formItemLayout}
                />
                <div className={theme.flex} style={{ margin: '15px 0' }}>
                    <Alert style={{ flex: 1 }} message="共100项" />
                    <div className={theme.btnGroup}>
                        <Button type="primary">清空</Button>
                        <Button type="primary">查询</Button>
                        <Button type="primary">批量导入</Button>
                        <Button type="primary">批量核对</Button>
                    </div>
                </div>
                <Table
                    style={{ background: '#fff' }}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ hideOnSinglePage: true }}
                    onRow={record => {
                        return {
                            onClick: event => {
                                this.props.push('/record/detail')
                            }, // 点击行
                        }
                    }}
                />
            </div>
        )
    }
}
export default Record
