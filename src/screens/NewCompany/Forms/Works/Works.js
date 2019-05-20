import React, { PureComponent } from 'react'
import {
    message,
    Button,
    Card,
    Table,
    Modal,
    Divider,
    DatePicker,
    Input,
    Select,
    Pagination,
} from 'antd'
import moment from 'moment'
import { FormView, SearchView } from 'components'
// import formView from '../FormView'
import styles from '../index.module.css'
import request from '../../../../utils/request'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../../redux/intermediary'
const Option = Select.Option
const dateStr = 'x' //毫秒
class Works extends PureComponent {
    state = {
        page: 1,
        form: {
            fullname: '',
            type: '',
            regtime: '',
            regnum: '',
            finishTime: '',
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
                title: '著作权类别',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '著作权人',
                dataIndex: 'authorNationality',
                key: 'authorNationality',
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
                title: '完成创作时间',
                dataIndex: 'finishTime',
                key: 'finishTime',
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

    //     authorNationality: "小米科技有限责任公司"
    // companyId: "484167"
    // createTime: 1528804755000
    // finishTime: "2014-11-27"
    // fullname: null
    // keyId: "5cd93d463e6b695707379db4"
    // parkId: "5c99dfec43cd221b96cbf8c1"
    // publishtime: null
    // regnum: "国作登字-2018-S-00510447"
    // regtime: 1527523200000
    // source: null
    // sourceTime: "2019-05-13 17:47:50"
    // type: null
    del(id) {
        console.log(id + 'del')
    }
    look(id) {
        console.log(id)
    }
    newInfo = (data = {}) => {
        this.queryProductTrademarkDetail(data)
    }
    async queryProductTrademarkDetail(keyId) {
        var result = await request({
            type: 'get',
            url: '/enterprise/queryProductTrademarkDetail?keyId=' + keyId,
        })
        let res = result.data
        if (res.regtime) {
            res.regtime = moment(res.regtime, dateStr)
        }
        if (res.finishTime) {
            let time = new Date(res.finishTime)
            time = Date.parse(time)
            res.finishTime = moment(time, dateStr)
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
                values.regtime = moment(values.regtime.format('YYYY-MM-DD hh:mm:ss')).format(
                    dateStr,
                )
            }
            if (values.finishTime) {
                values.finishTime = moment(values.finishTime.format('YYYY-MM-DD hh:mm:ss')).format(
                    'YYYY-MM-DD ',
                )
            }
            console.log(values.finishTime)

            values.companyId = sessionStorage.getItem('companyId')
            let newValue = {
                params: {
                    companyId: sessionStorage.getItem('companyId'),
                    fullname: values.fullname,
                    type: values.type,
                    regtime: values.regtime,
                    regnum: values.regnum,
                    finishTime: values.finishTime,
                    authorNationality: values.authorNationality,
                },
            }
            if (that.state.type === 'add') {
                that.increaseProductTrademarkApprove(newValue)
            } else {
                let newValue = {
                    companyId: sessionStorage.getItem('companyId'),
                    fullname: values.fullname,
                    type: values.type,
                    regtime: values.regtime,
                    regnum: values.regnum,
                    finishTime: values.finishTime,
                    authorNationality: values.authorNationality,
                }
                newValue = { ...that.state.FormView, ...newValue }
                that.changeProductTrademarkApprove(newValue)
            }
        })
        this.setState({
            visible: false,
        })
    }
    async increaseProductTrademarkApprove(data) {
        var result = await request({
            type: 'post',
            url: '/enterprise/increaseProductTrademarkApprove',
            data,
        })
        if (result.code === 1000) {
            message.success('成功')
        } else {
            message.error(result.message)
        }
    }
    async changeProductTrademarkApprove(data) {
        var result = await request({
            type: 'post',
            url: '/enterprise/changeProductTrademarkApprove',
            data: {
                newContent: JSON.stringify(data),
                records: '我也不知道传点什么好',
            },
            contentType: 'multipart/form-data',
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
                label: '著作权名称',
                field: 'fullname',
                component: <Input placeholder="著作权名称" />,
            },
            // {
            //     label: '作品著权类别',
            //     field: 'type',
            //     component: (
            //         <Select
            //             defaultValue="请选择"
            //             placeholder="请选择"
            //             style={{ width: 120 }}
            //             onChange={() => this.handleChange()}
            //         >
            //             <Option value="音乐">音乐</Option>
            //             <Option value="美术">美术</Option>
            //             <Option value="文字">文字</Option>
            //             <Option value="汇编">汇编</Option>
            //             <Option value="影视">影视</Option>
            //             <Option value="戏剧">戏剧</Option>
            //             <Option value="舞蹈">舞蹈</Option>
            //             <Option value="建筑">建筑</Option>
            //             <Option value="工程设计图">工程设计图</Option>
            //             <Option value="产品设计图">产品设计图</Option>
            //             <Option value="地图、示意图">地图、示意图</Option>
            //             <Option value="摄影">摄影</Option>
            //             <Option value="计算机软件">计算机软件</Option>
            //             <Option value="模型">模型</Option>
            //             <Option value="其他">其他</Option>
            //         </Select>
            //     ),
            // },
            {
                label: '作品著权类别',
                field: 'type',
                component: <Input placeholder="作品著权类别" />,
            },
            {
                label: '著作权人',
                field: 'authorNationality',
                component: <Input placeholder="著作权人" />,
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
                label: '完成创作时间',
                field: 'finishTime',
                component: <DatePicker placeholder="完成创作时间" />,
            },
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
                label: '著作权名称',
                field: 'fullname',
                component: <Input placeholder="著作权名称" />,
            },
            {
                label: '著作权类别',
                field: 'type',
                component: <Input placeholder="著作权类别" />,
            },
            // {
            //     label: '著作权类别',
            //     field: 'type',
            //     component: (
            //         <Select
            //             placeholder="著作权类别"
            //             defaultValue="请选择"
            //             style={{ width: 120 }}
            //             onChange={() => this.handleChange()}
            //         >
            //             <Option value="音乐">音乐</Option>
            //             <Option value="美术">美术</Option>
            //             <Option value="文字">文字</Option>
            //             <Option value="汇编">汇编</Option>
            //             <Option value="影视">影视</Option>
            //             <Option value="戏剧">戏剧</Option>
            //             <Option value="舞蹈">舞蹈</Option>
            //             <Option value="建筑">建筑</Option>
            //             <Option value="工程设计图">工程设计图</Option>
            //             <Option value="产品设计图">产品设计图</Option>
            //             <Option value="地图、示意图">地图、示意图</Option>
            //             <Option value="摄影">摄影</Option>
            //             <Option value="计算机软件">计算机软件</Option>
            //             <Option value="模型">模型</Option>
            //             <Option value="其他">其他</Option>
            //         </Select>
            //     ),
            // },
            // {
            //     label: '著作权人',
            //     field: 'authorNationality',
            //     component: <Input />,
            // },
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
                label: '完成创作时间',
                field: 'finishTime',
                component: <DatePicker placeholder="完成创作时间" />,
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
    empty() {
        this.form.resetFields()
        this.setState({
            form: {
                fullname: '',
                type: '',
                regtime: '',
                regnum: '',
                finishTime: '',
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
            if (values.finishTime) {
                values.finishTime = moment(values.finishTime).format('YYYY-MM-DD')
            }
            values.pageNo = 1
            that.setState({
                form: {
                    fullname: values.fullname,
                    type: values.type,
                    regtime: values.regtime,
                    regnum: values.regnum,
                    finishTime: values.finishTime,
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
            type: '',
            regtime: '',
            regnum: '',
            finishTime: '',
        },
    ) {
        let sessionStorageItem = JSON.parse(sessionStorage.getItem('nowCompany'))
        var result = await request({
            type: 'post',
            url: '/enterprise/getProductTrademarkList',
            data: {
                companyId: 484167,
                pageNo: req.pageNo,
                pageSize: 10,
                fullname: this.state.form.fullname,
                type: this.state.form.type,
                regtime: this.state.form.regtime,
                regnum: this.state.form.regnum,
                finishTime: this.state.form.finishTime,
            },
            contentType: 'multipart/form-data',
        })
        if (result.code === 1000) {
            for (let i = 0; i < result.data.list.length; i++) {
                if (result.data.list[i].regtime) {
                    result.data.list[i].regtime = moment(result.data.list[i].regtime).format(
                        'YYYY-MM-DD hh:mm:ss',
                    )
                }
                if (result.data.list[i].finishTime) {
                    result.data.list[i].finishTime = moment(result.data.list[i].finishTime).format(
                        'YYYY-MM-DD hh:mm:ss',
                    )
                }
            }
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
            type: '',
            regtime: '',
            regnum: '',
            finishTime: '',
        })
    }
    render() {
        return (
            <Card
                title="知识产权-作品著作权"
                bordered={false}
                // extra={
                //     <div>
                //         {/* <Button type="primary" onClick={this.newInfo}>
                //             预览
                //         </Button>
                //         <Button onClick={this.newInfo} style={{ marginLeft: '10px' }}>
                //             存档
                //         </Button> */}
                //     </div>
                // }
            >
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
                    title="作品著作权信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className={styles.searchCard}
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
            increaseProductTrademarkApprove: actions('increaseProductTrademarkApprove'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Works)
