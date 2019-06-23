import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import {
    Alert,
    Button,
    Card,
    DatePicker,
    Divider,
    Input,
    Select,
    Table,
    Modal,
    Steps,
    Upload,
    Radio,
    Popconfirm,
    message,
} from 'antd'
import { FormView, IconFont } from 'components'
import MeterForm from './MeterForm'
import Preview from './Preview'
import SetForm from './SetForm'
import styles from './Manage.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/meter'

const { Option } = Select
const { MonthPicker } = DatePicker

const Step = Steps.Step
const steps = [
    {
        title: '上传文件',
        content: 'First-content',
        icon: <IconFont type="iconshangchuanwenjian" />,
    },
    {
        title: '预览',
        content: 'Second-content',
        icon: <IconFont type="iconyulan" />,
    },
]
const Dragger = Upload.Dragger

const mapStateToProps = state => {
    return {
        meter: state.meter.meter,
        meterDetail: state.meter.meterDetail,
        searchParams: state.meter.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getMeterList: actions('getMeterList'),
            getMeterDetail: actions('getMeterDetail'),
            addMeter: actions('addMeter'),
            updateMeter: actions('updateMeter'),
            deleteMeter: actions('deleteMeter'),
            leadInMeters: actions('leadInMeters'), //导入
            meterSet: actions('meterSet'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Manage extends PureComponent {
    state = {
        selectedRowKeys: [], //已选择
        newModal: false,
        importModal: false,
        setModal: false,
        setAllModal: false,
        current: 0, //导入：当前页
        type: 1, //导入：类型
        isEdit: false,
        importResponse: {
            normalList: [], //正常数据
            repeatList: [], //重复数据
            abnormalList: [], //异常数据
        },
    }
    componentDidMount() {
        this.props.getMeterList()
    }
    // 查询
    search = () => {
        const { form } = this.wrappedForm.props
        const values = form.getFieldsValue()
        values.pageNo = 1
        this.props.getMeterList(values)
    }
    reset = () => {
        const { form } = this.wrappedForm.props
        form.resetFields()
        this.search()
    }
    // 分页
    onPageChange = pageNo => {
        this.props.getMeterList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getMeterList({ pageNo: 1, pageSize })
    }
    renderForm = () => {
        const items = [
            {
                label: '表编号',
                field: 'meterNo',
                component: <Input placeholder="表编号" />,
            },
            {
                label: '表类型',
                field: 'category',
                component: (
                    <Select placeholder="表类型" style={{ width: 160 }}>
                        <Option value="">全部</Option>
                        <Option value="water">水表</Option>
                        <Option value="ammeter">电表</Option>
                        <Option value="fuelgas">燃气表</Option>
                    </Select>
                ),
            },
            {
                label: '安装地址',
                field: 'location',
                component: <Input placeholder="安装地址" />,
            },
        ]
        return (
            <FormView
                wrappedComponentRef={ref => {
                    this.wrappedForm = ref
                }}
                formItemLayout={{}}
                layout="inline"
                items={items}
                data={this.props.searchParams}
                saveBtn={false}
            />
        )
    }
    // 新增
    newModal = () => {
        this.setState({
            isEdit: false,
            newModal: true,
        })
    }
    newModalOk = () => {
        this.meterForm.validateFields((errors, values) => {
            if (!errors) {
                const { meterDetail, addMeter, updateMeter } = this.props
                const { isEdit } = this.state
                if (isEdit) {
                    values.id = meterDetail.id
                    updateMeter(values)
                } else {
                    addMeter(values)
                }
                this.setState({
                    newModal: false,
                })
            }
        })
    }
    newModalCancel = () => {
        this.setState({
            newModal: false,
        })
    }
    // 批量设置
    setModal = () => {
        const { selectedRowKeys } = this.state
        if (selectedRowKeys.length === 0) {
            message.error('请选择需要设置的内容')
        } else {
            this.setState({
                setModal: true,
            })
        }
    }
    setModalOk = () => {
        const { selectedRowKeys } = this.state
        this.setForm.validateFields((errors, values) => {
            if (!errors) {
                values.ids = selectedRowKeys.join(',')
                this.props.meterSet(values)
                this.setState({
                    setModal: false,
                    selectedRowKeys: [],
                })
            }
        })
    }
    setModalCancel = () => {
        this.setState({
            setModal: false,
        })
    }
    // 全部设置
    setAllModal = () => {
        this.setState({
            setAllModal: true,
        })
    }
    setAllModalOk = () => {
        this.setAllForm.validateFields((errors, values) => {
            if (!errors) {
                values.ids = 'all'
                this.props.meterSet(values)
                this.setState({
                    setAllModal: false,
                })
            }
        })
    }
    setAllModalCancel = () => {
        this.setState({
            setAllModal: false,
        })
    }
    // 导入
    importModal = () => {
        this.setState({
            importModal: true,
            current: 0, //重置
            importResponse: {
                normalList: [], //正常数据
                repeatList: [], //重复数据
                abnormalList: [], //异常数据
            },
        })
    }
    importModalOk = () => {
        const { normalList, repeatList } = this.state.importResponse
        if (normalList.length === 0 && repeatList.length === 0) {
            message.error('未检测到需要导入的数据')
        } else {
            this.props.leadInMeters({ normalList: JSON.stringify(normalList) })
            this.setState({
                importModal: false,
            })
        }
    }
    repeaConfirmOk = () => {
        const { normalList, repeatList } = this.state.importResponse
        if (repeatList.length > 0) {
            this.props.leadInMeters({
                normalList: JSON.stringify(normalList),
                repeatList: JSON.stringify(repeatList),
            })
            this.setState({
                importModal: false,
            })
        }
    }
    importModalCancel = () => {
        this.setState({
            importModal: false,
        })
    }
    changeType = e => {
        this.setState({
            type: e.target.value,
        })
    }
    next() {
        const current = this.state.current + 1
        this.setState({ current })
    }
    prev() {
        const current = this.state.current - 1
        this.setState({ current })
    }
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }
    //  导入完成
    renderImportOk = () => {
        const { importResponse } = this.state
        if (importResponse.repeatList.length > 0) {
            return (
                <Popconfirm
                    title="有重复数据，是否覆盖掉重复数据？"
                    onConfirm={this.repeaConfirmOk}
                    onCancel={this.importModalOk}
                    okText="覆盖"
                    cancelText="不覆盖"
                >
                    <Button type="primary">完成</Button>
                </Popconfirm>
            )
        } else {
            return (
                <Button type="primary" onClick={this.importModalOk}>
                    完成
                </Button>
            )
        }
    }
    render() {
        const categoryStr = {
            water: '水表',
            ammeter: '电表',
            fuelgas: '燃气表',
        }
        const columns = [
            {
                title: '表编号',
                dataIndex: 'meterNo',
                key: 'meterNo',
            },
            {
                title: '表类型',
                dataIndex: 'category',
                key: 'category',
                render: category => <span>{categoryStr[category]}</span>,
            },
            {
                title: '抄表周期',
                dataIndex: 'cycle',
                key: 'cycle',
                render: cycle => <span>按月抄表</span>,
            },
            {
                title: '截止时间',
                dataIndex: 'deadlineDay',
                key: 'deadlineDay',
                render: deadlineDay => <span>{deadlineDay}</span>,
            },
            {
                title: '安装位置',
                dataIndex: 'location',
                key: 'location',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                render: (_, record) => (
                    <div>
                        <Link to={`/energy/manage/${record.id}`}>
                            <Button type="link" size="small">
                                详情
                            </Button>
                        </Link>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                this.setState({
                                    isEdit: true,
                                    newModal: true,
                                })
                                this.props.getMeterDetail({ id: record.id })
                            }}
                        >
                            修改
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                this.props.deleteMeter({ id: record.id })
                            }}
                        >
                            删除
                        </Button>
                    </div>
                ),
            },
        ]
        const { meter, searchParams, meterDetail } = this.props
        const { current, type, selectedRowKeys, isEdit } = this.state
        const uploadProps = {
            name: 'excelFile',
            multiple: false,
            accept: '.xls,.xlsx',
            action: '/property/leadInMetersFileRead',
            data: {
                areaType: this.state.type,
            },
            onChange: info => {
                const status = info.file.status
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList)
                }
                if (status === 'done') {
                    message.success(`${info.file.name}上传成功`)
                    this.setState({
                        importResponse: info.file.response.data,
                    })
                } else if (status === 'error') {
                    message.error(`${info.file.name}上传失败`)
                }
            },
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        return (
            <Card bordered={false}>
                <div>
                    {this.renderForm()}
                    <div style={{ textAlign: 'right', marginTop: '5px' }}>
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newModal}>
                            新增
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.importModal}>
                            导入
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.setModal}>
                            批量设置
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.setAllModal}>
                            全部设置
                        </Button>
                    </div>
                </div>
                <Alert
                    style={{ margin: '10px 0' }}
                    message={`共${meter.totalCount || 0}条数据`}
                    type="info"
                    showIcon
                />
                <Table
                    rowKey="id"
                    dataSource={meter.resultList}
                    columns={columns}
                    rowSelection={rowSelection}
                    pagination={{
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '20', '30'],
                        total: meter.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onPageChange,
                    }}
                />
                <Modal
                    title={isEdit ? '修改设备' : '新增设备'}
                    visible={this.state.newModal}
                    onOk={this.newModalOk}
                    onCancel={this.newModalCancel}
                >
                    <MeterForm
                        forwardedRef={ref => {
                            this.meterForm = ref
                        }}
                        meterDetail={isEdit ? meterDetail : { areaType: 1 }}
                    />
                </Modal>
                <Modal
                    title="批量设置"
                    visible={this.state.setModal}
                    onOk={this.setModalOk}
                    onCancel={this.setModalCancel}
                >
                    <SetForm
                        forwardedRef={ref => {
                            this.setForm = ref
                        }}
                    />
                </Modal>
                <Modal
                    title="全部设置"
                    visible={this.state.setAllModal}
                    onOk={this.setAllModalOk}
                    onCancel={this.setAllModalCancel}
                >
                    <SetForm
                        forwardedRef={ref => {
                            this.setAllForm = ref
                        }}
                    />
                </Modal>
                <Modal
                    title="导入"
                    visible={this.state.importModal}
                    onOk={this.importModalOk}
                    onCancel={this.importModalCancel}
                    width={760}
                    footer={
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    下一步
                                </Button>
                            )}
                            {current === steps.length - 1 && this.renderImportOk()}
                            {current > 0 && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    上一步
                                </Button>
                            )}
                        </div>
                    }
                >
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} icon={item.icon} />
                        ))}
                    </Steps>
                    {current === 0 && (
                        <div className={styles.stepCard}>
                            <div className={styles.areaType}>
                                <Radio.Group
                                    defaultValue={1}
                                    buttonStyle="solid"
                                    onChange={this.changeType}
                                >
                                    <Radio.Button value={1}>公区</Radio.Button>
                                    <Radio.Button value={2}>企业</Radio.Button>
                                    <Radio.Button value={3}>个人</Radio.Button>
                                    <Radio.Button value={4}>其他</Radio.Button>
                                </Radio.Group>
                            </div>
                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                    <IconFont type="iconxls" />
                                </p>
                                <p className="ant-upload-text">将文件拖拽至此区域或点击上传文件</p>
                                <p className="ant-upload-hint">导入说明：文件必须为XLS或XLSX格式</p>
                            </Dragger>
                            <div style={{ padding: '20px 0', textAlign: 'right' }}>
                                没有模版？
                                <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190614/72fee9a0-c97d-4082-a889-0b575ebe376b-批量导入企业XLSX模板.xlsx">
                                    公区表模版下载
                                </a>
                                <Divider type="vertical" />
                                <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190614/72fee9a0-c97d-4082-a889-0b575ebe376b-批量导入企业XLSX模板.xlsx">
                                    企业表模版下载
                                </a>
                                <Divider type="vertical" />
                                <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190614/72fee9a0-c97d-4082-a889-0b575ebe376b-批量导入企业XLSX模板.xlsx">
                                    公区表模版下载
                                </a>
                                <Divider type="vertical" />
                                <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190614/72fee9a0-c97d-4082-a889-0b575ebe376b-批量导入企业XLSX模板.xlsx">
                                    其他表模版下载
                                </a>
                            </div>
                        </div>
                    )}
                    {current === 1 && (
                        <div className={styles.stepCard}>
                            <Preview type={type} data={this.state.importResponse} />
                        </div>
                    )}
                </Modal>
            </Card>
        )
    }
}
export default Manage
