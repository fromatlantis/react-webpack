/**
 * 物料管理 ==> 物料管理/物料详情
 */
import React, { PureComponent } from 'react'
import { Breadcrumb, Button, Table, Input, DatePicker, Divider } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { Link } from 'react-router-dom'
import { FormView } from 'components'

import styles from '../Material.module.css'

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]

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
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    {
        title: '数量',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
    },
    {
        title: '库存',
        dataIndex: 'adress',
        key: 'adress',
        align: 'center',
    },
    {
        title: '时间',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
    },
    {
        title: '更新人',
        dataIndex: 'adess',
        key: 'adess',
        align: 'center',
    },
    {
        title: '联系方式',
        dataIndex: 'aess',
        key: 'aess',
        align: 'center',
    },
]

@connect(
    state => {
        return {
            MaterialList: state.materialManager.MaterialList, //企业详情信息
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getMaterialList: actions('getMaterialList'),
            },
            dispatch,
        )
    },
)
class MaterialDetails extends PureComponent {
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={`/material/manager`}>物料管理</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>物料详情</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ margin: '20px 10px' }}>
                    <p className={styles.pmargin}>物料类型：工具类</p>
                    <p className={styles.pmargin}>物料名称：扳手</p>
                    <p className={styles.pmargin}>物料型号：Gj346532</p>
                    <p className={styles.pmargin}>物料价格：15元</p>
                    <p className={styles.pmargin}> 库存数量：15</p>
                    <p>用途说明：物料说明、使用说明、说明</p>
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}
export default MaterialDetails
