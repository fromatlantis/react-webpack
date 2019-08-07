import React, { PureComponent } from 'react'
import {
    Pagination,
    Button,
    Card,
    Table,
    Modal,
    Divider,
    DatePicker,
    Input,
    Select,
    message,
} from 'antd'
import moment from 'moment'
import { FormView, SearchView } from 'components'
// import formView from '../FormView'
import Toolbar from '../../Toolbar/Toolbar'
import styles from '../index.module.css'
import request from '../../../../utils/request'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../../redux/intermediary'
const dateStr = 'x' //毫秒
const Option = Select.Option

class Website extends PureComponent {
    state = {
        page: 1,
        form: {
            ym: '',
            webSite: '',
            liscense: '',
            examineDate: '',
            companyType: '',
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
                title: '主办单位/域名/网站',
                dataIndex: 'ym',
                key: 'ym',
            },
            // {
            //     title: '机构代码',
            //     dataIndex: 'type',
            //     key: 'type',
            // },
            {
                title: '主办单位性质',
                dataIndex: 'companyType',
                key: 'companyType',
            },
            {
                title: '备案号',
                dataIndex: 'liscense',
                key: 'liscense',
            },
            {
                title: '网站首页',
                dataIndex: 'webSite',
                key: 'webSite',
            },
            {
                title: '审核时间',
                dataIndex: 'examineDate',
                key: 'examineDate',
            },
            // {
            //     title: '状态',
            //     dataIndex: 'examineDate',
            //     key: 'comname',
            // },
            // {
            //     title: '创建时间',
            //     dataIndex: 'sourceTime',
            //     key: 'sourceTime',
            // },
            {
                title: '操作',
                dataIndex: 'keyId',
                key: 'key',
                render: data => (
                    <div>
                        <Button type="primary" onClick={() => this.newInfo(data)}>
                            编辑
                        </Button>
                        {/* <Button style={{ marginLeft: '10px' }} onClick={() => this.del(data)}>
                            删除
                        </Button> */}
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
        // let FormView = {}
        // for (let i in this.state.List.list) {
        //     if (this.state.List.list[i].keyId === data) {
        //         FormView = this.state.List.list[i]
        //     }
        // }
        this.queryWebsiteRecordsDetail(data)
    }
    handleOk = () => {
        let that = this
        this.newForm.validateFields((errors, values) => {
            if (values.examineDate) {
                values.examineDate = moment(values.examineDate.format('YYYY-MM-DD')).format(
                    'YYYY-MM-DD',
                )
            }
            if (values.sourceTime) {
                values.sourceTime = moment(values.sourceTime.format('YYYY-MM-DD hh:mm:ss')).format(
                    'YYYY-MM-DD hh:mm:ss',
                )
            }
            values.companyId = sessionStorage.getItem('companyId')
            let newValue = {
                params: {
                    companyId: sessionStorage.getItem('companyId'),
                    ym: values.ym,
                    liscense: values.liscense,
                    webSite: values.webSite,
                    examineDate: values.examineDate,
                    companyType: values.companyType,
                    sourceTime: values.sourceTime,
                },
            }
            if (that.state.type === 'add') {
                that.increaseWebsiteRecordsApprove(newValue)
            } else {
                let newValue = {
                    companyId: sessionStorage.getItem('companyId'),
                    ym: values.ym || that.state.FormView.ym,
                    liscense: values.liscense || that.state.FormView.liscense,
                    webSite: values.webSite || that.state.FormView.webSite,
                    examineDate: values.examineDate || that.state.FormView.examineDate,
                    companyType: values.companyType || that.state.FormView.companyType,
                    sourceTime: values.sourceTime || that.state.FormView.sourceTime,
                }
                newValue = { ...that.state.FormView, ...newValue }
                that.changeWebsiteRecordsApprove(newValue)
            }
        })
        this.setState({
            visible: false,
        })
    }
    async increaseWebsiteRecordsApprove(data) {
        var result = await request({
            type: 'post',
            url: '/enterprise/increaseWebsiteRecordsApprove',
            data,
        })
        if (result.code === 1000) {
            message.success('成功')
        } else {
            message.error(result.message)
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    handleChange(value) {
        console.log(value)
    }

    renderFormNo = type => {
        const items = [
            {
                label: '主办单位/域名/网站',
                field: 'ym',
                component: <Input placeholder="主办单位/域名/网站" />,
            },
            // {
            //     label: '机构代码',
            //     field: 'undetermined0',
            //     component: <Input />,
            // },
            {
                label: '主办单位性质',
                field: 'companyType',
                component: (
                    <Select
                        defaultValue="请选择"
                        placeholder="主办单位性质"
                        style={{ width: 120 }}
                        onChange={() => this.handleChange()}
                    >
                        <Option value="企业">企业</Option>
                        <Option value="个人">个人</Option>
                    </Select>
                ),
            },
            {
                label: '备案号',
                field: 'liscense',
                component: <Input placeholder="备案号" />,
            },
            {
                label: '网站首页',
                field: 'webSite',
                component: <Input placeholder="网站首页" />,
            },
            {
                label: '审核时间',
                field: 'examineDate',
                component: <DatePicker placeholder="审核时间" />,
            },
            // {
            //     label: '状态',
            //     field: 'undetermined2',
            //     component: (
            //         <Select
            //             defaultValue="请选择"
            //             style={{ width: 120 }}
            //             // onChange={() => this.handleChange()}
            //         >
            //             <Option value="正常">正常</Option>
            //             <Option value="非正常">非正常</Option>
            //         </Select>
            //     ),
            // },
            // {
            //     label: '创建时间',
            //     field: 'sourceTime',
            //     component: <Input placeholder="创建时间" />,
            // },
        ]
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        }
        return (
            <FormView
                ref={form => {
                    this.newForm = form
                }}
                items={items}
                data={this.state.FormView}
                formItemLayout={formItemLayout}
                saveBtn={false}
            />
        )
        // const FormView = formView({ items, data: this.state.FormView })
        // return (
        //     <FormView
        //         ref={form => {
        //             this.form = form
        //         }}
        //         formItemLayout={formItemLayout}
        //         layout="inline"
        //         // saveBtn={type === 'search' ? false : true}
        //         saveBtn={false}
        //     />
        // )
    }
    empty() {
        this.form.resetFields()
        this.setState({
            form: {
                webSite: '',
                ym: '',
                liscense: '',
                examineDate: '',
                companyType: '',
            },
        })
        let that = this
        setTimeout(() => {
            that.DidMount()
        }, 0)
    }
    query() {
        let that = this
        this.form.validateFields((errors, values) => {
            if (values.examineDate) {
                values.examineDate = moment(values.examineDate.format('YYYY-MM-DD')).format(
                    'YYYY-MM-DD',
                )
            }
            values.pageNo = 1
            that.setState({
                form: {
                    ym: values.ym,
                    webSite: values.webSite,
                    liscense: values.liscense,
                    examineDate: values.examineDate,
                    companyType: values.companyType,
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

    renderForm = type => {
        const items = [
            // {
            //     label: '出资方',
            //     field: 'name',
            //     rules: [
            //         {
            //             required: true,
            //             message: '请输入企业名称',
            //         },
            //     ],
            //     component: <Input />,
            // },
            {
                label: '主办单位/域名/网站',
                field: 'ym',
                component: <Input placeholder="主办单位/域名/网站" />,
            },
            // {
            //     label: '机构代码',
            //     field: 'type',
            //     component: <Input />,
            // },
            {
                label: '主办单位性质',
                field: 'companyType',
                component: (
                    <Select
                        defaultValue="请选择"
                        style={{ width: 120 }}
                        onChange={() => this.handleChange()}
                    >
                        <Option value="企业">企业</Option>
                        <Option value="个人">个人</Option>
                    </Select>
                ),
            },
            // {
            //     label: '备案号',
            //     field: 'liscense',
            //     component: <Input />,
            // },
            {
                label: '备案号',
                field: 'liscense',
                component: <Input placeholder="备案号" />,
            },
            {
                label: '网站首页',
                field: 'webSite',
                component: <Input placeholder="网站首页" />,
            },
            {
                label: '审核时间',
                field: 'examineDate',
                component: <DatePicker placeholder="审核时间" />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        }
        return (
            <SearchView
                ref={form => {
                    this.form = form
                }}
                items={items}
                formItemLayout={formItemLayout}
                layout="inline"
                saveBtn={false}
            />
        )
        // const FormView = formView({ items, data: this.state.form })
        // return (
        //     <FormView
        //         ref={form => {
        //             this.form = form
        //         }}
        //         formItemLayout={formItemLayout}
        //         layout="inline"
        //         // saveBtn={type === 'search' ? false : true}
        //         saveBtn={false}
        //         emptyBtn={true}
        //         empty={() => this.empty()}
        //         query={() => this.query()}
        //         add={() => this.add()}
        //     />
        // )
    }
    componentDidMount() {
        this.DidMount()
    }
    async DidMount(
        req = {
            pageNo: 1,
            ym: '',
            webSite: '',
            liscense: '',
            examineDate: '',
            companyType: '',
        },
    ) {
        let sessionStorageItem = JSON.parse(sessionStorage.getItem('nowCompany'))
        var result = await request({
            type: 'post',
            url: '/enterprise/getWebsiteRecordsList',
            data: {
                companyId: sessionStorage.companyId,
                pageNo: req.pageNo,
                pageSize: 10,
                ym: this.state.form.ym,
                webSite: this.state.form.webSite,
                liscense: this.state.form.liscense,
                examineDate: this.state.form.examineDate,
                companyType: this.state.form.companyType,
            },
            contentType: 'multipart/form-data',
        })
        if (result.code === 1000) {
            if (result.data.list) {
                for (let i = 0; i < result.data.list.length; i++) {
                    if (result.data.list[i].examineDate) {
                        result.data.list[i].examineDate = moment(
                            result.data.list[i].examineDate,
                        ).format('YYYY-MM-DD')
                    }
                    if (result.data.list[i].sourceTime) {
                        result.data.list[i].sourceTime = moment(
                            result.data.list[i].sourceTime,
                        ).format('YYYY-MM-DD hh:mm:ss')
                    }
                }
                this.setState({
                    sessionStorageItem,
                    List: result.data,
                    page: req.pageNo,
                })
            } else {
                this.setState({
                    sessionStorageItem,
                    List: [],
                    page: req.pageNo,
                })
            }
        } else {
            message.info(result.message)
        }
    }

    async queryWebsiteRecordsDetail(keyId) {
        var result = await request({
            type: 'get',
            url: '/enterprise/queryWebsiteRecordsDetail?keyId=' + keyId,
        })
        let res = result.data
        if (res.examineDate) {
            let time = new Date(res.examineDate)
            time = Date.parse(time)
            res.examineDate = moment(time, dateStr)
        }
        if (res.sourceTime) {
            let time = new Date(res.sourceTime)
            time = Date.parse(time)
            res.sourceTime = moment(time, dateStr)
        }
        this.setState({
            visible: true,
            keyId: keyId,
            FormView: res,
            type: 'set',
        })
    }
    async changeWebsiteRecordsApprove(data) {
        var result = await request({
            type: 'post',
            url: '/enterprise/changeWebsiteRecordsApprove',
            data: {
                newContent: JSON.stringify(data),
                records: '我也不知道传点什么好',
            },
            contentType: 'multipart/form-data',
        })
        message.info(result.message)
    }

    pageOnChange(page, pageSize) {
        this.DidMount({
            pageNo: page,
            ym: '',
            webSite: '',
            liscense: '',
            examineDate: '',
            companyType: '',
        })
    }
    render() {
        return (
            <Card title="知识产权-网站域名" bordered={false} extra={<Toolbar />}>
                {/* <div style={{ marginBottom: '20px' }} className={styles.searchCard}>
                    {this.renderForm('search')}
                </div> */}
                <div className={styles.searchCard}>
                    {this.renderForm('search')}
                    <div style={{ marginTop: '10px', textAlign: 'right' }}>
                        <Button type="ghost" onClick={() => this.empty()}>
                            清除
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            type="primary"
                            onClick={() => this.query()}
                            style={{ background: 'rgb(50,200,100)' }}
                        >
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={() => this.add()}>
                            新增
                        </Button>
                    </div>
                </div>
                <Table
                    bordered
                    pagination={false}
                    dataSource={this.state.List.list}
                    columns={this.state.columns}
                />
                {/* totalCount */}
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
                    title="网站域名信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className={styles.searchCard}>{this.renderFormNo()}</div>
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
            increaseWebsiteRecordsApprove: actions('increaseWebsiteRecordsApprove'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Website)
