/**
 * 物料管理 ==> 物料管理
 */
import React, { PureComponent } from 'react'
import {
    Alert,
    Button,
    Table,
    Input,
    Modal,
    Divider,
    Select,
    Form,
    InputNumber,
    Radio,
    Card,
} from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { Link } from 'react-router-dom'
import { SearchView } from 'components'

import styles from '../Material.module.css'

import AddMaterial from './AddMaterial'
import BatchImport from './BatchImport'

const Option = Select.Option

@connect(
    state => {
        return {
            MaterialList: state.materialManager.MaterialList, //物料列表
            MaterialListTotalCount: state.materialManager.MaterialListTotalCount, //物料列表总条数
            searchParamsMaterialList: state.materialManager.searchParamsMaterialList, //物料列表-分页
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getMaterialList: actions('getMaterialList'),
                materialStock: actions('materialStock'),
            },
            dispatch,
        )
    },
)
class Manager extends PureComponent {
    state = {
        // 出入库的对话框-参数
        visible: false,
        // 出入库的状态-单选radio的参数
        value: 1,
        //最开始的库存数量（在表单计算中不变）
        countNumNotD: 0,
        //库存数量、物料id
        countNum: 0,
        materialId: '',
    }
    //生命周期
    componentDidMount = () => {
        //物料管理==>获取物料列表
        this.props.getMaterialList()
    }
    handleSubmit = e => {
        e.preventDefault()
    }
    // 出入库的对话框-三个方法
    showModal = record => {
        // console.log('record', record)
        this.setState({
            visible: true,
            countNumNotD: parseInt(record.count),
            countNum: parseInt(record.count),
            materialId: record.id,
        })
    }
    handleOk = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                values.materialId = this.state.materialId
                values.type = this.state.value
                console.log('values', values)
                this.props.materialStock(values)
                this.setState({ visible: false })
            }
        })
    }
    handleCancel = e => {
        this.setState({ visible: false })
    }
    //"数量"改变时的回调
    onChangeNumber = value => {
        // console.log('value', value)
        let aaa = 0
        if (this.state.value === 0) {
            aaa = this.state.countNumNotD + value
        } else {
            aaa = this.state.countNumNotD - value
        }
        this.setState({ countNum: aaa })
    }
    // 出入库-radio状态的改变回调
    radioOnChange = e => {
        console.log('radio状态值', e.target.value)
        this.setState({
            value: e.target.value,
        })
    }
    //物料列表分页方法
    onShowSizeChange(current, pageSize) {
        this.props.getMaterialList({ pageNo: 1, pageSize: pageSize })
    }
    onChange(pageNo, pageSize) {
        this.props.getMaterialList({ pageNo: pageNo, pageSize: pageSize })
    }

    //列表检索表单
    renderForm = type => {
        const items = [
            {
                label: '物料名称：',
                field: 'name',
                component: <Input placeholder="请输入" />,
            },
            {
                label: '物料类型：',
                field: 'type',
                component: (
                    <Select style={{ width: '200px' }} placeholder="请选择类型">
                        <Option value="">全部</Option>
                        <Option value="工具类">工具类</Option>
                        <Option value="一次性消耗品">一次性消耗品</Option>
                    </Select>
                ),
            },
            {
                label: '物料型号：',
                field: 'size',
                component: <Input placeholder="请输入" />,
            },
        ]
        return (
            <SearchView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={{}}
                layout="inline"
                items={items}
                data={this.props.searchParams}
                saveBtn={false}
            />
        )
    }
    // 查询
    search = () => {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                values.pageNo = 1
                console.log('values', values)
                this.props.getMaterialList(values)
            }
        })
    }
    handleReset = () => {
        this.form.resetFields()
        this.search()
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                key: 'num',
                align: 'center',
                render: (text, record, index) => <span>{index + 1}</span>,
            },
            {
                title: '物料类型',
                dataIndex: 'type',
                key: 'type',
                align: 'center',
            },
            {
                title: '物料名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            },
            {
                title: '物料型号',
                dataIndex: 'size',
                key: 'size',
                align: 'center',
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                align: 'center',
            },
            {
                title: '用途说明',
                dataIndex: 'remark',
                key: 'remark',
                align: 'center',
                render: remark => (remark ? <span>{remark}</span> : <span>--</span>),
            },
            {
                title: '库存',
                dataIndex: 'count',
                key: 'count',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Link to={{ pathname: `/material/materialDetails/${record.id}` }}>
                            详情
                        </Link>
                        <Divider type="vertical" />
                        <Link to={{ pathname: `/material/compileMaterial/${record.id}` }}>
                            编辑
                        </Link>
                        <Divider type="vertical" />
                        <Link to={{}} onClick={() => this.showModal(record)}>
                            出入库
                        </Link>
                    </span>
                ),
            },
        ]

        return (
            <Card title="物料管理" bordered={false}>
                <div className={styles.searchCard}>
                    {this.renderForm()}
                    <div className={styles.toolbar2}>
                        <Button type="ghost" onClick={this.handleReset}>
                            清空
                        </Button>
                        <Divider type="vertical" className={styles.dividerSty} />
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <Divider type="vertical" className={styles.dividerSty} />
                        <AddMaterial />
                        <Divider type="vertical" className={styles.dividerSty} />
                        <BatchImport />
                    </div>
                    <Alert
                        message={'共 ' + this.props.MaterialListTotalCount + ' 项'}
                        type="info"
                        showIcon
                    />
                </div>
                <Table
                    dataSource={this.props.MaterialList}
                    columns={columns}
                    rowKey={(record, index) => `complete${record.id}${index}`}
                    pagination={{
                        current: this.props.searchParamsMaterialList.pageNo,
                        showSizeChanger: true,
                        pageSizeOptions: ['2', '5', '10'],
                        total: this.props.MaterialListTotalCount,
                        onShowSizeChange: this.onShowSizeChange.bind(this),
                        onChange: this.onChange.bind(this),
                    }}
                />
                <Modal
                    title={
                        <p>
                            <span className={styles.marModalL}>物料出入库</span>
                            <span className={styles.marModalR}>物料管理</span>
                        </p>
                    }
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="状态：">
                            <Radio.Group onChange={this.radioOnChange} value={this.state.value}>
                                <Radio value={0}>入库</Radio>
                                <Radio value={1}>出库</Radio>
                                <Radio value={2}>报废</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="数量：">
                            {getFieldDecorator('number', { initialValue: 0 })(
                                <InputNumber min={0} onChange={this.onChangeNumber} />,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="库存：">
                            {getFieldDecorator('count', { initialValue: this.state.countNum })(
                                <InputNumber disabled min={0} onChange={this.onChange} />,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        )
    }
}
export default Form.create()(Manager)
