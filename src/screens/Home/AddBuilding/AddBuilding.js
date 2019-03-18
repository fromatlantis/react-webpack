import React, { PureComponent } from 'react'
import { Input, Form, Modal, Button, Col, Row, notification, Icon, Upload } from 'antd'
import styles from '../index.module.css'

const FormItem = Form.Item;
const { TextArea } = Input;

class AddBuilding extends PureComponent {
    state = {
        //帮助“添加”弹出表单的状态值
        addVisible: false,
        icon: null,
        //上传照片
        previewVisible: false,
        previewImage: '',
        fileList: [],
        files: [],
    }
    handleSubmit = (e) => {
        e.preventDefault();
    }
    //“添加”弹出表单的方法
    showModal = () => {
        this.setState({  addVisible: true, });
    }
    handleOk = () => {
        let { files } = this.state
        this.props.form.validateFields((error, values) => {
            if (!error) {
                if(files==''){
                    this.openNotification()
                }else{
                    values.filesName = 'realityPhoto'
                    values.filesList = files
                    console.log(values)
                    this.props.AddBuilding(values)
                    this.setState({  addVisible: false, });
                }
            }
        })
    }
    openNotification = () => {
        notification.open({
          message: '智慧园区提醒您：',
          description: '请上传实景图片！',
          placement: "topLeft",
          duration: 2,
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    
        });
      };

    handleCancelF = () => {
        this.setState({  addVisible: false, });
    }
    //上传图片方法
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({fileList}) => {
        let files = []
        for(let i=0;i<fileList.length;i++){
            files[i] = fileList[i].originFileObj
        }
        this.setState( {fileList, files} );
    }
    beforeUpload = (file) => {
        return false
    }
    checkPrice = (rule, value, callback) => {
        if ( value==='' ||  value > 0) {
          callback();
          return;
        }
        callback('请输入正确的值！');
    }

    render() {
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
        //“添加”弹出表单的属性
        const { addVisible } = this.state;
        //上传图片属性
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Button type="primary" onClick={this.showModal} style={{ marginLeft:'10px' }}>添加</Button>
                 <Modal
                    title={<span className={styles.drawerTitleStyles}>添加楼宇</span>}
                    visible={addVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancelF}
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
                                    <Input className={styles.inputStyle} placeholder='楼栋名称添加后不可修改'/>
                                )} 
                            </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="楼栋编号:" >
                                    {getFieldDecorator('buildingNo', {
                                        rules: [{  required: true, message: '请输入楼栋编号', }],
                                    })(
                                        <Input className={styles.inputStyle} placeholder='楼栋编号添加后不可修改'/>
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="楼层数:" >
                                    {getFieldDecorator('floor', {
                                        rules: [{  required: true, message: '请输入楼层数' },{ validator: this.checkPrice }],
                                    })(
                                        <Input className={styles.inputStyle} placeholder='楼层数添加后不可修改'/>
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
                                        <TextArea style={{ width:'250px' }} placeholder="请输入介绍" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="交通说明:" >
                                    {getFieldDecorator('trafficState', {
                                        rules: [{  required: true, message: '请输入交通说明', }],
                                    })(
                                        <TextArea className={styles.inputStyle} placeholder="请输入介绍" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem style={{ marginLeft:'45px' }} label="实景图片：">
                            {getFieldDecorator('realityPhoto')(
                                <div style={{ width:'100%' }}>
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                        beforeUpload={this.beforeUpload}
                                    >
                                        { uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(AddBuilding)