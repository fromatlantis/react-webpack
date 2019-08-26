import React, { PureComponent } from 'react'
import { Table, Tooltip } from 'antd'
import theme from 'Theme'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/changes'
@connect(
    state => ({
        changes: state.changes.changes,
        customerBaseInfo: state.customer.customerBaseInfo,
    }),
    dispatch => {
        return bindActionCreators(
            {
                getRecordsList: actions('getRecordsList'),
            },
            dispatch,
        )
    },
)
class Changes extends PureComponent {
    componentWillReceiveProps(nextProps) {
        if (this.props.customerBaseInfo !== nextProps.customerBaseInfo) {
            if (nextProps.customerBaseInfo.id) {
                this.props.getRecordsList({
                    category: this.props.category,
                    customerId: nextProps.customerBaseInfo.id,
                })
            }
        }
    }
    render() {
        const { changes } = this.props
        return (
            <div className={theme.detailCard}>
                <div className={theme.titleChip}>
                    <div>
                        <span className={theme.divider}>|</span>
                        <span className={theme.title}>操作记录</span>
                    </div>
                </div>
                <Table
                    bordered={true} //边框
                    rowKey={(record, index) => `complete${record.id}${index}`}
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
                            title: '操作项',
                            dataIndex: 'item',
                            key: 'item',
                            align: 'center',
                        },
                        {
                            title: '操作时间',
                            dataIndex: 'operateTime',
                            key: 'operateTime',
                            align: 'center',
                        },
                        {
                            title: '操作人员',
                            dataIndex: 'operatorName',
                            key: 'operatorName',
                            align: 'center',
                        },
                        {
                            title: '操作内容',
                            dataIndex: 'content',
                            key: 'content',
                            align: 'center',
                            render: content => (
                                <Tooltip title={content} placement="bottom">
                                    <span>
                                        {content.length > 30
                                            ? `${content.substring(0, 30)}...`
                                            : content}
                                    </span>
                                </Tooltip>
                            ),
                        },
                    ]}
                    dataSource={changes.list}
                />
            </div>
        )
    }
}
export default Changes
