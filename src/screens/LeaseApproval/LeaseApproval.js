/**
 * 租赁审批
 */
import React, { PureComponent } from 'react'
import { Form,Card,Button,Table,Input,Statistic, Row, Col } from 'antd';
import { Link } from 'react-router-dom'

export default class LeaseApproval extends PureComponent {
    //生命周期
    componentDidMount = () => {
        //统计当前用审批的企业入驻申请以及未审批的申请数量
        this.props.statApproveStatus()
        //POST / 企业入驻申请列表查询
        this.props.getEnterApplyLists()
    }
    //楼宇管理列表分页方法
    onShowSizeChange(current, pageSize) {
        this.props.getEnterApplyLists({ pageNo: 1, pageSize: pageSize });
    }
    onChange(pageNo, pageSize) {
        this.props.getEnterApplyLists({ pageNo: pageNo, pageSize: pageSize });
    }
    TrueOrFalseLink = (record) => {
        if(record.approveStatus==='0'){
            return(
                <Link to={{ pathname:`/approvalApply/${record.applyId}` }}>审批</Link>
            )
        }else if(record.approveStatus==='1'){
            return(  //已通过
                <Link to={{ pathname:`/seeAdopt/${record.applyId}` }}>查看</Link>
            )
        }else if(record.approveStatus==='2'){
            return(  //已拒绝
                <Link to={{ pathname:`/seeAdopt/${record.applyId}` }}>查看</Link>
            )
        }
    }

    render() {
        const {apply_count, agree_count, disagree_count} = this.props.approveStatus
        const columns = [
            {
            title:'序号',
            dataIndex:'num',
            key:'num',
            align:'center',
            render: (text, record, index) => <span>{index + 1}</span>
        },{
            title: '客户名称',
            dataIndex: 'companyName',
            align:'center',
            key: 'companyName',
        },{
            title: '客户类型',
            dataIndex: 'customerTypeName',
            key: 'customerTypeName',
            align:'center'
        },{
            title: '联系电话',
            dataIndex: 'phonenums',
            key: 'phonenums',
            align:'center'
        },{
              title:'申请时间',
              dataIndex:'applyTime',
              key:'applyTime',
              align:'center'
        },{
              title:'审批状态',
              dataIndex:'statusName',
              key:'statusName',
              align:'center'
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <span>
                    {this.TrueOrFalseLink(record)}
                </span>
            ),
          }];
        
        let zong = 0
        if(this.props.approveStatus.apply_count){
            zong = zong + apply_count
        }
        if(this.props.approveStatus.agree_count){
            zong = zong + agree_count
        }
        if(this.props.approveStatus.disagree_count){
            zong = zong + disagree_count
        }
        return (
            <div>
                <Card bordered={false} style={{ width:'100%' }} bodyStyle={{ padding:'10px 20px' }}>
                    <span>租赁管理/租赁审批</span>
                </Card>
                <Row gutter={16} style={{ marginLeft:'20%' }}>
                    <Col span={7}>
                        <Statistic 
                            title="我的待审批" 
                            value={apply_count}
                            valueStyle={{ fontSize:'26px' }}
                            suffix={ <span style={{ fontSize:'22px' }}>个申请</span> }
                        />
                    </Col>
                    <Col span={7}>
                        <Statistic 
                            title="审批驳回" 
                            value={disagree_count}
                            valueStyle={{ fontSize:'26px' }}
                            suffix={ <span style={{ fontSize:'22px' }}>个申请</span> }
                        />
                    </Col>
                    <Col span={7}>
                        <Statistic 
                            title="任务总数" 
                            value={zong}
                            // value={parseInt(apply_count)+parseInt(agree_count)+parseInt(disagree_count)}
                            valueStyle={{ fontSize:'26px' }}
                            suffix={ <span style={{ fontSize:'22px' }}>个申请</span> }
                        />
                    </Col>
                </Row>
                <Card bordered={false} style={{ marginTop:'20px' }}>
                    <SearchInput search={this.props.getEnterApplyLists} />
                    <Table
                        style={{marginTop:'20px'}}
                        dataSource={this.props.enterApplyLists}
                        columns={columns}
                        rowKey={(record, index) => `complete${record.id}${index}`}
                        pagination={{
                            current: this.props.searchParamsEnterApplyLists.pageNo,
                            showSizeChanger: true,
                            pageSizeOptions: ['2', '5', '10'],
                            total: this.props.totalCountEnterApplyLists,
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
            const values = {
                ...fieldsValue,
                pageNo: 1,
            }
            console.log(values)
            this.props.search(values)
        });
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
                <Form.Item {...formItemLayout} label='申请人：'>
                    {getFieldDecorator('applyUserName')(
                        <Input style={{width:'300px'}} placeholder='申请人姓名'/>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label='客户名称：'>
                    {getFieldDecorator('companyName')(
                        <Input style={{width:'300px'}} placeholder='输入客户名称'/>
                    )}
                </Form.Item>
                <Form.Item style={{marginLeft:'20%'}}>
                    <Button htmlType="submit" type='primary' icon="search">查询</Button>
                </Form.Item>
            </Form>
        )
    }
}
const SearchInput = Form.create()(Search)

