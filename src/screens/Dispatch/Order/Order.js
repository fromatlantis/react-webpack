import React, { PureComponent } from 'react'
import { Alert, Button, Card, Table, Input, DatePicker, Divider, Modal } from 'antd'
import { FormView } from 'components'

import NewOrder from './NewOrder'
import DispatchForm from './DispatchForm'
import TransferForm from './TransferForm'
import RepairDetail from './RepairDetail'
import styles from '../Dispatch.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/dispatch'
import { actions as repairActions } from 'reduxDir/repair'

const mapStateToProps = state => {
    return {
        repairDetail: state.repair.repairDetail,
        workorder: state.dispatch.workorder,
        repairs: state.dispatch.repairs,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getWorkorderList: actions('getWorkorderList'),
            getRepairs: actions('getRepairs'),
            getRepairDetail: repairActions('getRepairDetail'),
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
    }
    componentDidMount() {
        this.props.getWorkorderList({
            pageNo: 1,
            pageSize: 10,
            isHasten: 'Y',
        })
        // this.props.getRepairs()
    }
    renderForm = type => {
        const items = [
            {
                label: '报修类型',
                field: 'patentName',
                component: <Input />,
            },
            {
                label: '状态',
                field: 'appnumber',
                component: <Input />,
            },
            {
                label: '报修时间',
                field: 'applicationTime',
                component: <DatePicker />,
            },
        ]
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={{}}
                layout="inline"
                items={items}
                data={this.props.searchParams}
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
        this.setState({
            newInfo: false,
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
        })
    }
    dispatchFormOk = () => {
        this.setState({
            dispatchForm: false,
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
            transferForm: true,
        })
    }
    transferFormOk = () => {
        this.setState({
            transferForm: false,
        })
    }
    transferFormCancel = () => {
        this.setState({
            transferForm: false,
        })
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
                        <Divider type="vertical" />
                        <Button
                            onClick={() => {
                                this.transferForm(record.repairId)
                            }}
                            type="link"
                            size="small"
                        >
                            转办
                        </Button>
                    </div>
                ),
            },
        ]
        const { workorder } = this.props
        return (
            <Card title="工单处理" bordered={false}>
                <div className={styles.searchCard}>
                    {this.renderForm()}
                    <div className={styles.toolbar}>
                        <Button type="ghost" onClick={this.handleReset}>
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
                <Table dataSource={workorder.list} columns={columns} />
                <Modal
                    title="新建派工"
                    visible={this.state.newInfo}
                    onOk={this.newInfoOk}
                    onCancel={this.newInfoCancel}
                >
                    <NewOrder />
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
                    <DispatchForm />
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
                    <TransferForm repairs={this.props.repairs} />
                </Modal>
            </Card>
        )
    }
}
export default Order
