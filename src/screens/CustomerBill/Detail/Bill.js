import React, { PureComponent } from 'react'
import { Button, Table } from 'antd'
import theme from 'Theme'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/bill'
@connect(
    state => ({
        bill: state.bill.bill,
        router: state.router,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getBillList: actions('getBillList'),
            },
            dispatch,
        )
    },
)
class Bill extends PureComponent {
    componentDidMount() {
        const {
            location: { pathname },
        } = this.props.router
        const params = pathname.match(/[^/]+/g)
        const id = params[params.length - 1]
        this.props.getBillList({
            customerId: id,
        })
    }
    render() {
        const { bill } = this.props
        return (
            <div className={theme.detailCard} style={{ marginTop: '0.4rem' }}>
                <div className={theme.titleChip}>
                    <div>
                        <span className={theme.divider}>|</span>
                        <span className={theme.title}>账单列表</span>
                        <Button size="small" type="primary">
                            添加
                        </Button>
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
                    ]}
                    dataSource={bill.list}
                />
            </div>
        )
    }
}
export default Bill
