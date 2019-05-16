import React, { PureComponent } from 'react'
import { Card, Form, Input, Button, Table, Select, Divider, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import styles from './SupplierList.module.css'
import ListClick from '../../../components/ListClick/ListClick'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux/agencyRequire'

let page = { pageNo: 1, pageSize: 10 }
class SupplierList extends PureComponent {
    state = {
        typeId: '',
    }
    componentDidMount = () => {
        this.props.getSupplierList(page)
        this.props.getServiceTypeList()
    }
    formParms = () => {
        let params = {}
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            params = fieldsValue
            if (this.state.typeId && this.state.typeId !== 'undefined') {
                params.typeId = this.state.typeId
            }
        })
        return params
    }
    // table的pageSize改变
    onShowSizeChange = (pageNo, pageSize) => {
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = pageSize
        this.props.getSupplierList(parm)
    }
    // table的pageNo改变
    onChange = (pageNo, pageSize) => {
        let parm = this.formParms()
        parm.pageNo = pageNo
        parm.pageSize = pageSize
        this.props.getSupplierList(parm)
    }
    handleSubmit = e => {
        e.preventDefault()
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        this.props.getSupplierList(parm)
    }
    getTypeId = num => {
        this.setState({
            typeId: num,
        })
    }
    clearInput = () => {
        this.listClick.updateAll()
        this.props.form.resetFields()
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        parm.typeId = undefined
        this.props.getSupplierList(parm)
    }
    onRef = ref => {
        this.listClick = ref
    }
    underSupp = id => {
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        this.props.undercarriageSupplier({ id: id, parm: parm })
    }
    render() {
        // 供应商分类默认是上面那个
        const { getFieldDecorator } = this.props.form
        const columns = [
            {
                title: '序号',
                key: 'num',
                dataIndex: 'num',
                align: 'center',
                render: (text, record, index) => <span key={text}>{index + 1}</span>,
            },
            {
                title: '供应商类型',
                dataIndex: 'type_name',
                key: 'type_name',
                align: 'center',
            },
            {
                title: '供应商名称',
                dataIndex: 'supplier',
                key: 'supplier',
                align: 'center',
            },
            {
                title: '服务的次数',
                dataIndex: 'serviceTimes',
                key: 'serviceTimes',
                align: 'center',
            },
            // {
            //     title: '总评分(满分5分)',
            //     dataIndex: 'totalScore',
            //     key: 'totalScore',
            //     align: 'center',
            // },
            {
                title: '提供的服务',
                dataIndex: 'category',
                key: 'category',
                align: 'center',
            },
            {
                title: '供应商联系人',
                dataIndex: 'contract',
                key: 'contract',
                align: 'center',
            },
            {
                title: '联系电话',
                dataIndex: 'telephone',
                key: 'telephone',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'handle',
                key: 'handle',
                align: 'center',
                render: (text, record) => (
                    <span key={record}>
                        <Link to={`/agency/supplierEdit/${record.id}`}>编辑</Link>
                        <Divider type="vertical" />
                        <Link to={`/agency/supplierDetail/${record.id}`}>详情</Link>
                        <Divider type="vertical" />
                        <span
                            onClick={() => this.underSupp(record.id)}
                            style={{ color: '#0099CC', cursor: 'pointer' }}
                        >
                            {record.flag === '1' ? '下架' : '上架'}
                        </span>
                    </span>
                ),
            },
        ]
        const serList = this.props.ServiceTypeList.filter(item => {
            return item.level === '1'
        })
        serList.unshift({ typeName: '全部', id: 'undefined' })
        return (
            <div className={styles.containerSup}>
                <Card title="供应商列表" bordered={false}>
                    <div className={styles.typeTitle}>
                        <ListClick
                            onRef={this.onRef}
                            data={serList}
                            getId={id => this.getTypeId(id)}
                            title="供应商类型："
                        />
                    </div>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item label="供应商名称：">
                            {getFieldDecorator('supplier')(
                                <Input placeholder="请输入" style={{ width: 220 }} />,
                            )}
                        </Form.Item>
                        <Form.Item label="供应商联系人：">
                            {getFieldDecorator('contract', { initialValue: '' })(
                                <Input placeholder="请输入" style={{ width: 220 }} />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                style={{ marginRight: 10, marginLeft: 10 }}
                                onClick={this.clearInput}
                            >
                                清空
                            </Button>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Divider type="vertical" />
                            <Button type="primary" href="#/agency/supplierAdd">
                                新增
                            </Button>
                        </Form.Item>
                    </Form>
                    <Table
                        style={{ marginTop: 20 }}
                        columns={columns}
                        rowKey={(record, index) => `complete${record.id}${index}`}
                        dataSource={this.props.supperList}
                        pagination={{
                            // current: 1,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: this.props.supperListTotal,
                            onShowSizeChange: this.onShowSizeChange.bind(this),
                            onChange: this.onChange.bind(this),
                        }}
                    />
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ServiceTypeList: state.agencyRequire.ServiceTypeList,
        supperList: state.agencyRequire.supperList,
        supperListTotal: state.agencyRequire.supperListTotal,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getServiceTypeList: actions('getServiceTypeList'),
            getSupplierList: actions('getSupplierList'),
            undercarriageSupplier: actions('undercarriageSupplier'),
        },
        dispatch,
    )
}
export default Form.create()(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(SupplierList),
)
