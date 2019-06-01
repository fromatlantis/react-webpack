/**
 * 物料管理 ==> 申请记录/申请详情
 */
import React, { PureComponent } from 'react'
import { Breadcrumb, Button, Radio, Input, Card, Form } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { Link } from 'react-router-dom'
import { SearchView } from 'components'

import styles from '../Material.module.css'

const { TextArea } = Input

@connect(
    state => {
        return {
            MaterialApplyDetail: state.materialManager.MaterialApplyDetail, //物料审批详情
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getMaterialApplyDetail: actions('getMaterialApplyDetail'),
            },
            dispatch,
        )
    },
)
class RecordDetail extends PureComponent {
    //生命周期
    componentDidMount = () => {
        let id = this.props.match.params.id
        //获取审批详情
        this.props.getMaterialApplyDetail(id)
    }
    render() {
        const item = this.props.MaterialApplyDetail
        return (
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={`/material/record`}>申请记录</Link>
                        </Breadcrumb.Item>
                        {item.status === '0' ? (
                            <Breadcrumb.Item>查看审批</Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item>查看详情</Breadcrumb.Item>
                        )}
                    </Breadcrumb>
                }
                bordered={false}
            >
                <div style={{ margin: '0 0 0 110px' }}>
                    <p className={styles.pmargin}>申请人：{item.applierName}</p>
                    <p className={styles.pmargin}>联系电话：{item.applierPhone}</p>
                    <p className={styles.pmargin}>申请部门：{item.applierDeptName}</p>
                    <p className={styles.pmargin}>申请时间：{item.applyTime}</p>
                    <p className={styles.pmargin}>物料类型：{item.materialType}</p>
                    <p className={styles.pmargin}>物料型号：{item.materialSize}</p>
                    <p className={styles.pmargin}>物料名称：{item.materialName}</p>
                    <p className={styles.pmargin}>
                        物料价格：{item.materialPrice ? item.materialPrice : '-'}
                    </p>
                    <p className={styles.pmargin}>申请数量：{item.materialCount}</p>
                    <p className={styles.pmargin}>申请原因：{item.cause}</p>
                </div>
                {item.status === '0' ? (
                    <span />
                ) : (
                    <div style={{ margin: '0 0 20px 110px' }}>
                        <p className={styles.pmargin}>
                            审批结果：
                            {item.status === '1' ? '已通过' : '已拒绝'}
                        </p>
                        <p className={styles.pmargin}>审批意见：{item.opinion}</p>
                    </div>
                )}
            </Card>
        )
    }
}
export default Form.create()(RecordDetail)
