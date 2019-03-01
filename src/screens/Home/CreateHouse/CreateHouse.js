/**
 * 房源管理==》房源管理==》新建
 */
import React, { PureComponent } from 'react'
import { Card, Input, Select, Button, Col, Row, Form, Modal, Steps, message,notification, Icon, Upload } from 'antd'
import styles from '../index.module.css'
import { Link } from 'react-router-dom'
import UploadImg from '../../../components/UploadImg/UploadImg'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const Step = Steps.Step;

class FormCreate extends React.Component{
    state = {
        icon: null,
        //上传照片
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }
    ImgOnClick = (file) => {
        this.setState({ icon: file })
    }
    //上传图片方法
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }
    handleChange = ({ fileList }) => this.setState({ fileList })

    handleSubmit = (e) => {  
        e.preventDefault();
        let { icon } = this.state
        let { fileList } = this.state
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            fieldsValue.planePhoto = icon
            if(JSON.stringify(fieldsValue.planePhoto) === 'null'){
                this.openNotification()
            }else if(fileList==''){
                this.openNotification()
            }else{
                fieldsValue.realityPhoto = fileList
                fieldsValue.buildingId = this.props.Ids
                this.props.addHouse(fieldsValue)
            }
        });
    }
    openNotification = () => {
        notification.open({
          message: '智慧园区提醒您：',
          description: '请上传平面/实景图！',
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
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        //上传图片属性
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const children = [];
        const nums =this.props.NoOrNum.split(',')[1];
        for (let i = 1; i <= nums; i++) {
            children.push(<Option key={i}>{i}</Option>);
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit} style={{marginRight:'50px'}}>
                         <Row gutter={16}>
                             <Col span={12}>
                                 <FormItem {...formItemLayout} label="楼栋名称：" >
                                     {getFieldDecorator('buildingName', {
                                        rules: [{  required: true, message: '请输入楼栋名称', }],
                                    })(
                                        <Input disabled className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="楼栋编号：" >
                                    {getFieldDecorator('buildingNo', {
                                        rules: [{  required: true, message: '请输入楼栋编号', }],
                                    })(
                                        <Input disabled className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                         <Row gutter={16}>
                             <Col span={12}>
                                 <FormItem {...formItemLayout} label="楼层数：" >
                                     {getFieldDecorator('floorLevel', {
                                        rules: [{  required: true, message: '请选择楼层数', }],
                                    })(
                                        // <Input className={styles.inputStyle2} />
                                        <Select style={{ width:'350px' }} placeholder='请选择楼层数' >{children}</Select>
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="房间号：" >
                                    {getFieldDecorator('houseNo', {
                                        rules: [{  required: true, message: '请输入房间号', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="租赁面积(㎡)：" >
                                    {getFieldDecorator('rentArea', {
                                        rules: [{  required: true, message: '请输入租赁面积', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="朝向：" >
                                    {getFieldDecorator('orientation', {
                                        rules: [{  required: true, message: '请输入朝向', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="建筑面积(㎡)：" >
                                    {getFieldDecorator('buildingArea', {
                                        rules: [{  required: true, message: '请输入建筑面积', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="容纳工位：" >
                                    {getFieldDecorator('workerOne', {
                                        rules: [{  required: true, message: '请输入容纳工位', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="类型：" >
                                    {getFieldDecorator('houseType', {
                                        rules: [{  required: true, message: '请选择标题', }],
                                    })(
                                        <Select style={{ width:'350px' }}>
                                            {/* <Option value="">全部</Option> */}
                                            <Option value="1">写字楼</Option>
                                            <Option value="2">商铺</Option>
                                            <Option value="3">住宅</Option>
                                            <Option value="4">厂房</Option>
                                            <Option value="5">其他</Option>
                                        </Select>
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="房间价格(元/月)：" >
                                    {getFieldDecorator('housePrice', {
                                        rules: [{  required: true, message: '请输入标题', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="状态：" >
                                    {getFieldDecorator('houseStatus', {
                                        rules: [{  required: true, message: '请选择标题', }],
                                    })(
                                        <Select style={{ width:'350px' }}>
                                            {/* <Option value="">全部</Option> */}
                                            <Option value="1">待租</Option>
                                            <Option value="2">已租</Option>
                                            <Option value="3">自用</Option>
                                            <Option value="5">其他</Option>
                                        </Select>
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="公摊面积(㎡)：" >
                                    {getFieldDecorator('pooledArea', {
                                        rules: [{  required: true, message: '请输入标题', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="负责人：" >
                                    {getFieldDecorator('leader', {
                                        rules: [{  required: true, message: '请输入标题', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                                <FormItem {...formItemLayout} label="联系方式：" >
                                    {getFieldDecorator('telephone', {
                                        rules: [{  required: true, message: '请输入标题', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                                <FormItem {...formItemLayout} label="邮箱：" >
                                    {getFieldDecorator('email', {
                                        rules: [{  required: true, message: '请输入标题', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="房源描述：" >
                                    {getFieldDecorator('houseDescribe', {
                                        rules: [{  required: true, message: '请输入标题', }],
                                    })(
                                        <TextArea placeholder="请输入备注" autosize={{ minRows: 5, maxRows: 8 }} />
                                    )} 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="上传平面图片：">
                                    {getFieldDecorator('icon')(
                                        <UploadImg onUpload={this.ImgOnClick} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="上传实景图片：">
                                    {getFieldDecorator('realityPhoto')(
                                        <div style={{ width:'100%' }}>
                                            <Upload
                                                action="//jsonplaceholder.typicode.com/posts/"
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange}
                                            >
                                                {fileList.length >= 4 ? null : uploadButton}
                                            </Upload>
                                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                            </Modal>
                                        </div>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem>
                            <Button type='primary' htmlType="submit" style={{ marginLeft:'45%' }}>保存</Button>
                            <Button className={styles.btnStyle} style={{ marginLeft:'5%' }}>
                                <Link to={{ pathname: "/home"}}>取消</Link>
                            </Button>
                        </FormItem>
                    </Form>
            </div>
        )
    }
}
const FormCreateDiv = Form.create({
    mapPropsToFields(props) {
        return {
            buildingName: Form.createFormField({  value: props.names,  }),
            buildingNo: Form.createFormField({  value: props.NoOrNum.split(',')[0],  }),
        };
    }
})(FormCreate)



class CreateHouse extends PureComponent{
    state = { 
        updateVisible: true,
        current: 0,
        buildingName: '',
        noAndFloor: '',
        buildingId:'',
    };
    handleSubmit = (e) => {  e.preventDefault(); }
    // 获取楼栋名称方法
    updateHandleOk = (e) => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            const rangeValue = fieldsValue['testParam'];
            this.props.getBuildingName(rangeValue)
        });
    }
    //获取编号宇楼层
    handleSubmit2 = (e) => {
        // e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            const rangeValue = fieldsValue['buildingName'];
            this.setState({  buildingName: rangeValue, });
            this.props.getBuildingNo(rangeValue)
        });
    }
    //最后传出值
    handleSubmit3 = (e) => {
        message.success('信息已选择完毕!')
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            const rangeValue = fieldsValue['noAndFloor'];
            const rangeValueId = fieldsValue['buildingId'];
            this.setState({  noAndFloor: rangeValue, buildingId: rangeValueId });
        });
        this.setState({  updateVisible: false, });
    }

    next(num) {
        if(num===0){
            this.updateHandleOk()
        }else if(num===1){
            this.handleSubmit2()
        }
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    //步骤条中每部分内容
    divUpToDiv=(current)=>{
        if(current===0){
            const { getFieldDecorator } = this.props.form;
            return(
                <Form layout="inline" onSubmit={this.handleSubmit} >
                    <Form.Item >
                        {getFieldDecorator('testParam', {
                            rules: [{ required: true, message: '请输入楼栋名称', }],
                        })(
                            <Input style={{width:'300px'}} placeholder='楼栋名称'/>
                        )}
                    </Form.Item>
                </Form>
            )
        }else if(current===1){
            const children = [];
            const buildingName =this.props.buildingName;
            for (let i = 0; i < buildingName.length; i++) {
                children.push(<Option key={buildingName[i].buildingName}>{buildingName[i].buildingName}</Option>);
            }
            const { getFieldDecorator } = this.props.form;
            return(
                <Form layout="inline" onSubmit={this.handleSubmit2} >
                    <Form.Item >
                        {getFieldDecorator('buildingName', {
                            rules: [{ required: true, message: '请选择楼宇', }],
                        })(
                            <Select style={{ width: 300 }} placeholder='请选择楼宇' >{children}</Select>
                        )}
                    </Form.Item>
                </Form>
            )
        }else if(current===2){
            const children1 = [];
            const buildingNo =this.props.buildingNo;
            for (let i = 0; i < buildingNo.length; i++) {
                children1.push(<Option key={buildingNo[i].noAndFloor}>{buildingNo[i].buildingNo}座  共{buildingNo[i].floor}层</Option>);
            }
            const { getFieldDecorator } = this.props.form;
            return(
                <Form layout="inline" onSubmit={this.handleSubmit3} >
                    <Form.Item >
                        {getFieldDecorator('noAndFloor', {
                            rules: [{ required: true, message: '请选择编号与楼层', }],
                        })(
                            <Select style={{ width: 300 }} placeholder='请选择编号与楼层' >{children1}</Select>
                        )}
                    </Form.Item>
                </Form>
            )
        }
    }
  
    render() {
        const { current } = this.state;
        const steps = [
            { title: '楼栋名称检索' },
            { title: '确认楼栋名称' },
            { title: '确认具体信息' },
        ];
        return (
            <div>
                <Card
                    title={
                        <div style={{ height:'40px' }}>
                            <span className={styles.titleStyle}>添加房源</span>
                        </div>
                    }
                    style={{ width:'100%' }}
                >
                    <FormCreateDiv Ids={this.state.buildingId} names={this.state.buildingName} NoOrNum={this.state.noAndFloor} addHouse={this.props.addHouseInfo}/>
                </Card>
                <Modal
                    title="确认要添加房源的楼栋信息"
                    visible={this.state.updateVisible}
                    maskClosable={false}
                    width={ '600px' }
                    footer={null}
                >
                    <Steps current={current} size="small">
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className={styles.stepscontent}>
                        {this.divUpToDiv(current)}
                    </div>
                    <div className="steps-action">
                        {
                        current < steps.length - 1
                        && <Button type="primary" onClick={() => this.next(current)}>下一步</Button>
                        }
                        {
                        current === steps.length - 1
                        && <Button type="primary" onClick={ this.handleSubmit3 }>完成</Button>
                        }
                        {
                        current > 0
                        && (<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>上一步</Button>)
                        }
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(CreateHouse)