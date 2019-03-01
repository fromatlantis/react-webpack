/**
 * 租赁申请
 */
import React, { PureComponent } from 'react'
import { Form,Card,Button,List,Input,Select,Pagination,Divider } from 'antd';
import { Link } from 'react-router-dom'
import styles from './LeaseApply.module.css'
import ListClick from '../../components/ListClick/ListClick'

const Option = Select.Option;

class LeaseApply extends PureComponent {
    state={
        id: '',
        buildingName:'',
    }
    //生命周期
    componentDidMount = ()=>{
        this.props.getAllParks();
        this.props.getRentalLists()
    }
    formParms (){
        let parkId = this.state.id
        let buildingName = this.state.buildingName
        let parms = {}
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            parms = fieldsValue
        });
        parms.parkId = parkId
        parms.buildingName = buildingName;
        console.log('parms====>')
        console.log(parms)
        return parms

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((error, values) => {
            if(!error){
                let parms = this.formParms()
                parms.pageNo = 1
                this.props.getRentalLists(parms)
            }
        })
    }
    onShowSizeChange(current,pageSize){
        let parms = this.formParms();
        parms.pageNo = current;
        parms.pageSize= pageSize
        this.props.getRentalLists(parms)
    }
    onChange(pageNo, pageSize) {
        let parms = this.formParms();
        parms.pageNo = pageNo;
        parms.pageSize= pageSize
        this.props.getRentalLists(parms);
    }
    getParkId(num){
        this.setState({  id:num })
        this.props.getBuildingsByPark(num)
    }
    getParkId2(num){
        this.setState({  buildingName:num })
        let parms = this.formParms();
        this.props.getRentalLists(parms);
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.container}>
                {/* <Card bordered={false} style={{ width:'100%' }} bodyStyle={{ padding:'10px 20px', backgroundColor:'#f1f2f6' }}>
                    <span>租赁管理/租赁申请</span>
                </Card> */}
                <div>
                    <div>
                        <ListClick data={this.props.allParks} getId={(id)=>this.getParkId(id)} title='所属园区：'/>
                    </div>
                    <Divider dashed />
                    <div>
                        <ListClick data={this.props.buildingsByPark} getId={(id)=>this.getParkId2(id)} title='所属楼宇：'/>
                    </div>
                    <Divider dashed />
                    <Form layout='inline' onSubmit={this.handleSubmit}>
                        <span style={{fontWeight:'bold',marginRight:20}}>其他选项：</span>
                        <label>面积：</label>
                        {getFieldDecorator('areaBegin')(
                               <Input style={{width:'6%',display:'inline'}} placeholder='不限'/>
                            )
                        }
                        <span> —— </span>
                        {getFieldDecorator('areaEnd')(
                               <Input style={{width:'6%',display:'inline'}} placeholder='不限'/>
                            )
                        }
                        <label style={{marginLeft:25}}>工位：</label>
                        {getFieldDecorator('workerOneBegin')(
                               <Input style={{width:'6%',display:'inline'}} placeholder='不限'/>
                            )
                        }
                        <span> —— </span>
                        {getFieldDecorator('workerOneEnd')(
                               <Input style={{width:'6%',display:'inline'}} placeholder='不限'/>
                            )
                        }
                        <Form.Item label='类型：' style={{marginLeft:'2%'}}>
                        {getFieldDecorator('houseType',{initialValue:''})(
                            <Select getPopupContainer={triggerNode => triggerNode.parentNode} //异常浮动
                                style={{ width: 200 }} placeholder='请选择'>
                                <Option value="0">写字楼</Option>
                                <Option value="1">商铺</Option>
                                <Option value="2">住宅</Option>
                                <Option value="3">厂房</Option>
                                <Option value="4">其他</Option>
                                <Option value='5'>全部</Option>
                            </Select>
                            )
                        }
                        </Form.Item>
                        <Form.Item>
                            <Button  type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                    </Form>
                    <Divider dashed />
                </div>
                <div style={{position:'relative'}}>
                    <List
                        itemLayout="vertical"
                        dataSource={this.props.rentalLists}
                        renderItem={item => (
                            <List.Item
                                extra={<span style={{ fontSize: 30, color: 'red', fontWeight: 'bold' }}>{item.housePrice}元/月</span>}
                            >
                                <Link to={`/leaseApplyDetiles/${item.buildingId}/${item.houseId}`}>
                                    <div className={styles.contentItem}>
                                        <img src={item.realityPhoto.split(',')[0]} width='200px' height='130px' alt=''/>
                                        <div className={styles.imgRight}>
                                            <div>
                                                <div style={{ marginRight: 25,display:'inline',fontWeight:'bold',fontSize:22 }}>{item.buildingName}  {item.buildingNo}座  {item.floorLevel}楼  {item.houseNo}室</div>
                                                <div style={{display:"inline"}}>{item.location}</div>
                                            </div>
                                            <p>租赁面积：{item.rentArea}</p>
                                            <p>朝向：{item.orientation}</p>
                                            <p>类型：{item.typeName}</p>
                                        </div>
                                    </div>
                                </Link>
                            </List.Item>
                        )}
                    />
                    <Pagination
                        style={{position:'absolute',bottom:0,right:0,display:this.props.totalCountRentalLists>6?'block':'none'}}
                        showSizeChanger 
                        showQuickJumper 
                        total={this.props.totalCountRentalLists}
                        // defaultPageSize={2}
                        pageSizeOptions= {['2', '5', '10']}
                        onShowSizeChange= {this.onShowSizeChange.bind(this)}
                        onChange= {this.onChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}
export default Form.create()(LeaseApply)
