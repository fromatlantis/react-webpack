/**
 * 房源详情
 */
import React,{Component} from 'react';
import { Form,Card,Button,Table,Input,Modal,Tabs,Select,DatePicker,Carousel  } from 'antd';
import avatar from '../../../assets/avatar.png';
import { Link } from 'react-router-dom'
import styles from '../index.module.css'
import { black } from 'ansi-colors';

const {  RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;

class HouseDetails extends Component{
    state = { 
        visible: false,
        visibleP: false,
        addVisible: false,
        updateVisible: false,
        houseId:'',
    };
    //生命周期
    componentDidMount = () => {
        let buildingId = this.props.match.params.id
        let houseId = this.props.match.params.id2
        this.setState({  houseId: houseId, });
        //获取详情
        this.props.getHouseDetail({ houseId:houseId})
        //租赁管理-租赁房源(详情)-租客记录List
        this.props.getRenterRecordList({ houseId:houseId })
    }
    // 平面图片弹出方法
    showModalP = () => {
        this.setState({  visibleP: true, });
    }
    handleCancelP = () => {
        this.setState({  visibleP: false, });
    }
    // 实景图片弹出方法
    showModal = () => {
        this.setState({  visible: true, });
    }
    handleCancel = () => {
        this.setState({  visible: false, });
    }
    //列表分页方法
    onShowSizeChange(current, pageSize) {
        this.props.getRenterRecordList({ pageNo: 1, pageSize: pageSize });
    }
    onChange(pageNo, pageSize) {
        this.props.getRenterRecordList({ pageNo: pageNo, pageSize: pageSize });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            const values = { 
                ...fieldsValue,
                pageNo: 1,
            }
            console.log(values)
            this.props.getRenterRecordList(values)
        });
    }
    resetTable = () => {
        this.props.getRenterRecordList({
            pageNo: 1,
            customerName: '',
            enterStatus: '',
        })
    }

    render(){
        const{address,houseName, buildingArea, buildingName, buildingNo, email, floorLevel, houseDescribe,
            houseId, houseNo, housePrice, houseStatus, houseType, leader, orientation, planePhoto,
            pooledArea, realityPhoto, realityPhotoBig, realityPhotoSmall, rentArea, telephone} = this.props.houseDetail

        console.log(this.state.houseId)

        const TabPane = Tabs.TabPane;
        const { getFieldDecorator } = this.props.form;
          
        const columns = [
            {
            title:'序号',
            dataIndex:'num',
            key:'num',
            align:'center',
            render: (text, record, index) => <span>{index + 1}</span>
          },{
            title: '客户名称',
            dataIndex: 'customerName',
            align:'center',
            key: 'customerName',
          }, {
            title: '入住状态',
            dataIndex: 'enterStatus',
            key: 'enterStatus',
            align:'center'
          }, {
            title: '房间价格(元/月)',
            dataIndex: 'rentPrice',
            key: 'rentPrice',
            align:'center'
          },{
              title:'租赁时间',
              dataIndex:'rentPeriod',
              key:'rentPeriod',
              align:'center'
          },{
              title:'联系人',
              dataIndex:'applyUserName',
              key:'applyUserName',
              align:'center'
          },{
              title:'联系方式',
              dataIndex:'phonenums',
              key:'phonenums',
              align:'center'
          },{
              title:'邮箱',
              dataIndex:'emails',
              key:'emails',
              align:'center'
          },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <span>
                  <UpdateTenantButton updateRenterInfo={this.props.updateRenterInfo} applyId={record.applyId} applyUserName={record.applyUserName} phonenums={record.phonenums} emails={record.emails} />
                </span>
              ),
          }];
    
        return(
            <div>
                <Card style={{ width:'100%' }} bodyStyle={{ padding:'10px 20px' }}>
                    <Link to={{ pathname: "/home"}} onClick={this.props.storeTabActive('house')}>房源管理/房源管理/房间详情</Link>
                </Card>
                <Card
                    title={
                        <div>
                            <h2 style={{display:'inline',marginRight:15}}>{houseName}  {buildingNo}座  {floorLevel}楼  {houseNo}室</h2>
                            <span style={{ marginLeft:'20px' }}>{address}</span>
                        </div>
                    }
                >
                    <div style={{display:'flex',flexDirection:'row',fontSize:15,paddingLeft:'20px'}}>
                        <div style={{width:'80%'}}>
                            <div style={{ width:'100%', display:'flex',flexDirection:'row'}} >
                                <div style={{width:'30%', display:'flex',flexDirection:'column'}}>
                                    <span style={{fontWeight:'bold'}}>租赁面积(㎡):{rentArea}</span>
                                    <span style={{fontWeight:'bold'}}>负责人：{leader}</span>
                                    <span style={{fontWeight:'bold'}}>类型：{houseType}</span>
                                </div>
                                <div style={{width:'30%', display:'flex',flexDirection:'column'}}>
                                    <span style={{fontWeight:'bold',marginLeft:'15%'}}>公摊面积(㎡):{pooledArea}</span>
                                    <span style={{fontWeight:'bold',marginLeft:'15%'}}>联系方式：{telephone}</span>
                                    <span style={{fontWeight:'bold',marginLeft:'15%'}}>朝向：{orientation}</span>
                                    
                                </div>
                                <div style={{ width:'30%', display:'flex',flexDirection:'column'}}>
                                    <span style={{fontWeight:'bold',marginLeft:'15%'}}>建筑面积(㎡)：{buildingArea}</span>
                                    <span style={{fontWeight:'bold',marginLeft:'15%'}}>房间价格(元/月)：{housePrice}</span>
                                    <span style={{fontWeight:'bold',marginLeft:'15%'}}>状态：{houseStatus}</span>
                                </div>
                            </div>
                            <div style={{marginTop:30,lineHeight:2.7,display:'flex',flexDirection:'row'}}>
                                <span style={{width:'10%',fontWeight:'bold'}}>房源说明：</span>
                                <p>{houseDescribe}</p>
                            </div>
                        </div>
                        <div style={{ paddingLeft:'5%'}}>
                            <div>
                                <span style={{fontWeight:'bold'}}>平面图片：</span>
                                <img src={(planePhoto || "")[0]} width='100px' height='100px' alt=''
                                    style={{ borderWidth: '2px', borderColor:'#ccc', borderStyle: 'dashed',padding:'2px'}}
                                    onClick={this.showModalP}/>
                            </div>
                            <div>
                                <span style={{fontWeight:'bold'}}>实景图片：</span>
                                <img src={(realityPhoto || "")[0]} width='100px' height='100px' alt=''
                                    style={{ borderWidth: '2px', borderColor:'#ccc', borderStyle: 'dashed',padding:'2px'}}
                                    onClick={this.showModal}/>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <Tabs type='card'>
                        <TabPane tab='租客管理' key='1' style={{paddingLeft:'30px'}}>
                            <Form layout="inline" onSubmit={this.handleSubmit} >
                                <Form.Item >
                                    {getFieldDecorator('customerName')(
                                        <Input style={{width:'300px'}} placeholder='客户名称'/>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('leaseStatus')(
                                        <Select style={{width:'300px'}} placeholder='入驻状态'>
                                            <Option value="0">未入驻</Option>
                                            <Option value="1">入驻中</Option>
                                            <Option value="2">已撤离</Option>
                                            <Option value="3">全部</Option>
                                        </Select>
                                    )} 
                                </Form.Item>
                                <Form.Item style={{marginLeft:'40%', }}>
                                    <div style={{  display:'flex',flexDirection:'row', }}>
                                        {/* <AddTenantButton typeStr={houseStatus==='待租' ? false:true} addRenters={this.props.addRenter} houseId={this.state.houseId} 
                                        buildingName={buildingName} buildingNo={buildingNo} houseNo={houseNo} floorLevel={floorLevel}/> */}
                                        <Button htmlType="submit" type='primary' icon="search" style={{marginLeft:'15px'}}>查询</Button>
                                        <Button style={{marginLeft:'15px'}} onClick={this.resetTable}>重置</Button>
                                    </div>
                                </Form.Item>
                            </Form>
                            <Table
                                style={{marginTop:'15px'}}
                                dataSource={this.props.renterRecordList}
                                columns={columns} 
                                rowKey={(record, index) => `complete${record.id}${index}`}
                                pagination={{
                                    current: this.props.searchParamsrenterRecord.pageNo,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['2', '5', '10'],
                                    total: this.props.totalCountrenterRecord,
                                    onShowSizeChange: this.onShowSizeChange.bind(this),
                                    onChange: this.onChange.bind(this)
                                }}
                            />
                        </TabPane>
                    </Tabs>
                </Card>
                <Modal
                    title="全部平面图片"
                    visible={this.state.visibleP}
                    onOk={this.handleCancelP}
                    onCancel={this.handleCancelP}
                    footer={null}
                >
                    <Carousel autoplay>
                        {/* <img key='1' src={planePhoto} height='400px' alt=''/> */}
                        { planePhoto && planePhoto.map((item,i) => {
                            return <img key={i} src={item} height='400px' alt=''/>
                        }) }
                    </Carousel>
                </Modal>
                <Modal
                    title="全部实景图片"
                    visible={this.state.visible}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Carousel autoplay>
                        { realityPhoto && realityPhoto.map((item,i) => {
                            return <img key={i} src={item} height='400px' alt=''/>
                        }) }
                    </Carousel>
                </Modal>
                
            </div>
        )
    }
}
export default Form.create()(HouseDetails)

//修改租客信息
class UpdateTenant extends React.Component {
    state = { 
        updateVisible: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            const values = { 
                ...fieldsValue,
                applyId: this.props.applyId,
            }
            console.log(values)
            this.props.updateRenterInfo(values)
            this.setState({  updateVisible: false, });
        });
    }
    queryRepairs = (data) => {
        this.props.search2(data)
    }
    
    // 修改弹出表单方法
    updateShowModal = () => {
        this.setState({  updateVisible: true, });
    }

    updateHandleOk = (e) => {
        this.setState({  updateVisible: false, });
    }

    updateHandleCancel = (e) => {
        this.setState({  updateVisible: false, });
    }

  
    render() {
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
        return (
            <div>
                <Link to={{ }} onClick={this.updateShowModal}>修改</Link>
                <Modal
                    title="租客信息修改"
                    visible={this.state.updateVisible}
                    onOk={this.handleSubmit}
                    onCancel={this.updateHandleCancel}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label='联系人：'>
                            {getFieldDecorator('applyUserName',{
                                rules: [{  required: true, message: '请输入联系人', }],
                            })(
                                <Input placeholder='请输入'/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='联系方式：'>
                            {getFieldDecorator('phonenums',{
                                rules: [{  required: true, message: '请输入联系方式', }],
                            })(
                                <Input placeholder='请输入'/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label='邮箱'>
                            {getFieldDecorator('emails',{
                                rules: [{  required: true, message: '请输入邮箱', }],
                            })(
                                <Input placeholder='请输入'/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
const UpdateTenantButton = Form.create({
    mapPropsToFields(props) {
        return {
            applyUserName: Form.createFormField({  value: props.applyUserName,  }),
            phonenums: Form.createFormField({  value: props.phonenums,  }),
            emails: Form.createFormField({  value: props.emails,  }),
        };
    }
})(UpdateTenant)

//新增租客信息
class AddTenant extends React.Component {
    state = {
        addVisible: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
    }
    
    // 新增弹出表单方法
    addShowModal = () => {
        this.setState({  addVisible: true, });
    }

    addHandleOk = (e) => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            const rangeValue = fieldsValue['date'];
            let rangeValueTrue =''
            if( rangeValue && rangeValue.length>0){
                rangeValueTrue = [rangeValue[0].format('YYYY-MM-DD HH:mm:ss'), rangeValue[1].format('YYYY-MM-DD HH:mm:ss')].join(',')
            }
            const values = { 
                ...fieldsValue,
                houseId: this.props.houseId,
                buildingName: this.props.buildingName,
                buildingNo: this.props.buildingNo,
                houseNo: this.props.houseNo,
                floorLevel: this.props.floorLevel,
                date: rangeValueTrue,
            }
            console.log(values)
            this.queryRepairs(values)
        });
        // this.setState({  addVisible: false, });
    }
    queryRepairs = (data) => {
        this.props.addRenters(data)
    }

    addHandleCancel = (e) => {
        this.setState({  addVisible: false, });
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
        return (
            <div>
                <Button type='primary' onClick={this.addShowModal} disabled={this.props.typeStr}>新增</Button>
                <Modal
                    title={<span className={styles.drawerTitleStyles}>新增租客信息</span>}
                    visible={this.state.addVisible}
                    onOk={this.addHandleOk}
                    onCancel={this.addHandleCancel}
                    maskClosable='true'
                    okText='保存'
                >
                    <Form onSubmit={this.handleSubmit} style={{marginRight:'40px'}}>
                        <FormItem {...formItemLayout} label="客户名称：" >
                            {getFieldDecorator('customerName', {
                                rules: [{ required: true, message: '请输入客户名称', }],
                            })(
                                <Input className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="房间价格：" >
                            {getFieldDecorator('rentPrice', {
                                rules: [{ required: true, message: '请输入房间价格', }],
                            })(
                                <Input className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="租赁时间：" >
                            {getFieldDecorator('date', {
                                rules: [{ required: true, message: '请输入租赁时间', }],
                            })(
                                <RangePicker  className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="联系人：" >
                            {getFieldDecorator('contact', {
                                rules: [{ required: true, message: '请输入联系人', }],
                            })(
                                <Input className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="联系方式：" >
                            {getFieldDecorator('telephone', {
                                rules: [{ required: true, message: '请输入联系方式', }],
                            })(
                                <Input className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="邮箱：" >
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: '请输入邮箱', }],
                            })(
                                <Input className={styles.inputStyle} />
                            )} 
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
const AddTenantButton = Form.create()(AddTenant)

