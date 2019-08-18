import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/approval'
import styles from '../index.module.css'
import { Table, Button, Modal, Radio, Card, Input } from 'antd'
import moment from 'moment'
import mapping from './mapping'

class Approval extends PureComponent {
    state = {
        record: {},
        addReview: false,
        editReview: false,
        approveStatus: '1',
        opinion: '', //审核意见
    }
    componentDidMount() {
        this.props.getChangesList()
        const { params } = this.props.match
        if (params.id) {
            this.props.getChangeDetail({ keyId: params.id })
        }
    }
    // 待办跳转
    componentWillReceiveProps(nextProps) {
        if (this.props.changeDetail !== nextProps.changeDetail) {
            const { changeDetail } = nextProps
            if (changeDetail.type === '新增') {
                this.addReview(changeDetail)
            } else if (changeDetail.type === '修改') {
                this.editReview(changeDetail)
            }
        }
    }
    // 新增状态的弹窗
    addReview = record => {
        this.setState({
            record,
            addReview: true,
        })
    }
    // 修改状态天的弹窗
    editReview = record => {
        this.setState({
            record,
            editReview: true,
        })
    }
    handleOk = () => {
        let { record, approveStatus, opinion } = this.state
        this.props.changeApprove({
            approveId: record.keyId,
            approveStatus,
            opinion,
        })
        this.setState({
            addReview: false,
            editReview: false,
        })
    }
    handleCancel = () => {
        this.setState({
            addReview: false,
            editReview: false,
        })
    }
    renderRecord = content => {
        const { oldContent, newContent } = this.state.record
        const oldJSON = JSON.parse(oldContent || '{}')
        const newJSON = JSON.parse(newContent || '{}')
        // 匹配大类
        const result = mapping[this.state.record.model]
        return Object.keys(content)
            .filter(key => result.filter(item => item.field === key).length > 0)
            .map(key => {
                const item = result.filter(item => item.field === key)[0]
                const value = content[key]
                if (oldContent && oldJSON[key] !== newJSON[key]) {
                    return (
                        <div
                            style={{
                                color: '#FF3300',
                                display: 'flex',
                                lineHeight: '23px',
                                fontSize: '12px',
                            }}
                            key={key}
                        >
                            <b>{item.label}：</b>
                            <div>{value && item.formatter ? item.formatter(value) : value}</div>
                        </div>
                    )
                } else {
                    return (
                        <div
                            style={{ display: 'flex', lineHeight: '23px', fontSize: '12px' }}
                            key={key}
                        >
                            <b>{item.label}：</b>
                            <div>{value && item.formatter ? item.formatter(value) : value}</div>
                        </div>
                    )
                }
            })
    }
    onStatusChange = e => {
        this.setState({
            approveStatus: e.target.value,
        })
    }
    opinionChange = e => {
        this.setState({
            opinion: e.target.value,
        })
    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (_, __, index) => <span>{index + 1}</span>,
            },
            {
                title: '公司名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '更新项',
                dataIndex: 'changeItem',
                key: 'changeItem',
            },
            {
                title: '更新时间',
                dataIndex: 'changeTime',
                key: 'changeTime',
                render: changeTime => (
                    <span>{moment(changeTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                ),
            },
            {
                title: '更新方式',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '来源',
                dataIndex: 'source',
                key: 'source',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'center',
                render: (_, record) => {
                    if (record.updateStatus === '1') {
                        return <span>已通过</span>
                    } else if (record.updateStatus === '2') {
                        return <span>已驳回</span>
                    } else if (record.type === '新增' || record.type === '删除') {
                        return (
                            <Button
                                type="link"
                                size="small"
                                onClick={() => {
                                    this.addReview(record)
                                }}
                            >
                                审核
                            </Button>
                        )
                    } else if (record.type === '修改') {
                        return (
                            <Button
                                type="link"
                                size="small"
                                onClick={() => {
                                    this.editReview(record)
                                }}
                            >
                                审核
                            </Button>
                        )
                    }
                },
            },
        ]
        const { record, addReview, editReview, approveStatus } = this.state
        const { changesList } = this.props
        return (
            <div className={styles.contianer} style={{ background: 'rgba(240,242,245,1)' }}>
                <div className={styles.titleSty}>
                    <div className={styles.titleName}>核心人员</div>
                </div>
                <div className={styles.tableSty}>
                    <Table dataSource={changesList} columns={columns} />
                </div>
                <Modal
                    title={`${record.changeItem}「${record.type}」`}
                    visible={addReview}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.renderRecord(JSON.parse(record.newContent || '{}'))}
                    <Radio.Group
                        onChange={this.onStatusChange}
                        defaultValue={approveStatus}
                        style={{ marginBottom: '10px', marginTop: '10px' }}
                    >
                        <Radio value="1">同意</Radio>
                        <Radio value="0">驳回</Radio>
                    </Radio.Group>
                    <Input.TextArea
                        onChange={this.opinionChange}
                        autosize={{ minRows: 3, maxRows: 6 }}
                        placeholder="填写审核意见"
                    />
                </Modal>
                <Modal
                    title={`${record.changeItem}「${record.type}」`}
                    visible={editReview}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={900}
                >
                    <div style={{ display: 'flex', marginBottom: '15px' }}>
                        <Card
                            bordered={false}
                            size="small"
                            title="更新前"
                            style={{ marginRight: '15px', flex: 1 }}
                        >
                            {this.renderRecord(JSON.parse(record.oldContent || '{}'))}
                        </Card>
                        <Card bordered={false} size="small" title="更新后" style={{ flex: 1 }}>
                            {this.renderRecord(JSON.parse(record.newContent || '{}'))}
                        </Card>
                    </div>
                    <Radio.Group
                        onChange={this.onStatusChange}
                        defaultValue={approveStatus}
                        style={{ marginBottom: '10px' }}
                    >
                        <Radio value="1">同意</Radio>
                        <Radio value="2">驳回</Radio>
                    </Radio.Group>
                    <Input.TextArea
                        onChange={this.opinionChange}
                        autosize={{ minRows: 3, maxRows: 6 }}
                        placeholder="填写审核意见"
                    />
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    changesList: state.approval.changesList,
    changeDetail: state.approval.changeDetail,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getChangesList: actions('getChangesList'),
            getChangeDetail: actions('getChangeDetail'),
            changeApprove: actions('changeApprove'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Approval)
