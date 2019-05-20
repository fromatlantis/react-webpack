import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker, Divider } from 'antd'
import moment from 'moment'
import { FormView, SearchView } from 'components'
import styles from '../index.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/trademark'

const dateStr = 'x' //毫秒
const mapStateToProps = state => {
    return {
        trademark: state.trademark.trademark,
        detail: state.trademark.detail,
        searchParams: state.trademark.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getTrademarkList: actions('getTrademarkList'),
            queryTrademarkDetail: actions('queryTrademarkDetail'),
            increaseTrademarkApprove: actions('increaseTrademarkApprove'),
            changeTrademarkApprove: actions('changeTrademarkApprove'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Trademark extends PureComponent {
    state = {
        visible: false,
        isEdit: false,
    }
    componentDidMount = () => {
        const companyId = sessionStorage.getItem('companyId')
        console.log(moment(1547049600000).format('YYYY-MM-DD'))
        if (companyId) {
            this.props.getTrademarkList()
        }
    }
    newInfo = () => {
        this.setState({
            visible: true,
            isEdit: false,
        })
    }
    handleOk = () => {
        this.newForm.validateFields((errors, values) => {
            if (!errors) {
                const { isEdit } = this.state
                const { changeTrademarkApprove, increaseTrademarkApprove, detail } = this.props
                if (values.appDate) {
                    values.appDate = moment(values.appDate.format('YYYY-MM-DD')).format(dateStr)
                }
                if (isEdit) {
                    // 编辑
                    changeTrademarkApprove({ ...detail, ...values })
                } else {
                    // 新增
                    increaseTrademarkApprove(values)
                }
                this.setState({
                    visible: false,
                })
            }
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
                label: '状态',
                field: 'category',
                component: <Input />,
            },
            {
                label: '申请时间',
                field: 'appDate',
                component: <DatePicker />,
            },
            {
                label: '申请进度',
                field: 'status',
                component: <Input />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        }
        //const FormView = formView({ items, data: {} })
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
            {
                label: '状态',
                field: 'category',
                component: <Input />,
            },
            {
                label: '申请进度',
                field: 'status',
                component: <Input />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        const { detail } = this.props
        const { isEdit } = this.state
        // 时间处理
        detail.appDate = moment(detail.appDate, dateStr)
        return (
            <FormView
                ref={form => {
                    this.newForm = form
                }}
                items={items}
                data={isEdit ? detail : {}}
                formItemLayout={formItemLayout}
                saveBtn={false}
            />
        )
    }
    // 分页
    onChange = pageNo => {
        this.props.getTrademarkList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getTrademarkList({ pageNo: 1, pageSize })
    }
    // 编辑
    edit = keyId => {
        this.props.queryTrademarkDetail(keyId)
        this.setState({
            visible: true,
            isEdit: true,
        })
    }
    // 查询
    search = () => {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                if (values.appDate) {
                    // 先转换为日期再格式化
                    values.appDate = moment(values.appDate.format('YYYY-MM-DD')).format(dateStr)
                }
                this.props.getTrademarkList(values)
            }
        })
    }
    handleReset = () => {
        this.form.resetFields()
    }
    render() {
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
                render: appDate => <span>{moment(parseInt(appDate)).format('YYYY-MM-DD')}</span>,
            },
            {
                title: '申请进度',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: (_, record) => (
                    <Button
                        type="link"
                        onClick={() => {
                            this.edit(record.keyId)
                        }}
                    >
                        编辑
                    </Button>
                ),
            },
        ]
        const { trademark, searchParams } = this.props
        return (
            <Card title="商标信息" bordered={false}>
                <div className={styles.searchCard}>
                    {this.renderForm('search')}
                    <div style={{ marginTop: '10px', textAlign: 'right' }}>
                        <Button type="ghost" onClick={this.handleReset}>
                            清除
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newInfo}>
                            新增
                        </Button>
                    </div>
                </div>
                <Table
                    bordered
                    dataSource={trademark.list}
                    columns={columns}
                    pagination={{
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '15', '20'],
                        total: trademark.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onChange,
                    }}
                />
                <Modal
                    title="商标信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.renderNewForm()}
                </Modal>
            </Card>
        )
    }
}
export default Trademark
