/**
 * 租赁申请==>房间详情
 */
import React, { PureComponent } from 'react'
import { Card,Button,Tabs,Carousel,Icon } from 'antd';
import { Link } from 'react-router-dom'
import styles from './LeaseApplyDetiles.module.css'
import avatar from '../../../assets/avatar.png';
import CarouselM from '../../../components/CarouselM/CarouselM'

export default class LeaseApplyDetiles extends PureComponent {
    state = {
        key: 'tab1',
        noTitleKey: '咨询',
    }
    //生命周期
    componentDidMount = ()=>{
        let houseId = this.props.match.params.id
        //获取详情
        this.props.getHouseDetail({houseId:houseId})
    }

    render() {
        const { buildingArea, buildingName, buildingNo, email, floorLevel, houseDescribe,
            houseId, houseNo, housePrice, houseStatus, houseType, leader, orientation, planePhoto,
            pooledArea, realityPhoto, rentArea, telephone} = this.props.houseDetail
        const houseName = `${buildingName} ${buildingNo}座 ${floorLevel}楼 ${houseNo}室`
        const TabPane = Tabs.TabPane;
        const tabListNoTitle = [{
            key: '咨询',
            tab: '咨询',
        }];
        return (
            <div>
                <Card bordered={false} style={{ width:'100%' }} bodyStyle={{ padding:'10px 20px', }}>
                    <Link to={`/leaseApply`}>租赁管理/租赁申请/房间详情</Link>
                </Card>
                <Card bordered={false}
                    title={<h3 style={{display:'inline',marginRight:15}}>{houseName}</h3>}
                >
                    <div style={{display:'flex',flexDirection:'row',fontSize:15,paddingLeft:'20px'}}>
                        <CarouselM CarouselMDetail={ this.props.houseDetail.realityPhoto } />

                        <div style={{width:'27%',paddingLeft:'2%'}}>
                            <div className={styles.imgRight}>
                                <p style={{ fontSize: '40px', color: 'red' }}>{housePrice}元/月</p>
                                <p>租赁面积(㎡)：{rentArea}</p>
                                <p>建筑面积(㎡)：{buildingArea}</p>
                                <p>公摊面积(㎡)：{pooledArea}</p>
                                <p>朝向：{orientation}</p>
                                <p>类型：{houseType}</p>
                                <p>状态：{houseStatus}</p>
                                <Button type='primary' size="large"><Link to={`/submitApply/${houseId}/${houseName}/${housePrice}`}>申请入驻</Link></Button>
                            </div>
                        </div>
                        <Card
                            className={styles.people}
                            tabList={tabListNoTitle}
                            activeTabKey={this.state.noTitleKey}
                            style={{ width:'20%', marginLeft:'5%' }}
                        >
                            <div >
                                <img src={avatar} width='80px' height='80px' alt=''/>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginLeft: 4 }}>
                                    <p>联系人：{leader}</p>
                                    <p>电话：{telephone}</p>
                                    <p>邮箱：{email}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Card>
                <Card bordered={false}>
                    <Tabs type='card'>
                        <TabPane tab='房源详情' key='1'>
                            <div style={{ paddingLeft: '6%', paddingRight: '16%' }}>
                                <div style={{width:'80%'}}>
                                    <div style={{ width:'100%', display:'flex',flexDirection:'row'}} >
                                        <div style={{width:'30%', display:'flex',flexDirection:'column'}}>
                                            <span style={{fontWeight:'bold'}}>租赁面积(㎡)：{rentArea}</span>
                                            <span style={{fontWeight:'bold'}}>业主姓名：{leader}</span>
                                            <span style={{fontWeight:'bold'}}>类型：{houseType}</span>
                                        </div>
                                        <div style={{width:'30%', display:'flex',flexDirection:'column'}}>
                                            <span style={{fontWeight:'bold',marginLeft:'15%'}}>公摊面积(㎡)：{pooledArea}</span>
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
                                        <span style={{width:'10%',fontWeight:'bold'}}>房源描述：</span>
                                        <p>{houseDescribe}</p>
                                    </div>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    { realityPhoto && realityPhoto.map((item, i) => {
                                            return <img key={i} src={item} width='450px' height='380px' style={{ marginBottom: '11px', float: 'left', width: '48%', marginLeft: '6px' }} alt=''/>
                                    }) }
                                    <img key='-1' src={planePhoto} width='450px' height='380px' style={{ marginBottom: '11px', float: 'left', width: '48%', marginLeft: '6px' }} alt=''/>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>

            </div>
        )
    }
}
