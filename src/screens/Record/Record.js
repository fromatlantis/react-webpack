import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, DatePicker, Table, Input, Select, Tag, Modal, message } from 'antd'
import { AuthWrapper, FormView } from 'components'
import theme from 'Theme'
import BatchImport from './BatchImport/BatchImport'
import ChargeForm from './Detail/ChargeForm'
import request from '../../utils/request'
import moment from 'moment'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/records'
import { actions as chargeActions } from 'reduxDir/charge'
const { Option } = Select
const { RangePicker } = DatePicker
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
        field: 'customer',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '应收款所属期',
        field: 'receiveDate',
        component: <RangePicker />,
    },
    {
        label: '状态',
        field: 'status',
        component: (
            <Select placeholder="请选择">
                <Option value="1">未结清</Option>
                <Option value="2">已结清</Option>
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
        title: '产品类型',
        dataIndex: 'productType',
        key: 'productType',
        fixed: 'left',
        width: 150,
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
        title: '应收款所属期',
        dataIndex: 'shouldReceiveDates',
        key: 'shouldReceiveDates',
    },
    {
        title: '合计应收金额（元）',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: amount => <span>{amount && amount.toFixed(2)}</span>,
    },
    {
        title: '合计已收金额（元）',
        dataIndex: 'realAmounts',
        key: 'realAmounts',
        render: amount => <span>{amount && amount.toFixed(2)}</span>,
    },
    {
        title: '合计未收金额（元）',
        dataIndex: 'restAmounts',
        key: 'restAmounts',
        render: amount => <span>{amount && amount.toFixed(2)}</span>,
    },
    {
        title: '状态',
        fixed: 'right',
        align: 'center',
        width: 100,
        dataIndex: 'feeStatus',
        key: 'feeStatus',
        render: feeStatus =>
            feeStatus === '已结清' ? (
                <Tag color="green">{feeStatus}</Tag>
            ) : (
                <Tag color="blue">{feeStatus}</Tag>
            ),
    },
]
const checkColumns = [
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
        title: '收款所属期',
        dataIndex: 'realReceiveDates',
        key: 'realReceiveDates',
    },
    {
        title: '收款日期',
        dataIndex: 'receiveDate',
        key: 'receiveDate',
        defaultSortOrder: 'descend',
        sorter: (a, b) => moment(a.receiveDate, 'YYYY.MM.DD') - moment(b.receiveDate, 'YYYY.MM.DD'),
    },
    {
        title: '实收款余额',
        dataIndex: 'realAmount',
        key: 'realAmount',
        sorter: (a, b) => parseFloat(a.realAmount) - parseFloat(b.realAmount),
    },
    {
        title: '凭证号',
        dataIndex: 'license',
        key: 'license',
    },
    {
        title: '未收余额',
        dataIndex: 'restAmount',
        key: 'restAmount',
        sorter: (a, b) => parseFloat(a.restAmount) - parseFloat(b.restAmount),
    },
]
let selectedIds = []
@connect(
    state => ({
        records: state.records.records,
        searchParams: state.records.searchParams,
        batchCharges: state.records.batchCharges,
        detail: state.charge.detail,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getChargeRecords: actions('getChargeRecords'),
                unverifiedCharges: actions('unverifiedCharges'),
                operateVerifyCharge: actions('operateVerifyCharge'),
                getChargeDetail: chargeActions('getChargeDetail'),
                operateUpdateCusCharge: chargeActions('operateUpdateCusCharge'),
            },
            dispatch,
        )
    },
)
class Record extends PureComponent {
    state = {
        confirmList: [],
        comfirmModal: false,
        addBillModal: false,
    }
    componentDidMount() {
        this.props.getChargeRecords()
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.batchCharges !== nextProps.batchCharges) {
            this.setState({
                confirmList: nextProps.batchCharges,
            })
        }
    }
    // 查询
    search = () => {
        const params = this.searchForm.getFieldsValue()
        this.props.getChargeRecords(params)
    }
    reset = () => {
        this.searchForm.resetFields()
        this.search()
    }
    // 分页
    onPageNoChange = pageNo => {
        this.props.getChargeRecords({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getChargeRecords({ pageNo: 1, pageSize })
    }
    // 批量核对
    batchComfirm = () => {
        if (selectedIds.length > 0) {
            this.props.unverifiedCharges({
                customerIds: selectedIds.join(','),
            })
            this.setState({
                comfirmModal: true,
            })
        } else {
            message.error('请从列表中选择客户')
        }
    }
    comfirmModalOk = () => {
        const { confirmList } = this.state
        if (confirmList.length > 0) {
            this.props.operateVerifyCharge({
                chargeIds: confirmList.map(item => item.feeId).join(','),
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
    // 编辑-更新
    addBillOk = () => {
        const form = this.billForm.getWrappedInstance()
        form.getFormValues(async params => {
            await request({
                type: 'post',
                url: `/charge/updateBill`,
                contentType: 'multipart/form-data',
                data: {
                    chargeId: this.props.detail.id,
                    ...params,
                },
            })
            message.success('修改成功')
            this.props.unverifiedCharges({
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
    // 移除
    removeComfirm = feeId => {
        const list = this.state.confirmList.filter(item => item.feeId !== feeId)
        this.setState({
            confirmList: list,
        })
    }
    render() {
        const { records, searchParams } = this.props
        const { confirmList } = this.state
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
                    <Alert style={{ flex: 1 }} message={`共${records.totalCount || 0}项`} />
                    <div className={theme.btnGroup}>
                        <Button type="primary" onClick={this.reset}>
                            清空
                        </Button>
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <AuthWrapper auth="批量导入">
                            <BatchImport />
                        </AuthWrapper>
                        <AuthWrapper auth="批量核对">
                            <Button type="primary" onClick={this.batchComfirm}>
                                批量核对
                            </Button>
                        </AuthWrapper>
                    </div>
                </div>
                <Table
                    style={{ background: '#fff' }}
                    rowKey="customerId"
                    rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => {
                            selectedIds = selectedRowKeys
                        },
                    }}
                    scroll={{ x: 1500 }}
                    dataSource={records.list}
                    columns={columns}
                    pagination={{
                        hideOnSinglePage: true,
                        total: records.totalCount,
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
                                this.props.push(`/record/detail/${record.customerId}`)
                            }, // 点击行
                        }
                    }}
                />
                <Modal
                    title="批量核对"
                    visible={this.state.comfirmModal}
                    onOk={this.comfirmModalOk}
                    onCancel={this.comfirmModalCancel}
                    width={930}
                    // bodyStyle={{ height: 430, overflow: 'auto' }}
                >
                    <Alert type="info" message={`核对费用共 ${confirmList.length || 0} 项`} />
                    <Table
                        dataSource={confirmList}
                        pagination={{
                            hideOnSinglePage: true,
                            total: confirmList.length,
                        }}
                        defaultPageSize={5}
                        columns={[
                            ...checkColumns,
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
                                                this.showEdit(record.feeId)
                                            }}
                                        >
                                            编辑
                                        </Button>
                                        <Button
                                            size="small"
                                            type="link"
                                            onClick={() => {
                                                this.removeComfirm(record.feeId)
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
            </div>
        )
    }
}
export default Record
