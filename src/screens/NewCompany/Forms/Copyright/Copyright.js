import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker, message, Pagination } from 'antd'

import formView from '../FormView'
import styles from '../index.module.css'
import request from '../../../../utils/request'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../../redux/intermediary'

class Copyright extends PureComponent {
    state = {
        page: 1,
        form: {
            fullname: '',
            simplename: '',
            regtime: '',
            regnum: '',
            catnum: '',
        },
        type: '',
        sessionStorageItem: {},
        keyId: '',
        FormView: {},
        List: {
            list: [],
            totalCount: 0,
        },
        visible: false,
        columns: [
            {
                title: '著作权名称',
                dataIndex: 'fullname',
                key: 'fullname',
            },
            {
                title: '著作权人',
                dataIndex: 'authorNationality',
                key: 'authorNationality',
            },
            {
                title: '简称',
                dataIndex: 'simplename',
                key: 'simplename',
            },
            {
                title: '登记日期',
                dataIndex: 'regtime',
                key: 'regtime',
            },
            {
                title: '登记号',
                dataIndex: 'regnum',
                key: 'regnum',
            },
            {
                title: '分类号',
                dataIndex: 'catnum',
                key: 'catnum',
            },
            {
                title: '操作',
                dataIndex: 'keyId',
                key: 'key',
                render: data => (
                    <div>
                        <Button type="primary" onClick={() => this.newInfo(data)}>
                            编辑
                        </Button>
                        <Button style={{ marginLeft: '10px' }} onClick={() => this.del(data)}>
                            删除
                        </Button>
                    </div>
                ),
            },
        ],
    }
    del(id) {
        console.log(id + 'del')
    }
    look(id) {
        console.log(id)
    }
    newInfo = (data = {}) => {
        this.querySoftwareCopyrightDetail(data)
    }
    async querySoftwareCopyrightDetail(keyId) {
        var result = await request({
            type: 'get',
            url: '/enterprise/querySoftwareCopyrightDetail?keyId=' + keyId,
        })
        let res = result.data
        this.setState({
            visible: true,
            keyId: keyId,
            FormView: res,
            type: 'set',
        })
    }
    handleOk = () => {
        let that = this
        this.form.validateFields((errors, values) => {
            let newValue = values
            if (that.state.type === 'add') {
                that.props.increaseSoftwareCopyrightApprove(newValue)
            } else {
                newValue = { ...that.state.FormView, ...newValue }
                that.changeSoftwareCopyrightApprove(newValue)
            }
        })
        this.setState({
            visible: false,
        })
    }
    async changeSoftwareCopyrightApprove(data) {
        var result = await request({
            type: 'post',
            url: '/enterprise/changeSoftwareCopyrightApprove',
            data: {
                newContent: JSON.stringify(data),
                records: '我也不知道传点什么好',
            },
            contentType: 'multipart/form-data',
        })
        message.info(result.message)
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    renderFormNo = type => {
        const items = [
            {
                label: '著作权名称',
                field: 'fullname',
                component: <Input />,
            },
            {
                label: '简称',
                field: 'simplename',
                component: <Input />,
            },
            {
                label: '登记日期',
                field: 'regtime',
                component: <Input />,
            },
            {
                label: '登记号',
                field: 'regnum',
                component: <Input />,
            },
            {
                label: '分类号',
                field: 'catnum',
                component: <Input />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        }
        const FormView = formView({ items, data: this.state.FormView })
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={formItemLayout}
                layout="inline"
                // saveBtn={type === 'search' ? false : true}
                saveBtn={false}
            />
        )
    }
    renderForm = type => {
        const items = [
            {
                label: '著作权名称',
                field: 'fullname',
                component: <Input />,
            },
            {
                label: '简称',
                field: 'simplename',
                component: <Input />,
            },
            {
                label: '登记日期',
                field: 'regtime',
                component: <Input />,
            },
            {
                label: '登记号',
                field: 'regnum',
                component: <Input />,
            },
            {
                label: '分类号',
                field: 'catnum',
                component: <Input />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        }
        const FormView = formView({ items, data: this.state.form })
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={formItemLayout}
                layout="inline"
                // saveBtn={type === 'search' ? false : true}
                saveBtn={false}
                emptyBtn={true}
                empty={() => this.empty()}
                query={() => this.query()}
                add={() => this.add()}
            />
        )
    }
    empty() {
        this.form.resetFields()
    }
    query() {
        let that = this
        this.form.validateFields((errors, values) => {
            values.pageNo = 1
            that.setState({
                form: {
                    fullname: values.fullname,
                    simplename: values.simplename,
                    regtime: values.regtime,
                    regnum: values.regnum,
                    catnum: values.catnum,
                },
            })
            setTimeout(() => {
                that.DidMount(values)
            }, 0)
        })
    }
    add() {
        this.setState({
            visible: true,
            FormView: {},
            type: 'add',
        })
    }
    componentDidMount() {
        this.DidMount()
    }
    async DidMount(
        req = {
            pageNo: 1,
            fullname: '',
            simplename: '',
            regtime: '',
            regnum: '',
            catnum: '',
        },
    ) {
        let sessionStorageItem = JSON.parse(sessionStorage.getItem('nowCompany'))
        var result = await request({
            type: 'post',
            url: '/enterprise/getSoftwareCopyrightList',
            data: {
                companyId: 484167,
                pageNo: req.pageNo,
                pageSize: 10,
                fullname: this.state.form.fullname,
                simplename: this.state.form.simplename,
                regtime: this.state.form.regtime,
                regnum: this.state.form.regnum,
                catnum: this.state.form.catnum,
            },
            contentType: 'multipart/form-data',
        })
        if (result.code === 1000) {
            this.setState({
                sessionStorageItem,
                List: result.data,
                page: req.pageNo,
            })
        } else {
            message.info(result.message)
        }
    }
    pageOnChange(page, pageSize) {
        this.DidMount({
            pageNo: page,
            fullname: '',
            simplename: '',
            regtime: '',
            regnum: '',
            catnum: '',
        })
    }
    render() {
        return (
            <Card
                title="投资事件"
                bordered={false}
                extra={
                    <Button type="primary" onClick={this.newInfo}>
                        新增
                    </Button>
                }
            >
                <div className={styles.searchCard}>{this.renderForm('search')}</div>
                <Table
                    bordered
                    pagination={false}
                    dataSource={this.state.List.list}
                    columns={this.state.columns}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        paddingTop: '15px',
                    }}
                >
                    <Pagination
                        defaultCurrent={1}
                        total={this.state.List.totalCount}
                        hideOnSinglePage={true}
                        onChange={(page, pageSize) => this.pageOnChange(page, pageSize)}
                        current={this.state.page}
                    />
                </div>
                <Modal
                    title="投资事件"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    //footer={null}
                >
                    {this.renderFormNo()}
                </Modal>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        router: state.router,
        intermediarys: state.intermediary,
        user: state.authUser,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            push: push,
            increaseSoftwareCopyrightApprove: actions('increaseSoftwareCopyrightApprove'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Copyright)
