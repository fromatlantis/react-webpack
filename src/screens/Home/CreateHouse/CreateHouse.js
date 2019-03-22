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
        files: [],
         //上传照片2
         previewVisible2: false,
         previewImage2: '',
         fileList2: [],
         files2: [],
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
     //上传图片方法2
     handleCancel2 = () => this.setState({ previewVisible2: false })
     handlePreview2 = (file) => {
         this.setState({
         previewImage2: file.url || file.thumbUrl,
         previewVisible2: true,
         });
     }
     handleChange2 = ({fileList}) => {
         let files2 = []
         for(let i=0;i<fileList.length;i++){
             files2[i] = fileList[i].originFileObj
         }
         this.setState( {fileList2: fileList, files2} );
     }
     beforeUpload2 = (file) => {
         return false
     }

    handleSubmit = (e) => {  
        e.preventDefault();
        let { icon, files, files2 } = this.state
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            // fieldsValue.planePhoto = icon
            if(files2==''){
                this.openNotification()
            }else if(files==''){
                this.openNotification()
            }else{
                fieldsValue.filesName = 'realityPhoto'
                fieldsValue.filesList = files
                fieldsValue.filesName2 = 'planePhoto'
                fieldsValue.filesList2 = files2
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
    checkPrice = (rule, value, callback) => {
        if ( value==='' ||  value > 0) {
          callback();
          return;
        }
        callback('请输入正确的值！');
    }
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
        const { previewVisible, previewImage, fileList, previewVisible2, previewImage2, fileList2 } = this.state;
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
                                    <Select style={{ width:'350px' }} placeholder='楼层数选定后不可修改' >{children}</Select>
                                )} 
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            <FormItem {...formItemLayout} label="房间号：" >
                                {getFieldDecorator('houseNo', {
                                    rules: [{  required: true, message: '请输入房间号', }],
                                })(
                                    <Input className={styles.inputStyle2} placeholder='房间号添加后不可修改'/>
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
                                    rules: [{  required: true, message: '请输入建筑面积', },{ validator: this.checkPrice }],
                                })(
                                    <Input className={styles.inputStyle2} />
                                )} 
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            <FormItem {...formItemLayout} label="容纳工位：" >
                                {getFieldDecorator('workerOne', {
                                    rules: [{  required: true, message: '请输入容纳工位', },{ validator: this.checkPrice }],
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
                                    rules: [{  required: true, message: '请选择类型', }],
                                })(
                                    <Select style={{ width:'350px' }}>
                                        {/* <Option value="">全部</Option> */}
                                        <Option value="0">写字楼</Option>
                                        <Option value="1">商铺</Option>
                                        <Option value="2">住宅</Option>
                                        <Option value="3">厂房</Option>
                                        <Option value="4">其他</Option>
                                    </Select>
                                )} 
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            <FormItem {...formItemLayout} label="房间价格(元/月)：" >
                                {getFieldDecorator('housePrice', {
                                    rules: [{  required: true, message: '请输入房间价格', },{ validator: this.checkPrice }],
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
                                    rules: [{  required: true, message: '请选择状态', }],
                                })(
                                    <Select style={{ width:'350px' }}>
                                        {/* <Option value="">全部</Option> */}
                                        <Option value="0">待租</Option>
                                        <Option value="2">自用</Option>
                                        <Option value="3">其他</Option>
                                    </Select>
                                )} 
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            <FormItem {...formItemLayout} label="公摊面积(㎡)：" >
                                {getFieldDecorator('pooledArea', {
                                    rules: [{  required: true, message: '请输入公摊面积', },{ validator: this.checkPrice }],
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
                                    rules: [{  required: true, message: '请输入负责人', }],
                                })(
                                    <Input className={styles.inputStyle2} />
                                )} 
                            </FormItem>
                            <FormItem {...formItemLayout} label="联系方式：" >
                                {getFieldDecorator('telephone', {
                                    rules: [{ required: true, message: '请输入联系方式' },
                                        {pattern:/^1[3,4,5,7,8]\d{9}$|^(\d{3,4}-)?\d{7,8}$/,message:'请输入正确的联系方式！'}],
                                })(
                                    <Input className={styles.inputStyle2} />
                                )} 
                            </FormItem>
                            <FormItem {...formItemLayout} label="邮箱：" >
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: '请输入邮箱', },{ type: 'email', message: '请输入正确的邮箱地址！' }],
                                })(
                                    <Input className={styles.inputStyle2} />
                                )} 
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            <FormItem {...formItemLayout} label="房源描述：" >
                                {getFieldDecorator('houseDescribe', {
                                    rules: [{  required: true, message: '请输入房源描述', }],
                                })(
                                    <TextArea placeholder="请输入房源描述" autosize={{ minRows: 5, maxRows: 8 }} />
                                )} 
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="上传平面图片：">
                                {getFieldDecorator('planePhoto')(
                                    // <UploadImg onUpload={this.ImgOnClick} />
                                    <div style={{ width:'100%' }}>
                                        <Upload
                                            listType="picture-card"
                                            fileList={fileList2}
                                            onPreview={this.handlePreview2}
                                            onChange={this.handleChange2}
                                            beforeUpload={this.beforeUpload2}
                                        >
                                            {uploadButton}
                                        </Upload>
                                        <Modal visible={previewVisible2} footer={null} onCancel={this.handleCancel2}>
                                            <img alt="example" style={{ width: '100%' }} src={previewImage2} />
                                        </Modal>
                                    </div>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="上传实景图片：">
                                {getFieldDecorator('realityPhoto')(
                                    <div style={{ width:'100%' }}>
                                        <Upload
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={this.handlePreview}
                                            onChange={this.handleChange}
                                            beforeUpload={this.beforeUpload}
                                        >
                                            {uploadButton}
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
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            message.success('信息已选择完毕!')
            const rangeValue = fieldsValue['noAndFloor'];
            let num = 0
            for(let i=0;i<this.props.buildingNo;i++){
                if(this.props.buildingNo[i]===rangeValue){
                    num = i
                }
            }
            this.setState({  noAndFloor: rangeValue, buildingId: this.props.buildingNo[num].buildingId });
            this.setState({  updateVisible: false, });
        });
        
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
                    closable={false}
                >
                    <Steps current={current} size="small">
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className={styles.stepscontent}>
                        {this.divUpToDiv(current)}
                    </div>
                    <div className="steps-action" style={{ width: '30%', marginLeft: '70%', marginTop:'10px' }}>
                        {
                        current > 0
                        && (<Button onClick={() => this.prev()}>上一步</Button>)
                        }
                        {
                        current === 0
                        && (<Button disabled >上一步</Button>)
                        }
                        {
                        current < steps.length - 1
                        && <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.next(current)}>下一步</Button>
                        }
                        {
                        current === steps.length - 1
                        && <Button type="primary" style={{ marginLeft: 8 }} onClick={ this.handleSubmit3 }>完成</Button>
                        }
                        
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(CreateHouse)