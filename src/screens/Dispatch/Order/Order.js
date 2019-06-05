import React, { PureComponent } from 'react'
import { Alert, Button, Card, Table, Select, DatePicker, Divider, Modal, Cascader } from 'antd'
import { FormView } from 'components'

import NewOrder from './NewOrder'
import DispatchForm from './DispatchForm'
import TransferForm from './TransferForm'
import RepairDetail from './RepairDetail'
import styles from '../Dispatch.module.css'
import moment from 'moment'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/dispatch'
import { actions as repairActions } from 'reduxDir/repair'
import { actions as configurationActions } from 'reduxDir/configuration'

const { Option } = Select
const { RangePicker } = DatePicker

const buildTree = data => {
    let result = data
        .map(item => ({
            value: item.typeName,
            label: item.typeName,
            id: item.id,
            pid: item.pid,
        }))
        .reduce((prev, item) => {
            prev[item.pid] ? prev[item.pid].push(item) : (prev[item.pid] = [item])
            return prev
        }, {})
    for (let prop in result) {
        result[prop].forEach(function(item, i) {
            //console.log(item)
            if (result[item.id]) {
                item.children = result[item.id]
            }
        })
    }
    return result[0]
}

const mapStateToProps = state => {
    return {
        auths: state.authUser.auths,
        repairDetail: state.repair.repairDetail,
        workorder: state.dispatch.workorder,
        workorderParams: state.dispatch.workorderParams,
        setDataList: state.configuration.setDataList,
        repairsType: buildTree(state.repair.repairsType),
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getWorkorderList: actions('getWorkorderList'),
            // getRepairs: actions('getRepairs'),
            newDispatch: actions('newDispatch'),
            dispatching: actions('dispatching'),
            orderTransfer: actions('orderTransfer'),
            getRepairDetail: repairActions('getRepairDetail'),
            getRepairsType: repairActions('getRepairsType'),
            getSetInfo: configurationActions('getSetInfo'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Order extends PureComponent {
    state = {
        newInfo: false,
        dispatchForm: false,
        transferForm: false,
        repairId: null, //点击派工、转办时保存
        isHasten: this.props.auths.includes('派工催办') ? 'Y' : 'N',
    }
    componentDidMount() {
        this.props.getWorkorderList({
            isHasten: this.state.isHasten,
        })
        this.props.getSetInfo()
        this.props.getRepairsType({
            level: '3',
        })
    }
    renderForm = type => {
        const items = [
            {
                label: '报修类型',
                field: 'applyType',
                component: (
                    <Cascader
                        placeholder="请选择报修类型"
                        options={this.props.repairsType}
                        changeOnSelect
                    />
                ),
            },
            {
                label: '状态',
                field: 'status',
                component: (
                    <Select placeholder="状态" style={{ width: 120 }}>
                        <Option value="1">正常</Option>
                        <Option value="2">派工超时</Option>
                    </Select>
                ),
            },
            {
                label: '报修时间',
                field: 'applicationTime',
                component: <RangePicker />,
            },
        ]
        return (
            <FormView
                wrappedComponentRef={ref => {
                    this.wrappedForm = ref
                }}
                formItemLayout={{}}
                layout="inline"
                items={items}
                data={this.props.workorderParams}
                saveBtn={false}
            />
        )
    }
    // 新建派工弹窗
    newInfo = () => {
        this.setState({
            newInfo: true,
        })
    }
    newInfoOk = () => {
        this.newOrderForm.validateFields((errors, values) => {
            if (!errors) {
                console.log(values)
                let formData = new FormData()
                // 必填
                formData.append('repairLocation', values.repairLocation.join(''))
                formData.append('faultDesc', values.faultDesc)
                formData.append('serviceType', values.serviceType)
                formData.append('maintainersId', values.maintainersId.join(''))
                if (values.applyType) {
                    if (values.applyType.length === 1) {
                        formData.append('category', values.applyType[0])
                    } else if (values.applyType.length === 2) {
                        formData.append('category', values.applyType[0])
                        formData.append('classify', values.applyType[1])
                    } else if (values.applyType.length === 3) {
                        formData.append('category', values.applyType[0])
                        formData.append('classify', values.applyType[1])
                        formData.append('fault', values.applyType[2])
                    }
                }
                // 非必填
                if (values.repairAddress) {
                    formData.append('repairAddress', values.repairAddress)
                }
                if (values.dispatchDesc) {
                    formData.append('dispatchDesc', values.dispatchDesc)
                }
                if (values.isStuck) {
                    formData.append('isStuck', values.isStuck)
                    if (values.stuckNum) {
                        formData.append('stuckNum', values.stuckNum)
                    }
                }
                if (values.faultImages) {
                    values.faultImages.forEach(item => {
                        formData.append('faultImages', item)
                    })
                }
                this.props.newDispatch(formData)
                this.setState({
                    newInfo: false,
                })
            }
        })
    }
    newInfoCancel = () => {
        this.setState({
            newInfo: false,
        })
    }
    // 派工
    dispatchForm = repairId => {
        this.props.getRepairDetail({ repairId })
        this.setState({
            dispatchForm: true,
            repairId,
        })
    }
    dispatchFormOk = () => {
        this.dispatchForm.validateFields((errors, values) => {
            if (!errors) {
                const { repairId } = this.state
                let formData = new FormData()
                formData.append('repairId', repairId)
                if (values.applyType) {
                    if (values.applyType.length === 1) {
                        formData.append('category', values.applyType[0])
                    } else if (values.applyType.length === 2) {
                        formData.append('category', values.applyType[0])
                        formData.append('classify', values.applyType[1])
                    } else if (values.applyType.length === 3) {
                        formData.append('category', values.applyType[0])
                        formData.append('classify', values.applyType[1])
                        formData.append('fault', values.applyType[2])
                    }
                }
                formData.append('serviceType', values.serviceType)
                formData.append('maintainersId', values.maintainersId.join(','))
                if (values.dispatchDesc) {
                    formData.append('dispatchDesc', values.dispatchDesc)
                }
                this.props.dispatching(formData)
                this.setState({
                    dispatchForm: false,
                })
            }
        })
    }
    dispatchFormCancel = () => {
        this.setState({
            dispatchForm: false,
        })
    }
    // 转办
    transferForm = repairId => {
        this.props.getRepairDetail({ repairId })
        this.setState({
            repairId,
            transferForm: true,
        })
    }
    transferFormOk = () => {
        this.transferForm.validateFields((errors, values) => {
            if (!errors) {
                const { repairId } = this.state
                const { repairDetail } = this.props
                let formData = new FormData()
                formData.append('repairId', repairId)
                formData.append('reporterId', repairDetail.reporterId)
                formData.append('transferId', values.transferId)
                if (values.transferDesc) {
                    formData.append('transferDesc', values.transferDesc)
                }
                this.props.orderTransfer(formData)
                this.setState({
                    transferForm: false,
                })
            }
        })
    }
    transferFormCancel = () => {
        this.setState({
            transferForm: false,
        })
    }
    // 催办
    // renderHastening = ({ repairId, reportTime }) => {
    //     const { dispatchingTimeLimit } = this.props.setDataList
    //     const diff = moment().diff(moment(reportTime), 'minutes')
    //     if (diff > dispatchingTimeLimit) {
    //         return (
    //             <Button
    //                 onClick={() => {
    //                     this.props.hastening(repairId)
    //                 }}
    //                 type="link"
    //                 size="small"
    //             >
    //                 催办
    //             </Button>
    //         )
    //     }
    // }
    search = () => {
        const { form } = this.wrappedForm.props
        const values = form.getFieldsValue()
        this.props.getWorkorderList({
            isHasten: this.state.isHasten,
            ...values,
        })
    }
    reset = () => {
        const { form } = this.wrappedForm.props
        form.resetFields()
        this.search()
    }
    // 分页
    onPageChange = pageNo => {
        this.props.getWorkorderList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getWorkorderList({ pageNo: 1, pageSize })
    }
    render() {
        const columns = [
            {
                title: '报修人',
                dataIndex: 'reporterName',
                key: 'reporterName',
            },
            {
                title: '联系方式',
                dataIndex: 'reporterContactWay',
                key: 'reporterContactWay',
            },
            {
                title: '报修时间',
                dataIndex: 'reportTime',
                key: 'reportTime',
            },
            {
                title: '报修地址',
                dataIndex: 'repairLocation',
                key: 'repairLocation',
            },
            {
                title: '报修类型',
                dataIndex: 'categories',
                key: 'categories',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                // render: (_, record) => {
                //     const { dispatchingTimeLimit } = this.props.setDataList
                //     const diff = moment().diff(moment(record.reportTime), 'minutes')
                //     if (diff > dispatchingTimeLimit) {
                //         return <span>超时</span>
                //     } else {
                //         return <span>正常</span>
                //     }
                // },
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                render: (_, record) => (
                    <div>
                        <Button
                            onClick={() => {
                                this.dispatchForm(record.repairId)
                            }}
                            type="link"
                            size="small"
                        >
                            派工
                        </Button>
                        <Button
                            onClick={() => {
                                this.transferForm(record.repairId)
                            }}
                            type="link"
                            size="small"
                        >
                            转办
                        </Button>
                        {record.status === '派工超时' && this.state.isHasten === 'Y' && (
                            <Button
                                onClick={() => {
                                    this.props.hastening(record.repairId)
                                }}
                                type="link"
                                size="small"
                            >
                                催办
                            </Button>
                        )}
                    </div>
                ),
            },
        ]
        const { workorder, workorderParams } = this.props
        return (
            <Card title="工单处理" bordered={false}>
                <div className={styles.searchCard}>
                    {this.renderForm()}
                    <div className={styles.toolbar}>
                        <Button type="ghost" onClick={this.reset}>
                            清除
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newInfo}>
                            新建派工
                        </Button>
                    </div>
                    <Alert message={`共${workorder.totalCount || 0}条数据`} type="info" showIcon />
                </div>
                <Table
                    dataSource={workorder.list}
                    columns={columns}
                    pagination={{
                        current: workorderParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '20', '30'],
                        total: workorder.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onPageChange,
                    }}
                />
                <Modal
                    title="新建派工"
                    visible={this.state.newInfo}
                    onOk={this.newInfoOk}
                    onCancel={this.newInfoCancel}
                >
                    <NewOrder
                        forwardedRef={ref => {
                            this.newOrderForm = ref
                        }}
                    />
                </Modal>
                <Modal
                    title="派工"
                    visible={this.state.dispatchForm}
                    onOk={this.dispatchFormOk}
                    onCancel={this.dispatchFormCancel}
                    width={800}
                >
                    <RepairDetail detail={this.props.repairDetail} />
                    <Divider />
                    <DispatchForm
                        forwardedRef={ref => {
                            this.dispatchForm = ref
                        }}
                    />
                </Modal>
                <Modal
                    title="转办"
                    visible={this.state.transferForm}
                    onOk={this.transferFormOk}
                    onCancel={this.transferFormCancel}
                    width={800}
                >
                    <RepairDetail detail={this.props.repairDetail} />
                    <Divider />
                    <TransferForm
                        forwardedRef={ref => {
                            this.transferForm = ref
                        }}
                    />
                </Modal>
            </Card>
        )
    }
}
export default Order
