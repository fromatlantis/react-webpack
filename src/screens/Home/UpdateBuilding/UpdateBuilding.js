import React, { PureComponent } from 'react'
import { Input, Form, Modal, Col, Row, } from 'antd'
import styles from '../index.module.css'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";

const FormItem = Form.Item;
const { TextArea } = Input;

class UpdateBuilding extends PureComponent {
    state = {
        addVisible: false,
        buildingId: '',
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        // this.setState({  buildingId:this.props.fatherName });
    }
    //楼宇管理“修改”弹出表单的方法
    showModal = () => {
        this.props.getBuildingDetail(this.props.fatherName)
        this.setState({  addVisible: true, });
    }
    handleOk = () => {
        // let { icon } = this.state
        this.props.form.validateFields((error, values) => {
            if (!error) {
                values.buildingId = this.props.fatherName
                // values.realityPhoto = icon
                console.log(values)
                this.props.updateBuildingInfo(values)
                this.setState({  addVisible: false, });
            }
        })
    }
    handleCancel = () => {
        this.setState({  addVisible: false, });
    }
    checkPrice = (rule, value, callback) => {
        if ( value==='' ||  value > 0) {
          callback();
          return;
        }
        callback('请输入正确的值！');
    }

    render() {
        const { addVisible } = this.state;

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }

        return (
            <div>
                <Link to={{ }} onClick={this.showModal}>修改</Link>
                <Modal
                    title={<span className={styles.drawerTitleStyles}>修改楼宇</span>}
                    visible={addVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    maskClosable='true'
                    okText='保存'
                    width='800px'
                >
                    <Form onSubmit={this.handleSubmit} style={{marginRight:'40px'}}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="楼栋名称:" >
                                    {getFieldDecorator('buildingName', {
                                        rules: [{  required: true, message: '请输入楼栋名称', }],
                                    })(
                                        <Input disabled className={styles.inputStyle} />
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="楼栋编号:" >
                                    {getFieldDecorator('buildingNo', {
                                        rules: [{  required: true, message: '请输入楼栋编号', }],
                                    })(
                                        <Input disabled className={styles.inputStyle} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="楼层数:" >
                                    {getFieldDecorator('floor', {
                                        rules: [{  required: true, message: '请输入楼层数', }],
                                    })(
                                        <Input disabled className={styles.inputStyle} />
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="地址:" >
                                    {getFieldDecorator('location', {
                                        rules: [{  required: true, message: '请输入地址', }],
                                    })(
                                        <Input className={styles.inputStyle} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="建筑面积(㎡)：" >
                                    {getFieldDecorator('buildingArea', {
                                        rules: [{  required: true, message: '请输入建筑面积', },{ validator: this.checkPrice }],
                                    })(
                                        <Input className={styles.inputStyle} />
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="使用面积(㎡)：" >
                                    {getFieldDecorator('useArea', {
                                        rules: [{  required: true, message: '请输入使用面积', },{ validator: this.checkPrice }],
                                    })(
                                        <Input className={styles.inputStyle} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="租赁面积(㎡)：" >
                                    {getFieldDecorator('rentArea', {
                                        rules: [{  required: true, message: '请输入租赁面积', },{ validator: this.checkPrice }],
                                    })(
                                        <Input className={styles.inputStyle} />
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={12}>
                            
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="楼宇介绍:" >
                                    {getFieldDecorator('buildingIntro', {
                                        rules: [{  required: true, message: '请输入楼宇介绍', }],
                                    })(
                                        <TextArea placeholder="请输入介绍" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="交通说明:" >
                                    {getFieldDecorator('trafficState', {
                                        rules: [{  required: true, message: '请输入交通说明', }],
                                    })(
                                        <TextArea placeholder="请输入介绍" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        
                        
                        
                        
                        
                        
                        
                        
                        
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create({
    mapPropsToFields(props) {
        return {
            buildingName: Form.createFormField({  value: props.buildingDetail.buildingName,  }),
            buildingNo: Form.createFormField({  value: props.buildingDetail.buildingNo,  }),
            floor: Form.createFormField({  value: props.buildingDetail.floor,  }),
            location: Form.createFormField({  value: props.buildingDetail.location,  }),
            buildingArea: Form.createFormField({  value: props.buildingDetail.buildingArea,  }),
            useArea: Form.createFormField({  value: props.buildingDetail.useArea,  }),
            rentArea: Form.createFormField({  value: props.buildingDetail.rentArea,  }),
            buildingIntro: Form.createFormField({  value: props.buildingDetail.buildingIntro,  }),
            trafficState: Form.createFormField({  value: props.buildingDetail.trafficState,  }),
        };
    }
})(UpdateBuilding)