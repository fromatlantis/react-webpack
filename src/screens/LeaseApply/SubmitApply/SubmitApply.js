/**
 * 租赁管理=》租赁申请=》提交申请
 */
import React, { PureComponent } from 'react'
import { Form,Card,Button,DatePicker,Input,Select,notification,Icon } from 'antd';
import { Link } from 'react-router-dom'
import UploadImg from '../../../components/UploadImg/UploadImg'
import moment from "moment";

const Option = Select.Option;
const { RangePicker } = DatePicker;

class SubmitApply extends PureComponent {
    state = {
        valueStr: 0,
        //上传照片
        // previewVisible: false,
        // previewImage: '',
        // fileList: [],
        //上传身份证
        iconZ: null,
        iconF: null,
    }
    ImgOnClickZ = (file) => {
        this.setState({  iconZ: file })
    }
    ImgOnClickF = (file) => {
        this.setState({  iconF: file })
    }
    //上传图片方法
    // handleCancel = () => this.setState({ previewVisible: false })
    // handlePreview = (file) => {
    //     this.setState({
    //     previewImage: file.url || file.thumbUrl,
    //     previewVisible: true,
    //     });
    // }
    // handleChange = ({ fileList }) => this.setState({ fileList })
    //客户类型改变
    changeCustomerType = (value) => {
        console.log('value==>'+value)
        this.setState({ valueStr:value })
    }
    enterpriseM = (num) => {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        console.log('num==>'+num)
        if(num===2){
            return(
                <div>
                    <Form.Item {...formItemLayout} label='企业名称：'>
                        {getFieldDecorator('company_name')(
                            <Input style={{width:'400px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='企业信用代码：'>
                        {getFieldDecorator('unitsocialcreditno')(
                            <Input style={{width:'400px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='企业法人：'>
                        {getFieldDecorator('legalrepresent')(
                            <Input style={{width:'400px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='企业类型：'>
                        {getFieldDecorator('enterprisetype')(
                            <Input style={{width:'400px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='所属行业：'>
                        {getFieldDecorator('enterptype')(
                            <Input style={{width:'400px'}}/>
                        )}
                    </Form.Item>
                </div>
            )
        }
    }
    messagess = () => {
        if(true){
            return(
                <div>
                    
                </div>
            )
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { iconZ, iconF } = this.state
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            //租赁时间
            const rangeValue = fieldsValue['beginEndDate'];
            let rangeValueBegin = rangeValue[0].format('YYYY-MM-DD HH:mm:ss')
            let rangeValueEnd = rangeValue[1].format('YYYY-MM-DD HH:mm:ss')
            const values = {
                ...fieldsValue,
                beginEndDate: '',
                beginDate: rangeValueBegin,
                endDate: rangeValueEnd,
                identityFrontal: iconZ,
                identityDorsal: iconF,
            }
            if(JSON.stringify(values.identityFrontal) === 'null' || JSON.stringify(values.identityDorsal) === 'null'){
                this.openNotification()
            }else{
                console.log(values)
                // this.props.saveCompamyApply(fieldsValue)
            }
        });
    }
    openNotification = () => {
        notification.open({
          message: '智慧园区提醒您：',
          description: '请上传身份证！',
          placement: "topLeft",
          duration: 2,
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
      };

    render(){

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        //上传图片属性
        // const { previewVisible, previewImage, fileList } = this.state;
        // const uploadButton = (
        //     <div>
        //         <Icon type="plus" />
        //         <div className="ant-upload-text">Upload</div>
        //     </div>
        // );

        return(
            <div>
                <Card bordered={false} style={{ width:'100%' }} bodyStyle={{ padding:'10px 20px', backgroundColor:'#f1f2f6' }}>
                    <Link to={{ pathname: "/leaseApply"}}>租赁管理/租赁申请/提交申请</Link>
                </Card>
                <Card
                    title={
                        <span style={{ fontSize:'18px', fontWeight:'bold' }}>租赁申请</span>
                    }
                    style={{ width: '100%' }}
                >
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Item {...formItemLayout} label='意向房间：'>
                            {getFieldDecorator('houseName')(
                                <Input disabled style={{width:'400px'}} placeholder='请输入'/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='申请人：'>
                            {getFieldDecorator('applyUserName',{
                                rules: [{  required: true, message: '请输入申请人', }],
                            })(
                                <Input style={{width:'400px'}} placeholder='请输入'/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='申请时间：'>
                            {getFieldDecorator('applyTime')(
                                <Input disabled style={{width:'400px'}}/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='租赁时间：'>
                            {getFieldDecorator('beginEndDate', {
                                rules: [{  required: true, message: '请输入租赁时间', }],
                            })(
                                <RangePicker style={{width:'400px'}} />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='客户类型：'>
                            {getFieldDecorator('customerType', {
                                rules: [{  required: true, message: '请输入客户类型', }],
                            })(
                                <Select style={{width:'400px'}} placeholder='类型' onChange={this.changeCustomerType}>
                                    <Option value="1">个人</Option>
                                    <Option value="2">企业</Option>
                                </Select>
                            )} 
                        </Form.Item>
                        {this.enterpriseM(this.state.valueStr)}
                        <Form.Item {...formItemLayout} label='联系电话：'>
                            {getFieldDecorator('phoneNums', {
                                rules: [{  required: true, message: '请输入联系电话', }],
                            })(
                                <Input style={{width:'400px'}} placeholder='请输入'/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='邮箱：'>
                            {getFieldDecorator('emails', {
                                rules: [{  required: true, message: '请输入邮箱', }],
                            })(
                                <Input style={{width:'400px'}} placeholder='请输入'/>
                            )}
                        </Form.Item>
                        {this.messagess(this.state.valueStr)}
                        <Form.Item {...formItemLayout} label="上传申请人证件：">
                            <div style={{ display:'flex',flexDirection:'row' }}>
                                <UploadImg onUpload={this.ImgOnClickZ}/>
                                <UploadImg onUpload={this.ImgOnClickF}/>
                            </div>
                                 {/* <div style={{ width:'100%' }}>
                                     <Upload
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length >= 2 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div> */}
                        </Form.Item>
                        <Form.Item style={{marginLeft:'15%'}}>
                            <Button htmlType="submit" type='primary'>提交</Button>
                            <Button style={{marginLeft:'15px'}}>取消</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }

}
export default Form.create({
    mapPropsToFields(props) {
        return {
            applyUserName: Form.createFormField({  value: props.user.name }),
            houseName: Form.createFormField({  value: props.match.params.name }),
            applyTime: Form.createFormField({  value: moment().format('YYYY-MM-DD HH:mm:ss') }),
        };
    }
})(SubmitApply)