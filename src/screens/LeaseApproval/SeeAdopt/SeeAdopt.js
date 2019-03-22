/**
 * 租赁审批=》查看通过审批申请 
 */
import React, { PureComponent } from 'react'
import { Form,Card,Button,Input,Radio,Carousel,Modal } from 'antd';
import { Link } from 'react-router-dom'
import UploadImg from '../../../components/UploadImg/UploadImg'

const { TextArea } = Input;
const RadioGroup = Radio.Group;

class SeeAdopt extends PureComponent {
    state = { 
        visible: false,
        visible2: false,
        visibleP: false,
        visibleP2: false,
    };
    //生命周期
    componentDidMount = () => {
        let applyId = this.props.match.params.id
        //GET企业入驻申请详情
        this.props.getEnterApplyDetail(applyId)
    }

    enterpriseM = () => {
        const { getFieldDecorator } = this.props.form;
        const item = this.props.enterApplyDetail
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
        if(item.customer_type_name==='企业'){
            return(
                <div>
                    <Form.Item {...formItemLayout} label='企业名称：'>
                        {getFieldDecorator('company_name',{initialValue: item.company_name })(
                            <Input disabled style={{width:'400px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='企业信用代码：'>
                        {getFieldDecorator('unitsocialcreditno',{initialValue: item.unitsocialcreditno })(
                            <Input disabled style={{width:'400px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='企业法人：'>
                        {getFieldDecorator('legalrepresent',{initialValue: item.legalrepresent })(
                            <Input disabled style={{width:'400px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='企业类型：'>
                        {getFieldDecorator('enterprisetype',{initialValue: item.enterprisetype })(
                            <Input disabled style={{width:'400px'}}/>
                        )}
                    </Form.Item>
                </div>
            )
        }
    }
    imgM = () => {
        const { getFieldDecorator } = this.props.form;
        const item = this.props.enterApplyDetail
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
        if(item.customer_type_name==='企业'){
            return(
                <div>
                    <Form.Item {...formItemLayout} label="合同：">
                        {getFieldDecorator('icon')(
                            <img src={item.contract} onClick={this.showModal} alt="" style={{width:110,height:110,border: '1px solid rgb(221,221,221)'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="营业执照：">
                        {getFieldDecorator('icon')(
                            <img src={item.trading_certificate} onClick={this.showModal2} alt="" style={{width:110,height:110,border: '1px solid rgb(221,221,221)'}}/>
                        )}
                    </Form.Item>
                    <Modal title="合同" visible={this.state.visible}
                        onOk={this.handleCancel} onCancel={this.handleCancel} footer={null}
                    >
                        <Carousel autoplay>
                            <img src={item.contract} height='400px' alt=''/>
                        </Carousel>
                    </Modal>
                    <Modal title="营业执照" visible={this.state.visible2}
                        onOk={this.handleCancel2} onCancel={this.handleCancel2} footer={null}
                    >
                        <Carousel autoplay>
                            <img src={item.trading_certificate} height='400px' alt=''/>
                        </Carousel>
                    </Modal>
                </div>
            )
        }
    }
    // 合同、执照图片弹出方法
    showModal = () => {
        this.setState({  visible: true, });
    }
    handleCancel = () => {
        this.setState({  visible: false, });
    }
    showModal2 = () => {
        this.setState({  visible2: true, });
    }
    handleCancel2 = () => {
        this.setState({  visible2: false, });
    }
    OrNoDesc = () => {
        const { getFieldDecorator } = this.props.form;
        const item = this.props.enterApplyDetail
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
        if(item.approve_status==='2'){
            return(
                <Form.Item {...formItemLayout} label="审批意见:" >
                    {getFieldDecorator('approve_desc',{initialValue: item.approve_desc })(
                        <TextArea placeholder="不通过原因" autosize={{ minRows: 3, maxRows: 6 }} style={{width:'400px'}}/>
                    )} 
                </Form.Item>
    )
        }
    }
    upTitle = () => {
        const item = this.props.enterApplyDetail
        if(item.approve_status==='1'){
            return(
                <span style={{ fontSize:'18px', fontWeight:'bold' }}>通过审批详情</span>
            )
        }else{
            return(
                <span style={{ fontSize:'18px', fontWeight:'bold' }}>拒绝审批详情</span>
            )
        }
    }
    // 身份证图片弹出方法
    showModalP = () => {
        this.setState({  visibleP: true, });
    }
    handleCancelP = () => {
        this.setState({  visibleP: false, });
    }
    showModalP2 = () => {
        this.setState({  visibleP2: true, });
    }
    handleCancelP2 = () => {
        this.setState({  visibleP2: false, });
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const item = this.props.enterApplyDetail
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

        return (
            <div>
                <Card
                    title={ this.upTitle() }
                    style={{ width: '100%' }}
                >
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Item {...formItemLayout} label='申请人：'>
                            {getFieldDecorator('apply_user_name',{initialValue: item.apply_user_name })(
                                <Input disabled style={{width:'400px'}}/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='申请时间：'>
                            {getFieldDecorator('apply_time',{initialValue: item.apply_time })(
                                <Input disabled style={{width:'400px'}}/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='使用时间：'>
                            {getFieldDecorator('begin_date',{initialValue: item.begin_date })(
                                <Input disabled style={{width:'400px'}}/>
                            )}
                        </Form.Item>
                        {this.enterpriseM()}
                        <Form.Item {...formItemLayout} label='联系电话：'>
                            {getFieldDecorator('phoneNums',{initialValue: item.phoneNums })(
                                <Input disabled style={{width:'400px'}}/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='邮箱：'>
                            {getFieldDecorator('emails',{initialValue: item.emails })(
                                <Input disabled style={{width:'400px'}}/>
                            )}
                        </Form.Item>
                        {this.imgM()}
                        <Form.Item {...formItemLayout} label="申请人证件：">
                                <img src={item.identity_dorsal} onClick={this.showModalP} alt="" style={{width:110,height:110,border: '1px solid rgb(221,221,221)'}}/>
                                <img src={item.identity_frontal} onClick={this.showModalP2} alt="" style={{width:110,height:110,border: '1px solid rgb(221,221,221)',marginLeft:'10px'}}/>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='付款金额：'>
                            {getFieldDecorator('ttle',{initialValue: item.rent_price })(
                                <Input disabled style={{width:'400px'}}/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='审批结果：'>
                            <RadioGroup value={parseInt(item.approve_status)}>
                                <Radio value={1}>通过</Radio>
                                <Radio value={2}>不通过</Radio>
                            </RadioGroup>
                        </Form.Item>
                        {this.OrNoDesc()}
                        <Form.Item style={{marginLeft:'15%'}}>
                            <Button style={{marginLeft:'15px'}}>
                                <Link to={{ pathname: "/leaseApproval"}}>返回</Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Modal
                    title="申请人证件"
                    visible={this.state.visibleP}
                    onOk={this.handleCancelP}
                    onCancel={this.handleCancelP}
                    footer={null}
                >
                    <Carousel autoplay>
                        <img src={item.identity_dorsal} height='400px' alt=''/>
                    </Carousel>
                </Modal>
                <Modal
                    title="申请人证件"
                    visible={this.state.visibleP2}
                    onOk={this.handleCancelP2}
                    onCancel={this.handleCancelP2}
                    footer={null}
                >
                    <Carousel autoplay>
                        <img src={item.identity_frontal} height='400px' alt=''/>
                    </Carousel>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(SeeAdopt)