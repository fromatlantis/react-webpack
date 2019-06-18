import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { Alert, Button, Card, DatePicker, Divider, Input, Select, Table, Modal } from 'antd'
import { FormView } from 'components'
import MeterForm from './MeterForm'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/meter'

const { Option } = Select
const { MonthPicker } = DatePicker

const mapStateToProps = state => {
    return {
        meter: state.meter.meter,
        searchParams: state.meter.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getMeterList: actions('getMeterList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Manage extends PureComponent {
    state = {
        newModal: false,
    }
    componentDidMount() {
        this.props.getMeterList()
    }
    renderForm = () => {
        const items = [
            {
                label: '表编号',
                field: 'repairStatus',
                component: (
                    <Select placeholder="表编号" style={{ width: 160 }}>
                        <Option value="1">待反馈</Option>
                        <Option value="2">待确认</Option>
                        <Option value="3">已完成</Option>
                        <Option value="4">已评价</Option>
                    </Select>
                ),
            },
            {
                label: '表类型',
                field: 'repairStatus',
                component: (
                    <Select placeholder="表类型" style={{ width: 160 }}>
                        <Option value="">全部</Option>
                        <Option value="2">水表</Option>
                        <Option value="3">电表</Option>
                        <Option value="4">燃气表</Option>
                    </Select>
                ),
            },
            {
                label: '安装地址',
                field: 'applyType',
                component: <Input placeholder="安装地址" />,
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
                data={this.props.searchParams}
                saveBtn={false}
            />
        )
    }
    // 新增
    newModal = () => {
        this.setState({
            newModal: true,
        })
    }
    newModalOk = () => {
        this.setState({
            newModal: false,
        })
    }
    newModalCancel = () => {
        this.setState({
            newModal: false,
        })
    }
    render() {
        const columns = [
            {
                title: '表编号',
                dataIndex: 'meterNo',
                key: 'meterNo',
            },
            {
                title: '表类型',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: '抄表周期',
                dataIndex: 'cycle',
                key: 'cycle',
            },
            {
                title: '截止时间',
                dataIndex: 'deadlineDay',
                key: 'deadlineDay',
            },
            {
                title: '安装位置',
                dataIndex: 'location',
                key: 'location',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                render: (_, record) => (
                    <div>
                        <Link to={`/energy/manage/${record.id}`}>
                            <Button type="link" size="small">
                                详情
                            </Button>
                        </Link>
                        <Link to={`/repair/detail/${record.id}`}>
                            <Button type="link" size="small">
                                修改
                            </Button>
                        </Link>
                        <Button type="link" size="small">
                            删除
                        </Button>
                    </div>
                ),
            },
        ]
        const { meter, searchParams } = this.props
        return (
            <Card bordered={false}>
                <div>
                    {this.renderForm()}
                    <div style={{ textAlign: 'right', marginTop: '5px' }}>
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newModal}>
                            新增
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.search}>
                            导入
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.search}>
                            批量设置
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.search}>
                            全部设置
                        </Button>
                    </div>
                </div>
                <Alert
                    style={{ margin: '10px 0' }}
                    message={`共${meter.totalCount || 0}条数据`}
                    type="info"
                    showIcon
                />
                <Table
                    dataSource={meter.list}
                    columns={columns}
                    pagination={{
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '20', '30'],
                        total: meter.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onPageChange,
                    }}
                />
                <Modal
                    title="新增设备"
                    visible={this.state.newModal}
                    onOk={this.newModalOk}
                    onCancel={this.newModalCancel}
                >
                    <MeterForm />
                </Modal>
            </Card>
        )
    }
}
export default Manage
