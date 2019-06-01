/**
 * 物料申请 ==> 物料下单 ApplySub
 */
import React, { PureComponent } from 'react'
import { Breadcrumb, Button, InputNumber, Input, Card, Form } from 'antd'
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
            MaterialDetail: state.materialManager.MaterialDetail, //物料详情信息
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getMaterialDetail: actions('getMaterialDetail'),
                addMaterialApply: actions('addMaterialApply'), //申请提交
            },
            dispatch,
        )
    },
)
class ApplySub extends PureComponent {
    state = {
        id: '',
    }
    //生命周期
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.setState({ id })
        //获取物料详情
        this.props.getMaterialDetail(id)
    }
    handsub = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                values.materialId = this.state.id
                console.log('values', values)
                this.props.addMaterialApply(values)
            }
        })
    }
    render() {
        const item = this.props.MaterialDetail
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        }
        return (
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={`/material/apply`}>物料申请</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>申请下单</Breadcrumb.Item>
                    </Breadcrumb>
                }
                bordered={false}
            >
                <div style={{ margin: '0 0 0 40px' }}>
                    <p className={styles.pmarginTitle}>{item.name}</p>
                    <div className={styles.aplyDiv}>
                        <p className={styles.pmargint}>物料型号：{item.size}</p>
                        <p className={styles.pmargint}>物料价格：{item.price ? item.price : '-'}</p>
                        <p className={styles.pmargint}>库存：{item.count}</p>
                    </div>
                    <p className={styles.pmargin}>用途说明：{item.remark}</p>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="申请数量：">
                        {getFieldDecorator('materialCount', { initialValue: 1 })(
                            <InputNumber min={0} onChange={this.onChangeNumber} />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="申请原因：">
                        {getFieldDecorator('cause', { initialValue: 0 })(
                            <TextArea autosize={{ minRows: 5 }} />,
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginLeft: '50px' }}>
                        <Button type="primary" onClick={this.handsub}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(ApplySub)
