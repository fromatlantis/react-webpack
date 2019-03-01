/**
 * 租赁管理=》租赁申请=》提交申请
 */
import React, { PureComponent } from 'react'
import { Form,Card,Button,DatePicker,Input,Select,Upload,Modal,Icon } from 'antd';
import { Link } from 'react-router-dom'
import UploadImg from '../../../components/UploadImg/UploadImg'

const Option = Select.Option;

class SubmitApply extends PureComponent {
    state = {
        //上传照片
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }
    enterIconLoading = () => {
        this.setState({ iconLoading: true });
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
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

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
                            {getFieldDecorator('title')(
                                <Input style={{width:'400px'}} placeholder='请输入'/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='申请人：'>
                            {getFieldDecorator('titl')(
                                <Input style={{width:'400px'}} placeholder='请输入'/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='申请时间：'>
                            {getFieldDecorator('title')(
                                <DatePicker style={{width:'400px'}} />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='租赁时间：'>
                            {getFieldDecorator('title')(
                                <Input style={{width:'400px'}} placeholder='请输入'/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='意向房间：'>
                            {getFieldDecorator('tile')(
                                <Select style={{width:'400px'}} placeholder='类型'>
                                    <Option value="1">个人</Option>
                                    <Option value="2">企业</Option>
                                </Select>
                            )} 
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='联系电话：'>
                            {getFieldDecorator('title')(
                                <Input style={{width:'400px'}} placeholder='请输入'/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='邮箱：'>
                            {getFieldDecorator('title')(
                                <Input style={{width:'400px'}} placeholder='请输入'/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="上传平面图片：">
                            {getFieldDecorator('icon')(
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
                        </Form.Item>
                        <Form.Item style={{marginLeft:'15%'}}>
                            <Button htmlType="submit" type='primary' loading={this.state.iconLoading} onClick={this.enterIconLoading}>提交</Button>
                            <Button style={{marginLeft:'15px'}}>取消</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }

}
export default Form.create()(SubmitApply)