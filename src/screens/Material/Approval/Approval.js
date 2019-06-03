/**
 * 物料管理 ==> 申请审批
 */
import React, { PureComponent } from 'react'
import { Alert, Button, Table, Input, DatePicker, Divider, Card, Select } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { Link } from 'react-router-dom'
import { SearchView } from 'components'

import styles from '../Material.module.css'

const Option = Select.Option

@connect(
    state => {
        return {
            MaterialApplyList: state.materialManager.MaterialApplyList, //物料审批列表
            MaterialApplyListTotalCount: state.materialManager.MaterialApplyListTotalCount, //物料审批列表总条数
            searchParamsMaterialApplyList: state.materialManager.searchParamsMaterialApplyList, //物料审批列表-分页
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getMaterialApplyList: actions('getMaterialApplyList'),
            },
            dispatch,
        )
    },
)
class Approval extends PureComponent {
    //生命周期
    componentDidMount = () => {
        //获取申请审批列表
        this.props.getMaterialApplyList()
    }
    //申请审批列表分页方法
    onShowSizeChange(current, pageSize) {
        this.props.getMaterialApplyList({ pageNo: 1, pageSize: pageSize })
    }
    onChange(pageNo, pageSize) {
        this.props.getMaterialApplyList({ pageNo: pageNo, pageSize: pageSize })
    }
    //检索表单
    renderForm = type => {
        const items = [
            {
                label: '物料类型：',
                field: 'materialType',
                component: (
                    <Select style={{ width: '200px' }} placeholder="请选择类型">
                        <Option value="0">全部</Option>
                        <Option value="1">工具类</Option>
                        <Option value="2">一次性消耗品</Option>
                    </Select>
                ),
            },
            {
                label: '申请人：',
                field: 'applierName',
                component: <Input placeholder="请输入" />,
            },
            {
                label: '状态：',
                field: 'status',
                component: (
                    <Select style={{ width: '200px' }} placeholder="请选择类型">
                        <Option value="0">待审批</Option>
                        <Option value="1">已通过</Option>
                        <Option value="2">已拒绝</Option>
                    </Select>
                ),
            },
        ]
        return (
            <SearchView
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
    // 查询
    search = () => {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                values.pageNo = 1
                // console.log('values', values)
                this.props.getMaterialApplyList(values)
            }
        })
    }
    handleReset = () => {
        this.form.resetFields()
        this.search()
    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                key: 'num',
                align: 'center',
                render: (text, record, index) => <span>{index + 1}</span>,
            },
            {
                title: '申请人',
                dataIndex: 'applierName',
                key: 'applierName',
                align: 'center',
            },
            {
                title: '申请部门',
                dataIndex: 'applierDeptName',
                key: 'applierDeptName',
                align: 'center',
            },
            {
                title: '申请时间',
                dataIndex: 'applyTime',
                key: 'applyTime',
                align: 'center',
            },
            {
                title: '物料类型',
                dataIndex: 'materialType',
                key: 'materialType',
                align: 'center',
            },
            {
                title: '物料型号',
                dataIndex: 'materialSize',
                key: 'materialSize',
                align: 'center',
            },
            {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                align: 'center',
            },
            {
                title: '申请数量',
                dataIndex: 'materialCount',
                key: 'materialCount',
                align: 'center',
            },
            {
                title: '申请原因',
                dataIndex: 'cause',
                key: 'cause',
                align: 'center',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                align: 'center',
                render: status =>
                    status === '0' ? (
                        <span style={{ color: 'orange' }}>待审批</span>
                    ) : status === '1' ? (
                        <span style={{ color: '#32CD32' }}>已通过</span>
                    ) : (
                        <span style={{ color: 'red' }}>已拒绝</span>
                    ),
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'center',
                render: (text, record) =>
                    record.status === '0' ? (
                        <Link
                            to={{ pathname: `/material/applyDetail/${record.keyId}` }}
                            style={{ color: '#4169E1' }}
                        >
                            审批
                        </Link>
                    ) : (
                        <Link
                            to={{ pathname: `/material/applyDetail/${record.keyId}` }}
                            style={{ color: 'green' }}
                        >
                            查看
                        </Link>
                    ),
            },
        ]
        return (
            <Card title="申请审批" bordered={false}>
                <div className={styles.searchCard}>
                    {this.renderForm()}
                    <div className={styles.toolbar}>
                        <Button type="ghost" onClick={this.handleReset}>
                            清空
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                    </div>
                    <Alert
                        message={'共 ' + this.props.MaterialApplyListTotalCount + ' 项'}
                        type="info"
                        showIcon
                    />
                </div>
                <Table
                    dataSource={this.props.MaterialApplyList}
                    columns={columns}
                    rowKey={(record, index) => `complete${record.id}${index}`}
                    pagination={{
                        current: this.props.searchParamsMaterialApplyList.pageNo,
                        showSizeChanger: true,
                        pageSizeOptions: ['2', '5', '10'],
                        total: this.props.MaterialApplyListTotalCount,
                        onShowSizeChange: this.onShowSizeChange.bind(this),
                        onChange: this.onChange.bind(this),
                    }}
                />
            </Card>
        )
    }
}
export default Approval
