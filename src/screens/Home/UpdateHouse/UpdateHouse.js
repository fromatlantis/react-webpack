/**
 * 房源管理==》房源管理==》修改
 */
import React, { PureComponent } from 'react'
import { Card, Input, Select, Button, Col, Row, Form } from 'antd'
import styles from '../index.module.css'
import { Link } from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class UpdateHouse extends PureComponent {
    state = {
        icon: null,
        houseId:'',
    }
    //生命周期
    componentDidMount=()=>{
        let houseId = this.props.match.params.id
        this.setState({ houseId: houseId })
        this.props.getHouseDetail({ houseId:houseId })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            const values = {
                ...fieldsValue,
                houseId: this.state.houseId,
            }
            console.log(values)
            this.props.updateHouseInfo(values)
        });
    }
    ImgOnClick = (file) => {
        this.setState({ icon: file })
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
        return(
            <div>
                <Card
                    title={
                        <div style={{ height:'40px' }}>
                            <span className={styles.titleStyle}>修改房源信息</span>
                        </div>
                    }
                    style={{ width:'100%' }}
                    bordered={false}
                >
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
                                        <Input disabled className={styles.inputStyle2} />
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
                                        rules: [{  required: true, message: '请选择类型', }],
                                    })(
                                        <Select style={{ width:'350px' }} placeholder='类型'>
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
                                        rules: [{  required: true, message: '请输入房间价格', }],
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
                                        rules: [{  required: true, message: '请输入公摊面积', }],
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
                                        rules: [{  required: true, message: '请输入联系方式', }],
                                    })(
                                        <Input className={styles.inputStyle2} />
                                    )} 
                                </FormItem>
                                <FormItem {...formItemLayout} label="邮箱：" >
                                    {getFieldDecorator('email', {
                                        rules: [{  required: true, message: '请输入邮箱', },{ type: 'email', message: '请输入正确的邮箱地址' }],
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
                        <FormItem>
                            <Button type='primary' htmlType="submit" style={{ marginLeft:'45%', marginTop:'20px' }}>保存</Button>
                            <Button className={styles.btnStyle} style={{ marginLeft:'5%' }}>
                                <Link to={{ pathname: "/home"}}>取消</Link>
                            </Button>
                        </FormItem>
                    </Form>
                    {/* <div className={styles.oneDrawerDiv}>
                        <Button type="primary" onClick={this.showChildrenDrawer}>保存</Button>
                        <Button style={{ marginLeft: 12, }}>
                            <Link to={{ pathname: "/home"}}>取消</Link>
                        </Button>
                    </div> */}
                </Card>

            </div>
        )
    }
}
export default Form.create({
    mapPropsToFields(props) {
        return {
            buildingName: Form.createFormField({  value: props.houseDetail.buildingName,  }),
            buildingNo: Form.createFormField({  value: props.houseDetail.buildingNo,  }),
            floorLevel: Form.createFormField({  value: props.houseDetail.floorLevel,  }),
            houseNo: Form.createFormField({  value: props.houseDetail.houseNo,  }),
            rentArea: Form.createFormField({  value: props.houseDetail.rentArea,  }),
            buildingArea: Form.createFormField({  value: props.houseDetail.buildingArea,  }),
            pooledArea: Form.createFormField({  value: props.houseDetail.pooledArea,  }),
            workerOne: Form.createFormField({  value: props.houseDetail.workerone,  }),
            housePrice: Form.createFormField({  value: props.houseDetail.housePrice,  }),
            orientation: Form.createFormField({  value: props.houseDetail.orientation,  }),
            houseType: Form.createFormField({  value: props.houseDetail.typeValue,  }),
            houseStatus: Form.createFormField({  value: props.houseDetail.statusValue,  }),
            leader: Form.createFormField({  value: props.houseDetail.leader,  }),
            telephone: Form.createFormField({  value: props.houseDetail.telephone,  }),
            email: Form.createFormField({  value: props.houseDetail.email,  }),
            houseDescribe: Form.createFormField({  value: props.houseDetail.houseDescribe,  }),
        };
    }
})(UpdateHouse)