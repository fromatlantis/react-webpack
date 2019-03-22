/**
 * 房源管理界面
 */
import React, { PureComponent } from 'react'
import { Card, Input, Button, Table, Form, Drawer, Modal, Select, Divider } from 'antd'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import AddBuilding from './AddBuilding/Connect'
import UpdateBuilding from './UpdateBuilding/Connect'
import PropTypes from "prop-types";

const FormItem = Form.Item;
const Option = Select.Option;

class Home extends PureComponent {
    state = {
        //帮助选项卡切换的状态值
        key: 'building',
        //帮助抽屉拉出收回的状态值
        visible: false, 
        childrenDrawer: false,
        //“更多”抽屉中输入框是否可改动
        disabledStr: true,
    }
    
    //生命周期
    componentDidMount = () => {
        //获取园区项目详情
        this.props.getProjectDetail()
        this.props.buildingInfoList()
        this.props.getHouseList()
        // console.log(this.props.user.park_name)
    }
    //选项卡切换的方法
    onTabChange = (key) => {
        console.log(key);
        this.setState({ key: key });
    }
    //“更多”拉开抽屉的方法
    showDrawer = () => {
        this.setState({  visible: true, });
    };
    onClose = () => {
        this.setState({  visible: false, disabledStr: true, });
    };
    //“更多”拉开抽屉中输入框变为可改动
    changeInputStr = () => {
        this.setState({  disabledStr: false, });
    }
    //楼宇管理列表分页方法
    onShowSizeChange(current, pageSize) {
        this.props.buildingInfoList({ pageNo: 1, pageSize: pageSize });
    }
    onChange(pageNo, pageSize) {
        this.props.buildingInfoList({ pageNo: pageNo, pageSize: pageSize });
    }
    //房源管理列表分页方法
    onShowSizeChangeHouse(current, pageSize) {
        this.props.getHouseList({ pageNo: 1, pageSize: pageSize });
    }
    onChangeHouse(pageNo, pageSize) {
        this.props.getHouseList({ pageNo: pageNo, pageSize: pageSize });
    }
    handleSubmit = (e) => {
        e.preventDefault();
    }
    //园区项目信息修改
    updateProjectInfo = () => {
        this.props.form.validateFields((error, values) => {
            if (error) {
                return
            }
            console.log(values)
            this.props.updateProjectInfo(values)
        })
    }
    //数值校验
    checkPrice = (rule, value, callback) => {
        if ( value==='' ||  value > 0) {
          callback();
          return;
        }
        callback('请输入正确的值！');
    }

    render() {

        //园区项目详情信息属性
        const { projectAddress, projectName,} = this.props.projectDetail

        //抽屉中表单。
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
        };

        //楼宇管理列表的表头信息
        const columns1 = [
            {
            title: '楼栋名称',
            dataIndex: 'buildingName',
            key: 'buildingName',
            align: 'center',
          },{
            title: '楼栋编号',
            dataIndex: 'buildingNo',
            key: 'buildingNo',
            align: 'center',
          },{
            title: '楼层数',
            dataIndex: 'floor',
            key: 'floor',
            align: 'center',
          },{
            title: '建筑面积(㎡)',
            dataIndex: 'buildingArea',
            key: 'buildingArea',
            align: 'center',
          },{
            title: '使用面积(㎡)',
            dataIndex: 'useArea',
            key: 'useArea',
            align: 'center',
          },{
            title: '租赁面积(㎡)',
            dataIndex: 'rentArea',
            key: 'rentArea',
            align: 'center',
          },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                  <span style={{ display:'flex',flexDirection:'row', justifyContent: 'center', }}>
                    <Link to={{ pathname: `/buildingDetails/${record.buildingId}`}}>详情</Link>
                    <Divider type="vertical" style={{ marginTop:'5px' }}/>
                    <UpdateBuilding fatherName={record.buildingId}/>
                </span>
              ),
          }];

        //房源管理列表的表头信息
        const columns2 = [
            {
            title: '楼栋名称',
            dataIndex: 'buildingName',
            key: 'buildingName',
            align: 'center',
          },{
            title: '楼栋编号',
            dataIndex: 'buildingNo',
            key: 'buildingNo',
            align: 'center',
          },{
            title: '房间号',
            dataIndex: 'houseNo',
            key: 'houseNo',
            align: 'center',
          },{
            title: '楼层',
            dataIndex: 'floorLevel',
            key: 'floorLevel',
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
            title: '状态',
            dataIndex: 'houseStatus',
            key: 'houseStatus',
            align: 'center',
          },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <span>
                    <Link to={{ pathname: `/houseDetails/${record.buildingId}/${record.houseId}`}}>详情</Link>
                    <Divider type="vertical" />
                    <Link to={{ pathname:`/updateHouse/${record.houseId}` }}>修改</Link>
                </span>
              ),
          }];

        const tabListNoTitle = [{
            key: 'building',
            tab: '楼宇管理',
          }, {
            key: 'house',
            tab: '房源管理',
          }];
        const contentListNoTitle = {
            building: <div>
                        <div className={styles.searchDivStyle}>
                            <SearchInput search1={this.props.buildingInfoList} /> 
                        </div>
                        <Table 
                            dataSource={this.props.buildingInfoListList} 
                            columns={columns1}
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            pagination={{
                                current: this.props.searchParams.pageNo,
                                showSizeChanger: true,
                                pageSizeOptions: ['2', '5', '10'],
                                total: this.props.totalCount,
                                onShowSizeChange: this.onShowSizeChange.bind(this),
                                onChange: this.onChange.bind(this)
                            }}
                        />
                    </div>,
            house: <div>
                        <div>
                            <SearchInput2 search2={this.props.getHouseList} /> 
                        </div>
                        <Table style={{ marginTop:'15px' }}
                            dataSource={this.props.houseList} 
                            columns={columns2}
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            pagination={{
                                current: this.props.searchParamsHouse.pageNo,
                                showSizeChanger: true,
                                pageSizeOptions: ['2', '5', '10'],
                                total: this.props.totalCountHouse,
                                onShowSizeChange: this.onShowSizeChangeHouse.bind(this),
                                onChange: this.onChangeHouse.bind(this)
                            }}
                        />
                </div>,
        };
        
        return (
            <div>
                <Card bordered={false}
                    title={
                        <div className={ styles.titleDivStyle }>
                            <span className={styles.titleStyle}>{projectName}</span>
                            <span className={styles.addressStrle}>{projectAddress}</span>
                            <a onClick={this.showDrawer}>更多</a>
                        </div>
                    }
                    style={{ width: '100%' }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.key}
                    onTabChange={(key) => { this.onTabChange(key); }}
                >
                    {contentListNoTitle[this.state.key]}
                </Card>
                {/* 第一个抽屉 */}
                <Drawer
                    title={<span className={styles.drawerTitleStyles}>项目信息</span>}
                    width={480}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form onSubmit={this.handleSubmit} style={{marginRight:'40px'}}>
                        <FormItem {...formItemLayout} label="项目名称：" >
                            {getFieldDecorator('projectName'/* ,{initialValue: this.props.user.park_name } */)(
                                <Input disabled className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="项目地址：" >
                            {getFieldDecorator('projectAddress')(
                                <Input disabled className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="运营公司：" >
                            {getFieldDecorator('runCompany', {
                                rules: [{  required: true, message: '请输入运营公司', }],
                            })(
                                <Input disabled={this.state.disabledStr} className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="物业公司：" >
                            {getFieldDecorator('estateCompany', {
                                rules: [{  required: true, message: '请输入物业公司', }],
                            })(
                                <Input disabled={this.state.disabledStr} className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="建筑面积(㎡)：" >
                            {getFieldDecorator('buildingArea', {
                                rules: [{  required: true, message: '请输入建筑面积', },{ validator: this.checkPrice }],
                            })(
                                <Input disabled={this.state.disabledStr} className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="使用面积(㎡)：" >
                            {getFieldDecorator('useArea', {
                                rules: [{  required: true, message: '请输入使用面积', },{ validator: this.checkPrice }],
                            })(
                                <Input disabled={this.state.disabledStr} className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="租赁面积(㎡)：" >
                            {getFieldDecorator('rentArea', {
                                rules: [{  required: true, message: '请输入租赁面积', },{ validator: this.checkPrice }],
                            })(
                                <Input disabled={this.state.disabledStr} className={styles.inputStyle} />
                            )} 
                        </FormItem>
                        <FormItem {...formItemLayout} label="楼栋数量：" >
                            {getFieldDecorator('buildingCount', {
                                rules: [{  required: true, message: '请输入楼栋数量', },{ validator: this.checkPrice }],
                            })(
                                <Input disabled={this.state.disabledStr} className={styles.inputStyle} />
                            )} 
                        </FormItem>
                    </Form>
                    <div className={styles.oneDrawerDiv}>
                        <Button type="primary" onClick={this.changeInputStr}>编辑</Button>
                        <Button type="primary" style={{ marginLeft: 12, }} onClick={this.updateProjectInfo} >提交</Button>
                        <Button style={{ marginLeft: 12, }} onClick={this.onClose}>返回</Button>
                    </div>
                </Drawer>
                
            </div>
        )
    }
}
export default Form.create({
    mapPropsToFields(props) {
        return {
            projectName: Form.createFormField({  value: props.projectDetail.projectName,  }),
            projectAddress: Form.createFormField({  value: props.projectDetail.projectAddress,  }),
            runCompany: Form.createFormField({  value: props.projectDetail.runCompany,  }),
            estateCompany: Form.createFormField({  value: props.projectDetail.estateCompany,  }),
            buildingArea: Form.createFormField({  value: props.projectDetail.buildingArea,  }),
            useArea: Form.createFormField({  value: props.projectDetail.useArea,  }),
            rentArea: Form.createFormField({  value: props.projectDetail.rentArea,  }),
            buildingCount: Form.createFormField({  value: props.projectDetail.buildingCount,  }),
        };
    }
})(Home)

//楼宇管理搜索
class Search1 extends React.Component {

    handleSubmit1 = (e) => {
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
            buildingName: '',
            buildingNo: '',
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
            <div>
                <Form onSubmit={this.handleSubmit1} layout="inline">
                    <FormItem {...formItemLayout} label="" >
                        {getFieldDecorator('buildingName')(
                            <Input className={styles.inputStyle} placeholder="楼栋名称" />
                        )} 
                    </FormItem>
                    <FormItem {...formItemLayout} label="" >
                        {getFieldDecorator('buildingNo')(
                            <Input className={styles.inputStyle} placeholder="楼栋编号" />
                        )} 
                    </FormItem>
                    <FormItem>
                        <div style={{ display:'flex',flexDirection:'row', }}>
                            <Button htmlType="submit" type='primary' icon="search">查询</Button>
                            {/* “添加”弹出de表单 */}
                            <AddBuilding />
                            <Button className={styles.btnStyle} onClick={this.resetTable}>重置</Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const SearchInput = Form.create()(Search1)

//房源管理搜索
class Search2 extends React.Component {

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
        this.props.search2(data)
    }
    resetTable = () => {
        this.props.search2({ 
            pageNo: 1,
            buildingName: '',
            buildingNo: '',
            houseStatus: '',
            houseType: '',
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
                <FormItem {...formItemLayout} label="" >
                    {getFieldDecorator('buildingName')(
                        <Input className={styles.inputStyle} placeholder="楼栋名称" />
                    )} 
                </FormItem>
                <FormItem {...formItemLayout} label="" >
                    {getFieldDecorator('buildingNo')(
                        <Input className={styles.inputStyle} placeholder="楼栋编号" />
                    )} 
                </FormItem>
                <FormItem {...formItemLayout} label="" >
                    {getFieldDecorator('houseStatus')(
                        <Select style={{ width:'250px' }} placeholder="状态">
                            <Option value="0">待租</Option>
                            <Option value="1">已租</Option>
                            <Option value="2">自用</Option>
                            <Option value="3">其他</Option>
                            <Option value="4">全部</Option>
                        </Select>
                    )} 
                </FormItem>
                <FormItem {...formItemLayout} label="" >
                    {getFieldDecorator('houseType')(
                        <Select style={{ width:'250px' }} placeholder="类型">
                            <Option value="0">写字楼</Option>
                            <Option value="1">商铺</Option>
                            <Option value="2">住宅</Option>
                            <Option value="3">厂房</Option>
                            <Option value="4">其他</Option>
                            <Option value="5">全部</Option>
                        </Select>
                    )} 
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" type='primary' icon="search">查询</Button>
                    <Button className={styles.btnStyle} type="primary">
                        <Link to={{ pathname: "/createHouse"}}>添加</Link>
                    </Button>
                    <Button className={styles.btnStyle} onClick={this.resetTable}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
const SearchInput2 = Form.create()(Search2)
