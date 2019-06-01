/**
 * 物料管理 ==> 申请审批/申请详情
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
                approvalMaterialApply: actions('approvalMaterialApply'), //审批
            },
            dispatch,
        )
    },
)
class ApplyDetail extends PureComponent {
    state = {
        //单选radio的参数
        value: 2,
        id: '',
    }
    //生命周期
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.setState({ id })
        //获取审批详情
        this.props.getMaterialApplyDetail(id)
    }
    // 出入库-radio状态的改变回调
    radioOnChange = e => {
        console.log('radio状态值', e.target.value)
        this.setState({
            value: e.target.value,
        })
    }
    handsub = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                values.keyId = this.state.id
                values.status = this.state.value
                console.log('values', values)
                this.props.approvalMaterialApply(values)
            }
        })
    }
    render() {
        const item = this.props.MaterialApplyDetail
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        return (
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={`/material/Approval`}>使用记录</Link>
                        </Breadcrumb.Item>
                        {item.status === '0' ? (
                            <Breadcrumb.Item>审批申请</Breadcrumb.Item>
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
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="审批结果：">
                            <Radio.Group onChange={this.radioOnChange} value={this.state.value}>
                                <Radio value={1}>同意</Radio>
                                <Radio value={2}>拒绝</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="审批意见：">
                            {getFieldDecorator('opinion', { initialValue: 0 })(
                                <TextArea autosize={{ minRows: 5 }} />,
                            )}
                        </Form.Item>
                        <Form.Item style={{ marginLeft: '15%' }}>
                            <Button type="primary" onClick={this.handsub}>
                                提交
                            </Button>
                            <Button style={{ marginLeft: '15px' }}>
                                <Link to={{ pathname: `/material/Approval` }}>取消</Link>
                            </Button>
                        </Form.Item>
                    </Form>
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
export default Form.create()(ApplyDetail)
