import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, DatePicker, Table, Input, Select, Tag, Modal, message } from 'antd'
import { AuthWrapper, FormView } from 'components'
import theme from 'Theme'
import BatchImport from './BatchImport/BatchImport'
import BillForm from './Detail/BillForm'
import request from '../../utils/request'
import moment from 'moment'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/customerBill'
import { actions as billActions } from 'reduxDir/bill'
const { RangePicker } = DatePicker
const { Option } = Select
const searchItems = [
    {
        label: '楼栋',
        field: 'building',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '房号',
        field: 'room',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '客户名称',
        field: 'customerName',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '应收款所属期',
        field: 'receiveDate',
        component: <RangePicker />,
    },
    {
        label: '应缴截止日期',
        field: 'limitDate',
        component: <DatePicker placeholder="请选择" />,
    },
    {
        label: '状态',
        field: 'status',
        component: (
            <Select placeholder="请选择">
                <Option value="0">未确认</Option>
                <Option value="1">已确认</Option>
            </Select>
        ),
    },
]
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const columns = [
    {
        title: '楼栋',
        dataIndex: 'building',
        key: 'building',
        fixed: 'left',
        width: 100,
    },
    {
        title: '房号',
        dataIndex: 'room',
        key: 'room',
    },
    {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: '应收款所属期',
        dataIndex: 'receiveDate',
        key: 'receiveDate',
    },
    {
        title: '合计应收款（元）',
        dataIndex: 'amount',
        key: 'amount',
        render: amount => <span>{amount && amount.toFixed(2)}</span>,
    },
    {
        title: '应缴截止日期',
        dataIndex: 'limitDate',
        key: 'limitDate',
    },
    {
        title: '已确认账单数',
        dataIndex: 'confirmedCount',
        key: 'confirmedCount',
    },
    {
        title: '未确认账单数',
        dataIndex: 'unconfirmedCount',
        key: 'unconfirmedCount',
    },
    {
        title: '状态',
        fixed: 'right',
        align: 'center',
        width: 100,
        dataIndex: 'status',
        key: 'status',
        render: status =>
            status === '已确认' ? (
                <Tag color="green">{status}</Tag>
            ) : (
                <Tag color="blue">{status}</Tag>
            ),
    },
]
let selectedIds = []
@connect(
    state => ({
        searchParams: state.customerBill.searchParams,
        bill: state.customerBill.bill,
        batchBillList: state.customerBill.batchBillList,
        billDetail: state.bill.billDetail,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getCustomerBillList: actions('getCustomerBillList'),
                getBatchConfirmBillList: actions('getBatchConfirmBillList'),
                operateBatchConfirmBills: billActions('operateBatchConfirmBills'),
                operateBatchSendBills: billActions('operateBatchSendBills'),
                getBillDetail: billActions('getBillDetail'),
                updateBill: billActions('updateBill'),
            },
            dispatch,
        )
    },
)
class Bill extends PureComponent {
    state = {
        comfirmModal: false,
        sendModal: false,
        confirmList: {}, //批量确认
    }
    componentDidMount() {
        this.props.getCustomerBillList()
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.batchBillList !== nextProps.batchBillList) {
            this.setState({
                confirmList: nextProps.batchBillList,
            })
        }
    }
    // 查询
    search = () => {
        const params = this.searchForm.getFieldsValue()
        this.props.getCustomerBillList(params)
    }
    reset = () => {
        this.searchForm.resetFields()
        this.search()
    }
    // 分页
    onPageNoChange = pageNo => {
        this.props.getCustomerBillList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getCustomerBillList({ pageNo: 1, pageSize })
    }
    // 批量确认
    batchComfirm = () => {
        if (selectedIds.length > 0) {
            this.props.getBatchConfirmBillList({
                status: '0',
                customerIds: selectedIds.join(','),
            })
            this.setState({
                comfirmModal: true,
            })
            // 更新列表
            this.props.getCustomerBillList()
        } else {
            message.error('请从列表中选择客户')
        }
    }
    comfirmModalOk = () => {
        const {
            confirmList: { list },
        } = this.state
        if (list && list.length > 0) {
            this.props.operateBatchConfirmBills({
                batch: 'batch',
                billIds: list.map(item => item.billId).join(','),
            })
            this.setState({
                comfirmModal: false,
            })
        }
    }
    comfirmModalCancel = () => {
        this.setState({
            comfirmModal: false,
        })
    }
    // 批量发送
    batchSend = () => {
        if (selectedIds.length > 0) {
            this.props.getBatchConfirmBillList({
                status: '1',
                customerIds: selectedIds.join(','),
            })
            this.setState({
                sendModal: true,
            })
        } else {
            message.error('请从列表中选择客户')
        }
    }
    sendModalOk = () => {
        const {
            batchBillList: { list },
            operateBatchSendBills,
        } = this.props
        if (list && list.length > 0) {
            operateBatchSendBills({
                billIds: list.map(item => item.billId).join(','),
            })
            this.setState({
                sendModal: false,
            })
        }
    }
    sendModalCancel = () => {
        this.setState({
            sendModal: false,
        })
    }
    // 移除
    removeComfirm = billId => {
        const list = this.state.confirmList.list.filter(item => item.billId !== billId)
        this.setState({
            confirmList: {
                list,
                totalCount: list.length,
            },
        })
    }
    // 编辑
    showEdit = id => {
        this.props.getBillDetail({
            billId: id,
        })
        this.setState({
            addBillModal: true,
            mode: 'edit',
        })
    }
    addBillOk = () => {
        const form = this.billForm.getWrappedInstance()
        form.getFormValues(async params => {
            await request({
                type: 'post',
                url: `/charge/updateBill`,
                contentType: 'multipart/form-data',
                data: {
                    billId: this.props.billDetail.id,
                    ...params,
                },
            })
            message.success('修改成功')
            // 更新确认列表
            this.props.getBatchConfirmBillList({
                status: '0',
                customerIds: selectedIds.join(','),
            })
            this.setState({
                addBillModal: false,
            })
        })
    }
    addBillCancel = () => {
        const form = this.billForm.getWrappedInstance()
        form.clearValues()
        this.setState({
            addBillModal: false,
        })
    }

    render() {
        const { bill, batchBillList, searchParams } = this.props
        const { confirmList } = this.state
        const billColumns = [
            {
                title: '账单编号',
                dataIndex: 'billNo',
                key: 'billNo',
            },
            {
                title: '楼栋',
                dataIndex: 'building',
                key: 'building',
            },
            {
                title: '房号',
                dataIndex: 'room',
                key: 'room',
            },
            {
                title: '客户名称',
                dataIndex: 'customerName',
                key: 'customerName',
            },
            {
                title: '费用类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '费用名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '应收款所属期',
                dataIndex: 'receiveDate',
                key: 'receiveDate',
            },
            {
                title: '应缴费日期',
                dataIndex: 'limitDate',
                key: 'limitDate',
                fixed: 'right',
                width: 150,
                defaultSortOrder: 'descend',
                sorter: (a, b) =>
                    moment(a.limitDate, 'YYYY.MM.DD') - moment(b.limitDate, 'YYYY.MM.DD'),
            },
            {
                title: '应收款金额',
                dataIndex: 'amount',
                key: 'amount',
                fixed: 'right',
                width: 150,
                sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
            },
        ]
        return (
            <div className={`${theme.content} ${theme.defaultBg}`}>
                <FormView
                    data={searchParams}
                    items={searchItems}
                    layout="inline"
                    saveBtn={false}
                    ref={ref => {
                        this.searchForm = ref
                    }}
                    formItemLayout={formItemLayout}
                />
                <div className={theme.flex} style={{ margin: '15px 0' }}>
                    <Alert style={{ flex: 1 }} message={`共${bill.totalCount || 0}项`} />
                    <div className={theme.btnGroup}>
                        <Button type="primary" onClick={this.reset}>
                            清空
                        </Button>
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <AuthWrapper auth="新增企业">
                            <Button type="primary">
                                <Link to="/bill/customerAdd">新增企业</Link>
                            </Button>
                        </AuthWrapper>
                        <BatchImport />
                        <AuthWrapper auth="批量确认">
                            <Button type="primary" onClick={this.batchComfirm}>
                                批量确认
                            </Button>
                        </AuthWrapper>
                        <AuthWrapper auth="批量发送">
                            <Button type="primary" onClick={this.batchSend}>
                                批量发送
                            </Button>
                        </AuthWrapper>
                    </div>
                </div>
                <Table
                    style={{ background: '#fff' }}
                    rowKey="id"
                    rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => {
                            selectedIds = selectedRowKeys
                        },
                    }}
                    dataSource={bill.list}
                    columns={columns}
                    scroll={{ x: 1500 }}
                    pagination={{
                        hideOnSinglePage: true,
                        total: bill.totalCount,
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '15', '20'],
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onPageNoChange,
                    }}
                    onRow={record => {
                        return {
                            onClick: event => {
                                this.props.push(`/bill/detail/${record.id}`)
                            }, // 点击行
                        }
                    }}
                />
                <Modal
                    title="批量确认"
                    visible={this.state.comfirmModal}
                    onOk={this.comfirmModalOk}
                    onCancel={this.comfirmModalCancel}
                    width={930}
                    // bodyStyle={{ height: 430, overflow: 'auto' }}
                >
                    <Table
                        dataSource={confirmList.list}
                        pagination={{
                            hideOnSinglePage: true,
                            total: confirmList.totalCount,
                        }}
                        defaultPageSize={5}
                        columns={[
                            ...billColumns,
                            {
                                title: '操作',
                                dataIndex: 'actions',
                                key: 'actions',
                                align: 'center',
                                fixed: 'right',
                                width: 150,
                                render: (_, record) => (
                                    <Fragment>
                                        <Button
                                            size="small"
                                            type="link"
                                            onClick={() => {
                                                this.showEdit(record.billId)
                                            }}
                                        >
                                            编辑
                                        </Button>
                                        <Button
                                            size="small"
                                            type="link"
                                            style={{ color: 'red' }}
                                            onClick={() => {
                                                this.removeComfirm(record.billId)
                                            }}
                                        >
                                            移除
                                        </Button>
                                    </Fragment>
                                ),
                            },
                        ]}
                        scroll={{ x: 1500 }}
                    />
                </Modal>
                <Modal
                    title="批量发送"
                    visible={this.state.sendModal}
                    onOk={this.sendModalOk}
                    onCancel={this.sendModalCancel}
                    width={930}
                    // bodyStyle={{ height: 430, overflow: 'auto' }}
                >
                    <Table
                        pagination={{
                            hideOnSinglePage: true,
                            total: batchBillList.totalCount,
                        }}
                        defaultPageSize={5}
                        dataSource={batchBillList.list}
                        columns={billColumns}
                        scroll={{ x: 1500 }}
                    />
                </Modal>
                <Modal
                    title="费用信息"
                    width={890}
                    visible={this.state.addBillModal}
                    onOk={this.addBillOk}
                    onCancel={this.addBillCancel}
                >
                    <BillForm
                        mode={this.state.mode}
                        ref={ref => {
                            this.billForm = ref
                        }}
                    />
                </Modal>
            </div>
        )
    }
}
export default Bill
