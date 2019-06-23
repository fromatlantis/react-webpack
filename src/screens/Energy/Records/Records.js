import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import {
    Alert,
    Button,
    Card,
    DatePicker,
    Divider,
    Modal,
    Select,
    Steps,
    Table,
    Input,
    Upload,
    message,
} from 'antd'
import { FormView, IconFont } from 'components'
import Preview from './Preview'
import styles from './Records.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/meterRecord'

const { Option } = Select
const { MonthPicker, RangePicker } = DatePicker
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
        records: state.meterRecord.records,
        recordDetail: state.meterRecord.recordDetail,
        searchParams: state.meterRecord.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getMeterRecordList: actions('getMeterRecordList'),
            getRecordDetail: actions('getRecordDetail'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Records extends PureComponent {
    state = {
        current: 0, //导入：当前页
        importModal: false,
        importResponse: {
            normalList: [], //正常数据
            repeatList: [], //重复数据
            abnormalList: [], //异常数据
        },
    }
    componentDidMount() {
        this.props.getMeterRecordList()
    }
    // 查询
    search = () => {
        const { form } = this.wrappedForm.props
        const values = form.getFieldsValue()
        values.pageNo = 1
        this.props.getMeterRecordList(values)
    }
    reset = () => {
        const { form } = this.wrappedForm.props
        form.resetFields()
        this.search()
    }
    // 分页
    onPageChange = pageNo => {
        this.props.getMeterRecordList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getMeterRecordList({ pageNo: 1, pageSize })
    }
    renderForm = () => {
        const items = [
            {
                label: '月份',
                field: 'timeInterval',
                component: <MonthPicker />,
            },
            {
                label: '表编号',
                field: 'meterNo',
                component: <Input />,
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
    render() {
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
            },
            {
                title: '报修类型',
                dataIndex: 'categories',
                key: 'categories',
            },
            {
                title: '月份',
                dataIndex: 'deadline',
                key: 'deadline',
            },
            {
                title: '抄表周期',
                dataIndex: 'cycle',
                key: 'cycle',
                render: cycle => <span>按月抄表</span>,
            },
            {
                title: '本期读数',
                dataIndex: 'numericValue',
                key: 'numericValue',
            },
            {
                title: '抄表员',
                dataIndex: 'transcriberName',
                key: 'transcriberName',
            },
            {
                title: '抄表时间',
                dataIndex: 'readingTime',
                key: 'readingTime',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                render: (_, record) => (
                    <div>
                        <Link to={`/energy/record/${record.recordId}`}>详情</Link>
                        <Button type="link">删除</Button>
                    </div>
                ),
            },
        ]
        const { records, searchParams } = this.props
        const { current } = this.state
        const uploadProps = {
            name: 'recordFile',
            multiple: false,
            accept: '.xls,.xlsx',
            action: '/property/importRecords',
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
        return (
            <Card bordered={false}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {this.renderForm()}
                    <div>
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Link to="/energy/newRecord">
                            <Button type="primary">新增</Button>
                        </Link>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.importModal}>
                            导入
                        </Button>
                    </div>
                </div>
                <Alert
                    style={{ margin: '10px 0' }}
                    message={`共${records.totalCount || 0}条数据`}
                    type="info"
                    showIcon
                />
                <Table
                    dataSource={records.list}
                    columns={columns}
                    pagination={{
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '20', '30'],
                        total: records.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onPageChange,
                    }}
                />
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
                                    模版下载
                                </a>
                            </div>
                        </div>
                    )}
                    {current === 1 && (
                        <div className={styles.stepCard}>
                            <Preview data={this.state.importResponse} />
                        </div>
                    )}
                </Modal>
            </Card>
        )
    }
}
export default Records
