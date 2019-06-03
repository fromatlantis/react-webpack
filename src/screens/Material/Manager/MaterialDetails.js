/**
 * 物料管理 ==> 物料管理/物料详情
 */
import React, { PureComponent } from 'react'
import { Breadcrumb, Button, Table, Input, Card, Divider } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { Link } from 'react-router-dom'
import { FormView } from 'components'

import styles from '../Material.module.css'

const columns = [
    {
        title: '序号',
        dataIndex: 'num',
        key: 'num',
        align: 'center',
        render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
        title: '状态',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        render: type =>
            type === '0' ? <span>入库</span> : type === '1' ? <span>出库</span> : <span>报废</span>,
    },
    {
        title: '数量',
        dataIndex: 'number',
        key: 'number',
        align: 'center',
    },
    {
        title: '库存',
        dataIndex: 'count',
        key: 'count',
        align: 'center',
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
    },
    {
        title: '更新人',
        dataIndex: 'editorName',
        key: 'editorName',
        align: 'center',
    },
    {
        title: '联系方式',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
    },
]

@connect(
    state => {
        return {
            MaterialDetail: state.materialManager.MaterialDetail, //物料详情信息
            materialStockRecordsList: state.materialManager.materialStockRecordsList, //物料出入库记录表列表
            materialStockRecordsTotalCount: state.materialManager.materialStockRecordsTotalCount, //物料出入库记录表列表总条数
            searchParamsmaterialStockRecords:
                state.materialManager.searchParamsmaterialStockRecords, //物料出入库记录表列表-分页
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getMaterialDetail: actions('getMaterialDetail'),
                materialStockRecords: actions('materialStockRecords'),
            },
            dispatch,
        )
    },
)
class MaterialDetails extends PureComponent {
    //生命周期
    componentDidMount = () => {
        let id = this.props.match.params.id
        //获取物料详情
        this.props.getMaterialDetail(id)
        //获取物料出入库记录表
        this.props.materialStockRecords({ materialId: id })
    }
    //物料出入库记录表分页方法
    onShowSizeChange(current, pageSize) {
        this.props.materialStockRecords({ pageNo: 1, pageSize: pageSize })
    }
    onChange(pageNo, pageSize) {
        this.props.materialStockRecords({ pageNo: pageNo, pageSize: pageSize })
    }
    render() {
        const item = this.props.MaterialDetail
        return (
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={`/material/manager`}>物料管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>物料详情</Breadcrumb.Item>
                    </Breadcrumb>
                }
                bordered={false}
            >
                <div style={{ margin: '0 0 20px 10px' }}>
                    <p className={styles.pmargin}>物料类型：{item.type}</p>
                    <p className={styles.pmargin}>物料名称：{item.name}</p>
                    <p className={styles.pmargin}>物料型号：{item.size}</p>
                    <p className={styles.pmargin}>物料价格：{item.price ? item.price : '-'}</p>
                    <p className={styles.pmargin}> 库存数量：{item.count}</p>
                    <p>用途说明：{item.remark}</p>
                </div>
                <Table
                    dataSource={this.props.materialStockRecordsList}
                    columns={columns}
                    rowKey={(record, index) => `complete${record.id}${index}`}
                    pagination={{
                        current: this.props.searchParamsmaterialStockRecords.pageNo,
                        showSizeChanger: true,
                        pageSizeOptions: ['2', '5', '10'],
                        total: this.props.materialStockRecordsTotalCount,
                        onShowSizeChange: this.onShowSizeChange.bind(this),
                        onChange: this.onChange.bind(this),
                    }}
                />
            </Card>
        )
    }
}
export default MaterialDetails
