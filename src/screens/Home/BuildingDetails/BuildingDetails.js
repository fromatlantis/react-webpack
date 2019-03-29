/**
 * 楼宇详情
 */
import React,{Component} from 'react';
import { Form,Card,Button,Table,Input,Modal,Select,Carousel } from 'antd';
import { Link } from 'react-router-dom'

const Option = Select.Option;

class BuildingDetails extends Component{
    state = { 
        visible: false
    };
    //生命周期
    componentDidMount = () => {
        let Id = this.props.match.params.id
        //获取详情
        this.props.getBuildingDetail(Id)
        //获取所在楼的所有房间列表 
        this.props.getAllHouseList({ buildingId:Id })
    }
    //实景图片浏览全部
    showModal = () => {
        this.setState({  visible: true, });
    }   
    handleOk = (e) => {
        this.setState({  visible: false, });
    } 
    handleCancel = (e) => {
        this.setState({  visible: false, });
    }
    //列表分页方法
    onShowSizeChange(current, pageSize) {
        this.props.getAllHouseList({ pageNo: 1, pageSize: pageSize });
    }
    onChange(pageNo, pageSize) {
        this.props.getAllHouseList({ pageNo: pageNo, pageSize: pageSize });
    }

    render(){
        const{buildingArea, buildingIntro, buildingName, buildingNo, realityPhoto, floor, location, rentArea, trafficState, useArea} = this.props.buildingDetail
        const columns = [
              {
            title: '房间号',
            dataIndex: 'houseNo',
            key: 'houseNo',
            align: 'center',
          },{
            title: '楼层数',
            dataIndex: 'floorLevel',
            key: 'floorLevel',
            align: 'center',
          },{
            title: '建筑面积(㎡)',
            dataIndex: 'buildingArea',
            key: 'buildingArea',
            align: 'center',
          },{
            title: '租赁面积(㎡)',
            dataIndex: 'rentArea',
            key: 'rentArea',
            align: 'center',
          },{
            title: '房间价格(元/月)',
            dataIndex: 'housePrice',
            key: 'housePrice',
            align: 'center',
          },{
            title: '负责人',
            dataIndex: 'leader',
            key: 'leader',
            align: 'center',
          },{
            title: '联系方式',
            dataIndex: 'telephone',
            key: 'telephone',
            align: 'center',
          },{
            title: '类型',
            dataIndex: 'houseType',
            key: 'houseType',
            align: 'center',
          },{
            title: '租赁状态',
            dataIndex: 'houseStatus',
            key: 'houseStatus',
            align: 'center',
          },
        ];
    
        return(
            <div>
                <Card style={{ width:'100%' }} bodyStyle={{ padding:'10px 20px' }}>
                    <Link to={{ pathname: "/home"}} onClick={this.props.storeTabActive('building')}>房源管理/楼宇管理/楼宇详情</Link>
                </Card>
                <Card
                    title={
                        <div>
                            <h2 style={{display:'inline',marginRight:15}}>{buildingName}  {buildingNo}座</h2>
                            <span style={{marginLeft:'20px'}}>{location}</span>
                        </div>
                    }
                >
                    <div style={{display:'flex',flexDirection:'row',fontSize:15,paddingLeft:'20px'}}>
                        <div style={{width:'80%'}}>
                            <p>
                                <span style={{fontWeight:'bold'}}>楼层数：{floor}</span>
                                <span style={{fontWeight:'bold',marginLeft:'15%'}}>建筑面积(㎡)：{buildingArea}</span>
                                <span style={{fontWeight:'bold',marginLeft:'15%'}}>使用面积(㎡)：{useArea}</span>
                                <span style={{fontWeight:'bold',marginLeft:'15%'}}>租赁面积(㎡)：{rentArea}</span>
                            </p>
                            <div style={{marginTop:20,lineHeight:2.7,display:'flex',flexDirection:'row'}}>
                                <span style={{ width:'100px', fontWeight:'bold'}}>房源说明：</span>
                                <p>{buildingIntro}</p>
                            </div>
                            <div style={{marginTop:20,lineHeight:2.7,display:'flex',flexDirection:'row'}}>
                                <span style={{ width:'100px', fontWeight:'bold'}}>交通说明：</span>
                                <span>{trafficState}</span>
                            </div>
                        </div>
                        <div style={{ paddingLeft:'5%', width:'12%'}}>
                            <span style={{fontWeight:'bold'}}>实景图片：</span>
                            <img src={(realityPhoto || "").split(',')[0]} width='100px' height='100px' alt=''
                                style={{ borderWidth: '2px', borderColor:'#ccc', borderStyle: 'dashed',padding:'2px'}}
                                onClick={this.showModal}/>
                        </div>
                    </div>
                </Card>
                <Card >
                    <SearchInput search1={this.props.getAllHouseList} />
                    <Table
                        style={{marginTop:'15px'}}
                        dataSource={this.props.allHouseList}
                        columns={columns} 
                        rowKey={(record, index) => `complete${record.id}${index}`}
                        pagination={{
                            current: this.props.searchParamsAllHouse.pageNo,
                            showSizeChanger: true,
                            pageSizeOptions: ['2', '5', '10'],
                            total: this.props.totalCountAllHouse,
                            onShowSizeChange: this.onShowSizeChange.bind(this),
                            onChange: this.onChange.bind(this)
                        }}
                    />
                </Card>
                <Modal
                    title="所有实景图片"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Carousel autoplay>
                        { realityPhoto && realityPhoto.split(',').map((item,i) => {
                            return <img key={i} src={item} height='400px' alt=''/>
                        }) }
                    </Carousel>
            </Modal>
            </div>
        )
    }
}

export default Form.create()(BuildingDetails)

class Search extends React.Component {
    state = {
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
            this.queryRepairs(values)
        });
    }
    queryRepairs = (data) => {
        this.props.search1(data)
    }
    resetTable = () => {
        this.props.search1({ 
            pageNo: 1,
            houseNo: '',
            houseType: '',
            houseStatus: '',
        })
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
            <Form onSubmit={this.handleSubmit} layout="inline">
                <Form.Item {...formItemLayout}>
                    {getFieldDecorator('houseNo')(
                        <Input style={{width:'300px'}} placeholder='房间号'/>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout}>
                    {getFieldDecorator('houseType')(
                        <Select style={{width:'300px'}} placeholder='类型'>
                            <Option value="0">写字楼</Option>
                            <Option value="1">商铺</Option>
                            <Option value="2">住宅</Option>
                            <Option value="3">厂房</Option>
                            <Option value="4">其他</Option>
                            <Option value="5">全部</Option>
                        </Select>
                    )} 
                </Form.Item>
                <Form.Item {...formItemLayout}>
                    {getFieldDecorator('houseStatus')(
                        <Select style={{width:'300px'}} placeholder='状态'>
                            <Option value="0">待租</Option>
                            <Option value="1">已租</Option>
                            <Option value="2">自用</Option>
                            <Option value="3">其他</Option>
                            <Option value="4">全部</Option>
                        </Select>
                    )} 
                </Form.Item>
                <Form.Item /* style={{marginLeft:'20%'}} */>
                    <Button htmlType="submit" type='primary' icon="search" loading={this.state.iconLoading} >查询</Button>
                    <Button style={{marginLeft:'15px'}} onClick={this.resetTable}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
const SearchInput = Form.create()(Search)
