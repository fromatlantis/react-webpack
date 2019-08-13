import React, { PureComponent } from 'react'
import {
    Avatar,
    Card,
    Form,
    Input,
    Button,
    Table,
    Select,
    Divider,
    Breadcrumb,
    Modal,
    Tag,
} from 'antd'
import { Link } from 'react-router-dom'
import styles from './SupplierList.module.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux/agencyRequire'

let page = { pageNo: 1, pageSize: 10 }
const confirm = Modal.confirm
class SupplierList extends PureComponent {
    state = {
        categoryId: '',
        addTypes: [],
        allActive: true,
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
            if (this.state.addTypes.length > 0) {
                params.categoryId = this.state.addTypes.join(',')
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
    addServeType = id => {
        this.setState({ allActive: false })
        let type = true
        let { addTypes } = this.state
        let oldaddTypes = []
        let newaddTypes = []
        for (let i in addTypes) {
            if (addTypes[i] == id) {
                type = false
            } else {
                newaddTypes.push(addTypes[i])
            }
            oldaddTypes.push(addTypes[i])
        }
        if (type) {
            oldaddTypes.push(id)
            this.setState({
                addTypes: oldaddTypes,
            })
        } else {
            this.setState({
                addTypes: newaddTypes,
            })
        }
    }
    allType = () => {
        this.setState({ addTypes: [], allActive: !this.state.allActive })
    }
    clearInput = () => {
        this.setState({ allActive: true, addTypes: [] })
        this.props.form.resetFields()
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        parm.categoryId = undefined
        this.props.getSupplierList(parm)
    }
    underSupp = id => {
        let that = this
        confirm({
            title: '确定要下架吗',
            onOk() {
                let parm = that.formParms()
                parm.pageNo = 1
                parm.pageSize = 10
                that.props.undercarriageSupplier({ id: id, parm: parm })
            },
            onCancel() {},
        })
    }
    render() {
        let that = this
        const { addTypes, allActive } = this.state
        const { getFieldDecorator } = this.props.form
        const columns = [
            // {
            //     title: '序号',
            //     key: 'num',
            //     dataIndex: 'num',
            //     align: 'center',
            //     render: (text, record, index) => <span key={text}>{index + 1}</span>,
            // },
            {
                title: 'LOGO',
                dataIndex: 'logo',
                key: 'logo',
                align: 'center',
                render: logo => <Avatar src={logo} size={60} shape="square" />,
            },
            {
                title: '供应商名称',
                dataIndex: 'supplier',
                key: 'supplier',
                align: 'center',
            },
            {
                title: '联系人',
                dataIndex: 'contract',
                key: 'contract',
                align: 'center',
            },
            {
                title: '联系方式',
                dataIndex: 'telephone',
                key: 'telephone',
                align: 'center',
            },
            {
                title: '供应商类型',
                dataIndex: 'categories',
                key: 'categories',
                width: 230,
                render: categories => {
                    return categories
                        .split(',')
                        .map((item, index) => index < 3 && <Tag color="blue">{item}</Tag>)
                },
            },
            {
                title: '状态',
                dataIndex: 'flagName',
                key: 'flagName',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'handle',
                fixed: 'right',
                width: 160,
                key: 'handle',
                align: 'center',
                render: (text, record) => (
                    <span key={record}>
                        <Link to={`/agency/supplierEdit/${record.supplierId}`}>编辑</Link>
                        <Divider type="vertical" />
                        <Link to={`/agency/supplierDetail/${record.supplierId}`}>详情</Link>
                        <Divider type="vertical" />
                        <span
                            onClick={() => this.underSupp(record.supplierId)}
                            style={{
                                color: record.flag === '1' ? '#0099CC' : 'red',
                                cursor: 'pointer',
                            }}
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
        return (
            <div className={styles.containerSup}>
                <div className={styles.titleSty}>供应商列表</div>
                <div className={styles.searchSty}>
                    <div className={styles.typeTitle}>
                        <span style={{ marginRight: 5 }}>供应商类型：</span>
                        <span
                            className={`${styles.typeBut} ${allActive ? styles.active : ''}`}
                            onClick={this.allType}
                        >
                            全部
                        </span>
                        {serList.map((item, i) => {
                            let newitem = addTypes.filter(itemType => {
                                return item.id == itemType
                            })
                            if (!newitem.length) {
                                return (
                                    <span
                                        key={i}
                                        onClick={() => that.addServeType(item.id)}
                                        className={styles.typeBut}
                                    >
                                        {item.typeName}
                                    </span>
                                )
                            } else {
                                return (
                                    <span
                                        key={i}
                                        onClick={() => that.addServeType(item.id)}
                                        className={`${styles.active} ${styles.typeBut}`}
                                    >
                                        {item.typeName}
                                    </span>
                                )
                            }
                        })}
                    </div>
                    <Form
                        layout="inline"
                        onSubmit={this.handleSubmit}
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                        <div>
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
                        </div>
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
                </div>
                <div className={styles.tableSty}>
                    <Table
                        style={{ marginTop: 20 }}
                        columns={columns}
                        scroll={{ x: 1200 }}
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
                </div>
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
