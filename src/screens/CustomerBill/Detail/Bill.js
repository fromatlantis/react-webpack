import React, { PureComponent, Fragment } from 'react'
import { Button, Table, Modal, Tag, Popconfirm } from 'antd'
import theme from 'Theme'
import BillForm from './BillForm'
import BillDetail from './BillDetail'
import { AuthWrapper } from 'components'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/bill'
@connect(
    state => ({
        searchParams: state.bill.searchParams,
        bill: state.bill.bill,
        billDetail: state.bill.billDetail,
        router: state.router,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getBillList: actions('getBillList'),
                operateAddBill: actions('operateAddBill'),
                getBillDetail: actions('getBillDetail'),
                updateBill: actions('updateBill'),
                operateBatchConfirmBills: actions('operateBatchConfirmBills'),
                operateBatchSendBills: actions('operateBatchSendBills'),
            },
            dispatch,
        )
    },
)
class Bill extends PureComponent {
    state = {
        addBillModal: false,
        billDetailModal: false,
        mode: 'add',
    }
    getCustomerId() {
        const {
            location: { pathname },
        } = this.props.router
        const params = pathname.match(/[^/]+/g)
        return params[params.length - 1]
    }
    componentDidMount() {
        this.props.getBillList({
            customerId: this.getCustomerId(),
        })
    }
    // 分页
    onPageNoChange = pageNo => {
        this.props.getBillList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getBillList({ pageNo: 1, pageSize })
    }
    // 添加账单
    addBillOk = () => {
        const form = this.billForm.getWrappedInstance()
        form.getFormValues(params => {
            // console.log(params)
            params.customerId = this.getCustomerId()
            const { mode } = this.state
            if (mode === 'add') {
                this.props.operateAddBill(params)
            } else if (mode === 'edit') {
                this.props.updateBill({
                    billId: this.props.billDetail.id,
                    ...params,
                })
            }
            this.setState({
                addBillModal: false,
            })
            // form.clearValues()
        })
    }
    addBillCancel = () => {
        const form = this.billForm.getWrappedInstance()
        form.clearValues()
        this.setState({
            addBillModal: false,
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
    // 详情
    showDetail = id => {
        this.props.getBillDetail({
            billId: id,
        })
        this.setState({
            billDetailModal: true,
        })
    }
    billDetailOk = () => {
        this.setState({
            billDetailModal: false,
        })
    }
    billDetailCancel = () => {
        this.setState({
            billDetailModal: false,
        })
    }
    // 确认
    operateBatchConfirmBills = ids => {
        this.props.operateBatchConfirmBills({
            billIds: ids.join(','),
            single: true,
        })
    }
    // 发送
    operateBatchSendBills = ids => {
        this.props.operateBatchSendBills({
            billIds: ids.join(','),
        })
        this.setState({
            billDetailModal: false,
        })
    }
    renderModalTitle = () => {
        const record = this.props.billDetail
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>费用信息</div>
                <div style={{ marginRight: 30 }}>
                    {record.status === '0' && (
                        <Fragment>
                            <AuthWrapper auth="编辑账单">
                                <Button
                                    size="small"
                                    style={{ marginLeft: 10 }}
                                    type="primary"
                                    onClick={() => {
                                        this.showEdit(record.id)
                                    }}
                                >
                                    编辑
                                </Button>
                            </AuthWrapper>
                            <AuthWrapper auth="确认账单">
                                <Popconfirm
                                    title="账单是否核实？"
                                    placement="bottom"
                                    onConfirm={() => {
                                        this.operateBatchConfirmBills([record.id])
                                    }}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button size="small" style={{ marginLeft: 10 }} type="primary">
                                        确认
                                    </Button>
                                </Popconfirm>
                            </AuthWrapper>
                        </Fragment>
                    )}
                    {record.status === '1' && (
                        <AuthWrapper auth="发送账单">
                            <Popconfirm
                                title="确定要发送此账单？"
                                placement="bottom"
                                onConfirm={() => {
                                    this.operateBatchSendBills([record.id])
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button size="small" style={{ marginLeft: 10 }} type="primary">
                                    发送
                                </Button>
                            </Popconfirm>
                        </AuthWrapper>
                    )}
                </div>
            </div>
        )
    }
    render() {
        const { bill, searchParams } = this.props
        return (
            <div className={theme.detailCard} style={{ marginTop: '0.4rem' }}>
                <div className={theme.titleChip}>
                    <div>
                        <span className={theme.divider}>|</span>
                        <span className={theme.title}>账单列表</span>
                        <AuthWrapper auth="添加账单">
                            <Button
                                size="small"
                                type="primary"
                                onClick={() => {
                                    this.setState({
                                        addBillModal: true,
                                        mode: 'add',
                                    })
                                }}
                            >
                                添加
                            </Button>
                        </AuthWrapper>
                    </div>
                </div>
                <Table
                    bordered={true} //边框
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
                    rowKey={(record, index) => `complete${record.id}${index}`}
                    dataSource={bill.list}
                    columns={[
                        {
                            title: '账单编号',
                            dataIndex: 'billNo',
                            key: 'billNo',
                            align: 'center',
                        },
                        {
                            title: '费用类型',
                            dataIndex: 'type',
                            key: 'type',
                            align: 'center',
                        },
                        {
                            title: '费用名称',
                            dataIndex: 'name',
                            key: 'name',
                            align: 'center',
                            render: name => <span>{name ? name : '--'}</span>,
                        },
                        {
                            title: '应收款所属期',
                            dataIndex: 'receiveDate',
                            key: 'receiveDate',
                            align: 'center',
                        },
                        {
                            title: '应缴截止日期',
                            dataIndex: 'limitDate',
                            key: 'limitDate',
                            align: 'center',
                        },
                        {
                            title: '应收款金额（元）',
                            dataIndex: 'amount',
                            key: 'amount',
                            align: 'center',
                        },
                        {
                            title: '状态',
                            dataIndex: 'status',
                            key: 'status',
                            align: 'center',
                            render: status => {
                                if (status === '未确认') {
                                    return <Tag color="blue">{status}</Tag>
                                } else if (status === '已确认') {
                                    return <Tag color="green">{status}</Tag>
                                } else {
                                    return <Tag color="orange">{status}</Tag>
                                }
                            },
                        },
                    ]}
                    onRow={record => {
                        return {
                            onClick: event => {
                                this.showDetail(record.id)
                            }, // 点击行
                        }
                    }}
                />
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
                <Modal
                    title={this.renderModalTitle()}
                    width={890}
                    visible={this.state.billDetailModal}
                    onOk={this.billDetailOk}
                    onCancel={this.billDetailCancel}
                >
                    <BillDetail />
                </Modal>
            </div>
        )
    }
}
export default Bill
