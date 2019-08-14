import React, { PureComponent } from 'react'
import { Card, Table } from 'antd'
import moment from 'moment'
import styles from '../index.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/approval'

const mapStateToProps = state => {
    return {
        changesList: state.approval.changesList,
        searchParams: state.approval.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getChangesList: actions('getChangesList'),
        },
        dispatch,
    )
}

const columns = [
    {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
        title: '更新项',
        dataIndex: 'changeItem',
        key: 'changeItem',
        align: 'center',
    },
    {
        title: '更新时间',
        dataIndex: 'changeTime',
        key: 'changeTime',
        align: 'center',
        render: changeTime => <span>{moment(changeTime).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
        title: '公司名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
]
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Approval extends PureComponent {
    componentDidMount = () => {
        const companyId = sessionStorage.getItem('companyId')
        if (companyId) {
            this.props.getChangesList(companyId)
        }
    }
    // 分页
    onChange = pageNo => {
        this.props.getRecentNews({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getRecentNews({ pageNo: 1, pageSize })
    }
    render() {
        const { changesList, searchParams } = this.props
        return (
            <div className={styles.contianer} style={{ background: 'rgba(240,242,245,1)' }}>
                <div className={styles.titleSty}>
                    <div className={styles.titleName}>更新审批</div>
                </div>
                <div className={styles.tableSty}>
                    <Table
                        pagination={{
                            current: searchParams.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: changesList.totalCount,
                            onShowSizeChange: this.onShowSizeChange,
                            onChange: this.onChange,
                        }}
                        dataSource={changesList.resultList}
                        columns={columns}
                    />
                </div>
            </div>
        )
    }
}
export default Approval
