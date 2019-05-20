import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker, Divider } from 'antd'

import FormView from '../FormView2'
import styles from './Trademark.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/trademark'

const mapStateToProps = state => {
    return {
        trademark: state.trademark.trademark,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getTrademarkList: actions('getTrademarkList'),
        },
        dispatch,
    )
}

const dataSource = [
    {
        key: '1',
        tmName: 'REMODEO',
        tmType: '普通商标',
        regNo: '36941601',
        category: '商标注册申请-受理通知书发文-结束',
        appDate: '2019-03-04',
        expire: '2022-03-05',
        company: 'XX有限公司',
        status: '结束',
        service: 'REMODEO智能耳机',
        org: 'xxx事务所',
    },
    {
        key: '2',
        tmName: 'REMODEO',
        tmType: '普通商标',
        regNo: '36941601',
        category: '商标注册申请-受理通知书发文-结束',
        appDate: '2019-03-04',
        expire: '2022-03-05',
        company: 'XX有限公司',
        status: '结束',
        service: 'REMODEO智能耳机',
        org: 'xxx事务所',
    },
]

const columns = [
    {
        title: '商标名称',
        dataIndex: 'tmName',
        key: 'tmName',
    },
    {
        title: '注册号',
        dataIndex: 'regNo',
        key: 'regNo',
    },
    {
        title: '状态',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: '申请时间',
        dataIndex: 'appDate',
        key: 'appDate',
    },
    {
        title: '申请进度',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '操作',
        dataIndex: 'update',
        key: 'update',
    },
]
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Trademark extends PureComponent {
    state = {
        visible: false,
    }
    componentDidMount = () => {
        const companyId = sessionStorage.getItem('companyId')
        if (companyId) {
            this.props.getTrademarkList({
                companyId: sessionStorage.getItem('companyId'),
                pageNo: 1,
                pageSize: 10,
            })
        }
    }
    newInfo = () => {
        this.setState({
            visible: true,
        })
    }
    handleOk = () => {
        this.form.validateFields((errors, values) => {
            console.log(values)
        })
        this.setState({
            visible: false,
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    renderForm = type => {
        const items = [
            {
                label: '商标名称',
                field: 'tmName',
                component: <Input />,
            },
            {
                label: '注册号',
                field: 'regNo',
                component: <Input />,
            },
            {
                label: '申请时间',
                field: 'appDate',
                component: <DatePicker />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        }
        //const FormView = formView({ items, data: {} })
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                items={items}
                formItemLayout={formItemLayout}
                layout="inline"
                saveBtn={false}
            />
        )
    }
    renderNewForm = () => {
        const items = [
            {
                label: '商标名称',
                field: 'tmName',
                component: <Input />,
            },
            {
                label: '注册号',
                field: 'regNo',
                component: <Input />,
            },
            {
                label: '申请时间',
                field: 'appDate',
                component: <DatePicker />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        //const FormView = formView({ items, data: {} })
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                items={items}
                formItemLayout={formItemLayout}
                //layout="inline"
                saveBtn={false}
            />
        )
    }
    render() {
        const { trademark } = this.props
        return (
            <Card
                title="商标信息"
                className={styles.root}
                bordered={false}
                extra={
                    <Button type="primary" onClick={this.newInfo}>
                        新增
                    </Button>
                }
            >
                <div className={styles.searchCard}>
                    {this.renderForm('search')}
                    <div style={{ marginTop: '10px', textAlign: 'right' }}>
                        <Button type="ghost">清除</Button>
                        <Divider type="vertical" />
                        <Button type="primary">查询</Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newInfo}>
                            新增
                        </Button>
                    </div>
                </div>
                <Table bordered pagination={false} dataSource={trademark.list} columns={columns} />
                <Modal
                    title="商标信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    //footer={null}
                >
                    {this.renderNewForm()}
                </Modal>
            </Card>
        )
    }
}
export default Trademark
