/**
 * 租赁管理=》租赁申请=》提交申请
 */
import React, { PureComponent } from 'react'
import { Form,Card,Button,DatePicker,Input,Select,notification,Icon, Col, Row, message } from 'antd';
import { Link } from 'react-router-dom'
import UploadImg from '../../../components/UploadImg/UploadImg'
import moment from "moment";

const Option = Select.Option;
const Search = Input.Search;
const { RangePicker } = DatePicker;

class SubmitApply extends PureComponent {
    state = {
        valueStr: '1',
        //上传身份证
        iconZ: null,
        iconF: null,
        iconH: null,
        iconY: null,
        displayStr: 'none',
    }
    ImgOnClickZ = (file) => {
        this.setState({  iconZ: file })
    }
    ImgOnClickF = (file) => {
        this.setState({  iconF: file })
    }
    ImgOnClickH = (file) => {
        this.setState({  iconH: file })
    }
    ImgOnClickY = (file) => {
        this.setState({  iconY: file })
    }
    //客户类型改变
    changeCustomerType = (value) => {
        this.setState({ valueStr:value })
    }
    //根据企业名称搜索企业信息
    changeCompanyName = (cname) => {
        // alert(cname)
        this.props.getCompanyInfoByName(cname)
    }
    //隐藏de企业信息
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
        if(num==='2'){
        return(
                <div>
                    <Form.Item {...formItemLayout} label='企业名称：'>
                        {getFieldDecorator('companyName')(
                            <Search placeholder="输入企业名称以检索企业信息" style={{width:'400px'}} onSearch={(value) => this.changeCompanyName(value)} />
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
                        {getFieldDecorator('industry')(
                            <Input style={{width:'400px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="上传合同：">
                        <div style={{ display:'flex',flexDirection:'row' }}>
                            <UploadImg onUpload={this.ImgOnClickH}/>
                        </div>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="上传营业执照：">
                        <div style={{ display:'flex',flexDirection:'row' }}>
                            <UploadImg onUpload={this.ImgOnClickY}/>
                        </div>
                    </Form.Item>
                </div>
            )
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { iconZ, iconF, iconH, iconY } = this.state
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            //租赁时间
            const rangeValue = fieldsValue['beginEndDate'];
            let rangeValueBegin = rangeValue[0].format('YYYY-MM-DD HH:mm:ss')
            let rangeValueEnd = rangeValue[1].format('YYYY-MM-DD HH:mm:ss')
            //客户类型
            let customerTypee = fieldsValue['customerType'];
            let companynoo = ''
            if(customerTypee==='1'){
                customerTypee = 'personal'
            }else{
                customerTypee = 'company'
                companynoo = this.props.companyMessages[0].companyno
                if(!(fieldsValue['companyName'])){
                    message.error('请填写企业信息!')
                    return;
                }
            }
            //企业名称
            
            const values = {
                ...fieldsValue,
                customerType: customerTypee,
                companyno: companynoo,
                houseId: this.props.match.params.id,
                rentPrice: this.props.match.params.rentPrice,
                beginEndDate: '',
                beginDate: rangeValueBegin,
                endDate: rangeValueEnd,
                identityFrontal: iconZ,
                identityDorsal: iconF,
                contract: iconH,
                tradingCertificate: iconY,
            }
            if(JSON.stringify(values.identityFrontal) === 'null' || JSON.stringify(values.identityDorsal) === 'null'){
                this.openNotification()
            }else{
                console.log(values)
                this.props.saveCompamyApply(values)
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
                    <Form onSubmit={this.handleSubmit} style={{ marginLeft:'80px' }}>
                        <Row gutter={16}>
                            <Col span={12}>
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
                                    {getFieldDecorator('customerType',{initialValue: this.state.valueStr }, {
                                        rules: [{  required: true, message: '请选择客户类型', }],
                                    })(
                                        <Select style={{width:'400px'}} placeholder='类型' onChange={this.changeCustomerType}>
                                            <Option value="1">个人</Option>
                                            <Option value="2">企业</Option>
                                        </Select>
                                    )} 
                                </Form.Item>
                                <Form.Item {...formItemLayout} label='联系电话：'>
                                    {getFieldDecorator('phoneNums', {
                                        rules: [{  required: true, message: '请输入联系电话', },
                                            {pattern:/^1[3,4,5,7,8]\d{9}$|^(\d{3,4}-)?\d{7,8}$/,message:'请输入正确的联系方式！'}],
                                    })(
                                        <Input style={{width:'400px'}} placeholder='请输入'/>
                                    )}
                                </Form.Item>
                                <Form.Item {...formItemLayout} label='邮箱：'>
                                    {getFieldDecorator('emails', {
                                        rules: [{  required: true, message: '请输入邮箱', },{ type: 'email', message: '请输入正确的邮箱地址！' }],
                                    })(
                                        <Input style={{width:'400px'}} placeholder='请输入'/>
                                    )}
                                </Form.Item>
                                <Form.Item {...formItemLayout} label="上传申请人证件：">
                                    <div style={{ display:'flex',flexDirection:'row' }}>
                                        <UploadImg onUpload={this.ImgOnClickZ}/>
                                        <UploadImg onUpload={this.ImgOnClickF}/>
                                    </div>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                {this.enterpriseM(this.state.valueStr)}
                            </Col>
                        </Row>
                        <Form.Item style={{marginLeft:'15%'}}>
                            <Button htmlType="submit" type='primary'>提交</Button>
                            <Button style={{marginLeft:'15px'}}>
                                <Link to={{ pathname: `/leaseApplyDetiles/${this.props.match.params.id}`}}>取消</Link>
                            </Button>
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
            companyName: Form.createFormField({  value: props.companyMessages[0].name }),
            unitsocialcreditno: Form.createFormField({  value: props.companyMessages[0].unitsocialcreditno }),
            legalrepresent: Form.createFormField({  value: props.companyMessages[0].legalrepresent }),
            enterprisetype: Form.createFormField({  value: props.companyMessages[0].enterprisetype }),
            industry: Form.createFormField({  value: props.companyMessages[0].industrybussness }),
            phoneNums: Form.createFormField({  value: props.companyMessages[0].phoneNums }),
            emails: Form.createFormField({  value: props.companyMessages[0].emails }),
        };
    }
})(SubmitApply)