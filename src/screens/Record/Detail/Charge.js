import React, { PureComponent, Fragment } from 'react'
import { Button, Table, Modal, Tag, Popconfirm } from 'antd'
import theme from 'Theme'
import ChargeForm from './ChargeForm'
import ChargeDetail from './ChargeDetail'
import { AuthWrapper } from 'components'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/charge'
@connect(
    state => ({
        searchParams: state.charge.searchParams,
        charge: state.charge.charge,
        detail: state.charge.detail,
        router: state.router,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getChargesByCus: actions('getChargesByCus'),
                operateAddCusCharge: actions('operateAddCusCharge'),
                getChargeDetail: actions('getChargeDetail'),
                operateUpdateCusCharge: actions('operateUpdateCusCharge'),
                operateChargeClosing: actions('operateChargeClosing'),
                operateAskPayment: actions('operateAskPayment'),
            },
            dispatch,
        )
    },
)
class Charge extends PureComponent {
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
        this.props.getChargesByCus({
            customerId: this.getCustomerId(),
        })
    }
    // 分页
    onPageNoChange = pageNo => {
        this.props.getChargesByCus({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getChargesByCus({ pageNo: 1, pageSize })
    }
    // 添加账单
    addBillOk = () => {
        const form = this.billForm.getWrappedInstance()
        form.getFormValues(params => {
            // console.log(params)
            params.customerId = this.getCustomerId()
            const { mode } = this.state
            if (mode === 'add') {
                this.props.operateAddCusCharge(params)
            } else if (mode === 'edit') {
                this.props.operateUpdateCusCharge({
                    chargeId: this.props.detail.id,
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
        this.props.getChargeDetail({
            chargeId: id,
        })
        this.setState({
            addBillModal: true,
            mode: 'edit',
        })
    }
    // 详情
    showDetail = id => {
        this.props.getChargeDetail({
            chargeId: id,
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
    // 结清
    operateChargeClosing = id => {
        this.props.operateChargeClosing({
            chargeId: id,
        })
        this.setState({
            billDetailModal: false,
        })
    }
    // 催缴
    operateAskPayment = id => {
        this.props.operateAskPayment({
            chargeId: id,
        })
        this.setState({
            billDetailModal: false,
        })
    }
    renderModalTitle = () => {
        const record = this.props.detail
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>费用信息</div>
                <div style={{ marginRight: 30 }}>
                    {record.status !== '2' && (
                        <Fragment>
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
                            {parseFloat(record.restAmount) > 0 ? (
                                <AuthWrapper auth="催缴">
                                    <Popconfirm
                                        title="确定要催缴此用户？"
                                        placement="bottom"
                                        onConfirm={() => {
                                            this.operateAskPayment(record.id)
                                        }}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button
                                            size="small"
                                            style={{ marginLeft: 10 }}
                                            type="primary"
                                        >
                                            催缴
                                        </Button>
                                    </Popconfirm>
                                </AuthWrapper>
                            ) : (
                                <Popconfirm
                                    title="确定此费用已结清吗？"
                                    placement="bottom"
                                    onConfirm={() => {
                                        this.operateChargeClosing(record.id)
                                    }}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button size="small" style={{ marginLeft: 10 }} type="primary">
                                        结清
                                    </Button>
                                </Popconfirm>
                            )}
                        </Fragment>
                    )}
                </div>
            </div>
        )
    }
    render() {
        const { charge, searchParams } = this.props
        return (
            <div className={theme.detailCard} style={{ marginTop: '0.4rem' }}>
                <div className={theme.titleChip}>
                    <div>
                        <span className={theme.divider}>|</span>
                        <span className={theme.title}>费用列表</span>
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
                    </div>
                </div>
                <Table
                    bordered={true} //边框
                    pagination={{
                        hideOnSinglePage: true,
                        total: charge.totalCount,
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '15', '20'],
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onPageNoChange,
                    }}
                    rowKey={(record, index) => `complete${record.id}${index}`}
                    dataSource={charge.list}
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
                            title: '收款所属期',
                            dataIndex: 'receiveDates',
                            key: 'receiveDates',
                            align: 'center',
                        },
                        {
                            title: '收款日期',
                            dataIndex: 'receiveDate',
                            key: 'receiveDate',
                            align: 'center',
                        },
                        {
                            title: '实收款金额（元）',
                            dataIndex: 'realAmount',
                            key: 'realAmount',
                            align: 'center',
                        },
                        {
                            title: '凭证号',
                            dataIndex: 'license',
                            key: 'license',
                            align: 'center',
                        },
                        {
                            title: '未收余额（元）',
                            dataIndex: 'restAmount',
                            key: 'restAmount',
                            align: 'center',
                        },
                        {
                            title: '状态',
                            dataIndex: 'status',
                            key: 'status',
                            align: 'center',
                            render: status => {
                                if (status === '未核对') {
                                    return <Tag color="blue">{status}</Tag>
                                } else if (status === '已结清') {
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
                                this.showDetail(record.feeId)
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
                    <ChargeForm
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
                    <ChargeDetail />
                </Modal>
            </div>
        )
    }
}
export default Charge
