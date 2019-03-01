/**
 * 租赁房源
 */
import React, { PureComponent } from 'react'
import { Form,Card,Button,Table,Input,Select,Divider } from 'antd';
import { Link } from 'react-router-dom'

const Option = Select.Option;

export default class LeaseHouse extends PureComponent {

    //生命周期
    componentDidMount = () => {
        //租赁管理-租赁房源List 
        this.props.getRentHouseList()
    }
    //列表分页方法
    onShowSizeChange(current, pageSize) {
      this.props.getRentHouseList({ pageNo: 1, pageSize: pageSize });
    }
    onChange(pageNo, pageSize) {
        this.props.getRentHouseList({ pageNo: pageNo, pageSize: pageSize });
    }
    //是否发布
    TrueOrFalseRel(data){
        if(data.rentStatus === '未发布'){
            return(
                <Link to={{  }} onClick={()=>this.housePublishMe(data.houseId)}>发布</Link>
            )
        }else{
            return(
                <Link to={{  }} onClick={()=>this.housePublishMa(data.houseId)}>关闭</Link>
            )
        }
    }
    //发布
    housePublishMe = (houseId) => {
      console.log(this.props.rentHouseList.houseId)
      this.props.housePublish({ houseId:houseId, status:1 })
    }
    //关闭
    housePublishMa = (houseId) => {
      this.props.housePublish({ houseId:houseId, status:0 })
    }

    render() {

          const columns = [
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
            title: '发布状态',
            dataIndex: 'rentStatus',
            key: 'rentStatus',
            align: 'center',
          },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
              <span>
                  <Link to={{ pathname: `/leaseHouseDetails/${record.buildingId}/${record.houseId}` }}>详情</Link>
                  <Divider type="vertical" />
                  {this.TrueOrFalseRel(record)}
              </span>
            ),
          }
        ];
    
        return (
            <div>
                <Card style={{ width:'100%' }} bodyStyle={{ padding:'10px 20px' }}>
                    <span>租赁管理/租赁房源</span>
                </Card>
                <Card>
                    <SearchInput search={this.props.getRentHouseList} />
                    <Table
                        style={{marginTop:'15px'}}
                        dataSource={this.props.rentHouseList}
                        columns={columns}
                        rowKey={(record, index) => `complete${record.id}${index}`}
                        pagination={{
                          current: this.props.searchParamsRh.pageNo,
                          showSizeChanger: true,
                          pageSizeOptions: ['2', '5', '10'],
                          total: this.props.totalCountRentHouse,
                          onShowSizeChange: this.onShowSizeChange.bind(this),
                          onChange: this.onChange.bind(this)
                      }}
                    />
                </Card>
            </div>
        )
    }
}

class Search extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
            return
        }
        console.log(fieldsValue)
        this.props.search(fieldsValue)
    });
  }
  resetTable = () => {
    this.props.search({ 
        pageNo: 1,
        buildingName: '',
        buildingNo: '',
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
                <Form.Item {...formItemLayout}>
                    {getFieldDecorator('buildingName')(
                        <Input style={{width:'300px'}} placeholder='楼栋名称'/>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout}>
                    {getFieldDecorator('buildingNo')(
                        <Input style={{width:'300px'}} placeholder='楼栋编号'/>
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
                <Form.Item style={{marginLeft:'20%'}}>
                    <Button htmlType="submit" type='primary' icon="search">查询</Button>
                    <Button style={{marginLeft:'15px'}} onClick={this.resetTable}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
const SearchInput = Form.create()(Search)
