import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker, message, Pagination, Divider } from 'antd'
import moment from 'moment'
import { FormView, SearchView } from 'components' //毫秒
import Toolbar from '../../Toolbar/Toolbar'
// import formView from '../FormView'
import styles from '../index.module.css'
import request from '../../../../utils/request'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../../redux/intermediary'
const dateStr = 'x' //毫秒

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
        this.querySoftwareCopyrightDetail(data)
    }
    async querySoftwareCopyrightDetail(keyId) {
        var result = await request({
            type: 'get',
            url: '/enterprise/querySoftwareCopyrightDetail?keyId=' + keyId,
        })
        let res = result.data
        if (res.regtime) {
            res.regtime = moment(res.regtime, dateStr)
        }
        this.setState({
            visible: true,
            keyId: keyId,
            FormView: res,
            type: 'set',
        })
    }

    handleOk = () => {
        let that = this
        this.newForm.validateFields((errors, values) => {
            if (values.regtime) {
                values.regtime = moment(values.regtime.format('YYYY-MM-DD')).format(dateStr)
            }
            values.companyId = sessionStorage.getItem('companyId')
            let newValue = {
                // params: {
                companyId: sessionStorage.getItem('companyId'),
                fullname: values.fullname,
                simplename: values.simplename,
                regtime: values.regtime,
                regnum: values.regnum,
                catnum: values.catnum,
                authorNationality: values.authorNationality,
                // },
            }
            if (that.state.type === 'add') {
                that.increaseSoftwareCopyright(newValue)
            } else {
                let newValue = {
                    companyId: sessionStorage.getItem('companyId'),
                    fullname: values.fullname,
                    simplename: values.simplename,
                    regtime: values.regtime,
                    regnum: values.regnum,
                    catnum: values.catnum,
                    authorNationality: values.authorNationality,
                }
                newValue = { ...that.state.FormView, ...newValue }
                that.changeSoftwareCopyright(newValue)
            }
        })
        this.setState({
            visible: false,
        })
    }
    increaseSoftwareCopyright = async data => {
        var that = this
        var result = await request({
            type: 'post',
            url: '/enterprise/increaseSoftwareCopyright',
            contentType: 'multipart/form-data',
            data: {
                newContent: JSON.stringify(data),
            },
        })
        if (result.code === 1000) {
            message.success('保存成功')
            that.DidMount()
        } else {
            message.error(result.message)
        }
    }
    changeSoftwareCopyright = async data => {
        var that = this
        var result = await request({
            type: 'post',
            url: '/enterprise/changeSoftwareCopyright',
            contentType: 'multipart/form-data',
            data: {
                content: JSON.stringify(data),
            },
        })
        if (result.code === 1000) {
            message.success('成功')
            that.DidMount()
        } else {
            message.error(result.message)
        }
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
                component: <Input placeholder="著作权名称" />,
            },
            {
                label: '简称',
                field: 'simplename',
                component: <Input placeholder="简称" />,
            },
            {
                label: '登记日期',
                field: 'regtime',
                component: <DatePicker />,
            },

            {
                label: '登记号',
                field: 'regnum',
                component: <Input placeholder="登记号" />,
            },
            {
                label: '分类号',
                field: 'catnum',
                component: <Input placeholder="分类号" />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 6 },
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
    renderForm = type => {
        const items = [
            {
                label: '著作权名称',
                field: 'fullname',
                component: <Input placeholder="著作权名称" />,
            },
            {
                label: '简称',
                field: 'simplename',
                component: <Input placeholder="简称" />,
            },
            {
                label: '登记日期',
                field: 'regtime',
                component: <DatePicker placeholder="登记日期" />,
            },
            {
                label: '登记号',
                field: 'regnum',
                component: <Input placeholder="登记号" />,
            },
            {
                label: '分类号',
                field: 'catnum',
                component: <Input placeholder="分类号" />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 },
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
    empty() {
        this.form.resetFields()
        this.setState({
            form: {
                fullname: '',
                simplename: '',
                regtime: '',
                regnum: '',
                catnum: '',
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
            if (values.regtime) {
                values.regtime = moment(values.regtime.format('YYYY-MM-DD')).format(dateStr)
            }
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
        var result = await request({
            type: 'post',
            url: '/enterprise/getSoftwareCopyrightList',
            data: {
                companyId: sessionStorage.getItem('companyId'),
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
            // regtime
            for (let i = 0; i < result.data.list.length; i++) {
                if (result.data.list[i].regtime) {
                    result.data.list[i].regtime = moment(result.data.list[i].regtime).format(
                        'YYYY-MM-DD',
                    )
                }
            }
            this.setState({
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
            <div className={styles.contianer} style={{ background: 'rgba(240,242,245,1)' }}>
                <div className={styles.titleSty}>
                    <div className={styles.titleName}>软件著作权</div>
                    <Toolbar />
                </div>
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
                <div className={styles.tableSty}>
                    <Table
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
                </div>
                <Modal
                    title="软件著作权信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    //footer={null}
                >
                    {this.renderFormNo()}
                </Modal>
            </div>
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
            increaseSoftwareCopyright: actions('increaseSoftwareCopyright'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Copyright)
