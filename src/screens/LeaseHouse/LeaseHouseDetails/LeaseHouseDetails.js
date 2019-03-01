/**
 * 租赁管理=>租赁房源=》房间详情
 */
import React,{Component} from 'react';
import { Form,Card,Button,Table,Input,Modal,Tabs,Select,Carousel } from 'antd';
import avatar from '../../../assets/avatar.png';
import { Link } from 'react-router-dom'
// import styles from '../index.module.css'

const Option = Select.Option;

class LeaseHouseDetails extends Component{
    state = { 
        visible: false,
        visibleP: false,
    };
    //生命周期
    componentDidMount = () => {
        let buildingId = this.props.match.params.id
        let houseId = this.props.match.params.id2
        this.setState({  houseId: houseId, });
        //获取详情
        this.props.getHouseDetail({buildingId:buildingId, houseId:houseId, photoWidth:'100', photoHeight:'100'})
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
    // 图片弹出方法
    showModal = () => {
        this.setState({  visible: true, });
    }
    handleCancel = (e) => {
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
        const{address, buildingArea, buildingName, buildingNo, email, floorLevel, houseDescribe,
            houseId, houseNo, housePrice, houseStatus, houseType, leader, orientation, planePhoto,
            pooledArea, realityPhoto, realityPhotoBig, realityPhotoSmall, rentArea, telephone} = this.props.houseDetail

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
          }];
    
        return(
            <div>
                <Card style={{ width:'100%' }} bodyStyle={{ padding:'10px 20px' }}>
                    <Link to={{ pathname: "/leaseHouse"}}>租赁管理/租赁房源/房间详情</Link>
                </Card>
                <Card
                    title={
                        <div>
                            <h2 style={{display:'inline',marginRight:15}}>{buildingName}  {buildingNo}座  {floorLevel}楼  {houseNo}室</h2>
                            <span style={{ marginLeft:'20px' }}>{address}</span>
                        </div>
                    }
                >
                    <div style={{display:'flex',flexDirection:'row',fontSize:15,paddingLeft:'20px'}}>
                        <div style={{width:'65%'}}>
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
                        </div>
                        <div style={{  display:'flex',flexDirection:'row'}}>
                            <div>
                                <span style={{fontWeight:'bold'}}>平面图片：</span>
                                <img src={planePhoto} width='100px' height='100px' alt=''
                                    style={{ borderWidth: '2px', borderColor:'#ccc', borderStyle: 'dashed',padding:'2px'}}
                                    onClick={this.showModalP}/>
                            </div>
                            <div style={{ marginLeft:'5%' }}>
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
                        <TabPane tab='租客记录' key='1' style={{paddingLeft:'30px'}}>
                            <Form layout="inline" onSubmit={this.handleSubmit} >
                                <Form.Item >
                                    {getFieldDecorator('customerName')(
                                        <Input style={{width:'300px'}} placeholder='客户名称'/>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('enterStatus')(
                                        <Select style={{width:'300px'}} placeholder='入驻状态'>
                                            <Option value="0">未入驻</Option>
                                            <Option value="1">入驻中</Option>
                                            <Option value="2">已撤离</Option>
                                            <Option value="3">全部</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item style={{marginLeft:'15%'}}>
                                    <Button htmlType="submit" type='primary' icon="search" >查询</Button>
                                    <Button style={{marginLeft:'15px'}} onClick={this.resetTable}>重置</Button>
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
                    title="平面图片"
                    visible={this.state.visibleP}
                    onOk={this.handleCancelP}
                    onCancel={this.handleCancelP}
                    footer={null}
                >
                    <Carousel autoplay>
                        <img key='1' src={planePhoto} height='400px' alt=''/>
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
export default Form.create()(LeaseHouseDetails)