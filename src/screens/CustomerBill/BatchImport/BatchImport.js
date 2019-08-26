import React, { PureComponent, Fragment } from 'react'
import { Button, Upload, Modal, Steps, Radio, Tabs, Table, message } from 'antd'
import { IconFont } from 'components'
import styles from './BatchImport.module.css'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/customerBill'
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
const Step = Steps.Step
const { TabPane } = Tabs
const customerBase = [
    {
        title: '产品类型',
        dataIndex: 'productType',
        key: 'productType',
    },
    {
        title: '租售类型',
        dataIndex: 'rentType',
        key: 'rentType',
    },
    {
        title: '楼栋',
        dataIndex: 'building',
        key: 'building',
    },
    {
        title: '房号',
        dataIndex: 'room',
        key: 'room',
    },
    {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: '业主姓名',
        dataIndex: 'ownerName',
        key: 'ownerName',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '业务员',
        dataIndex: 'businessManager',
        key: 'businessManager',
    },
    {
        title: '中介',
        dataIndex: 'medium',
        key: 'medium',
    },
    {
        title: '签约日期',
        dataIndex: 'signDate',
        key: 'signDate',
    },
    {
        title: '营业执照编号',
        dataIndex: 'licenseNo',
        key: 'licenseNo',
    },
    {
        title: '付款方式',
        dataIndex: 'payType',
        key: 'payType',
    },
    {
        title: '合同编号',
        dataIndex: 'contractNo',
        key: 'contractNo',
    },
]
const customerSell = [
    {
        title: '预售单价（元/㎡）',
        dataIndex: 'advancePrice',
        key: 'advancePrice',
    },
    {
        title: '预售面积（㎡）',
        dataIndex: 'advanceArea',
        key: 'advanceArea',
    },
    {
        title: '实际面积（㎡）',
        dataIndex: 'realArea',
        key: 'realArea',
    },
    {
        title: '预售总价（元）',
        dataIndex: 'advancePriceTotal',
        key: 'advancePriceTotal',
    },
    {
        title: '实际/最终总价（元）',
        dataIndex: 'realPriceTotal',
        key: 'realPriceTotal',
    },
    {
        title: '实际面积单价（元/㎡)',
        dataIndex: 'realPrice',
        key: 'realPrice',
    },
    {
        title: '交房日期',
        dataIndex: 'startDate',
        key: 'startDate',
    },
]
const customerRent = [
    {
        title: '实际面积（㎡）',
        dataIndex: 'realArea',
        key: 'realArea',
    },
    {
        title: '租赁起始日期',
        dataIndex: 'startDate',
        key: 'startDate',
    },
    {
        title: '租赁终止日期',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: '租赁期限',
        dataIndex: 'rentLimit',
        key: 'rentLimit',
    },
    {
        title: '租赁单价（元/㎡）',
        dataIndex: 'realPrice',
        key: 'realPrice',
    },
    {
        title: '免租起始日期',
        dataIndex: 'freeStartDate',
        key: 'freeStartDate',
    },
    {
        title: '免租终止日期',
        dataIndex: 'freeEndDate',
        key: 'freeEndDate',
    },
    {
        title: '免租期限',
        dataIndex: 'freeLimit',
        key: 'freeLimit',
    },
    {
        title: '租赁押金',
        dataIndex: 'deposit',
        key: 'deposit',
    },
    {
        title: '租金总计',
        dataIndex: 'realPriceTotal',
        key: 'realPriceTotal',
    },
]
const baseItems = [
    {
        title: '序号',
        dataIndex: 'rowNo',
        key: 'rowNo',
    },
    {
        title: '楼栋',
        dataIndex: 'building',
        key: 'building',
    },
    {
        title: '房号',
        dataIndex: 'room',
        key: 'room',
    },
    {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: '费用类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '费用名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '应收款所属期',
        dataIndex: 'receiveDate',
        key: 'receiveDate',
    },
    {
        title: '账单编号',
        dataIndex: 'billNo',
        key: 'billNo',
    },
    {
        title: '应缴截止日期',
        dataIndex: 'limitDate',
        key: 'limitDate',
    },
    {
        title: '应收款金额（元）',
        dataIndex: 'amount',
        key: 'amount',
    },
]
const costItems = {
    能源费用: [
        {
            title: '单价（元）',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '计费度数',
            dataIndex: 'count',
            key: 'count',
        },
    ],
    有偿服务费: [
        {
            title: '单位',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '数量',
            dataIndex: 'count',
            key: 'count',
        },
    ],
    合同费用: [
        {
            title: '单价（元）',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '面积（㎡）',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: '每月物业费（元）',
            dataIndex: 'propertyFee',
            key: 'propertyFee',
        },
        {
            title: '每月租金（元））',
            dataIndex: 'rentFee',
            key: 'rentFee',
        },
    ],
    租金费用: [
        {
            title: '单价（元）',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '面积（㎡）',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: '每月租金（元））',
            dataIndex: 'rentFee',
            key: 'rentFee',
        },
    ],
    物业费用: [
        {
            title: '单价（元）',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '面积（㎡）',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: '每月物业费（元））',
            dataIndex: 'propertyFee',
            key: 'propertyFee',
        },
    ],
    其它综合费用: [],
}
const columsMap = {
    客户信息租: [...customerBase, ...customerRent],
    客户信息售: [...customerBase, ...customerSell],
    合同费用: [...baseItems, costItems['合同费用']],
    能源费用: [...baseItems, costItems['能源费用']],
    有偿服务费: [...baseItems, costItems['有偿服务费']],
    物业费用: [...baseItems, costItems['物业费用']],
    租金费用: [...baseItems, costItems['租金费用']],
    其它综合费用: [...baseItems, costItems['其它综合费用']],
}

@connect(
    state => ({
        bill: state.customerBill.bill,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                operateBatchImportBills: actions('operateBatchImportBills'),
            },
            dispatch,
        )
    },
)
class BatchImport extends PureComponent {
    state = {
        current: 0,
        modal: false,
        type: '客户信息租',
        importResponse: {},
    }
    importBills = () => {
        const {
            type,
            importResponse: { normalList },
        } = this.state
        this.props.operateBatchImportBills({
            type,
            normalList: JSON.stringify(normalList),
        })
        this.setState({
            modal: false,
        })
    }
    modalCancel = () => {
        this.setState({
            modal: false,
        })
    }
    changeType = e => {
        this.setState({
            type: e.target.value,
        })
    }
    next() {
        const { current } = this.state
        this.setState({ current: current + 1 })
    }
    prev() {
        const current = this.state.current - 1
        this.setState({ current })
    }
    render() {
        const { current, type, importResponse } = this.state
        const uploadProps = {
            name: 'excelFile',
            multiple: false,
            data: {
                type,
            },
            action:
                process.env.NODE_ENV === 'production'
                    ? '/houzai/charge/batchReadBills'
                    : '/charge/batchReadBills',
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
            <Fragment>
                <Button
                    type="primary"
                    onClick={() => {
                        this.setState({
                            modal: true,
                        })
                    }}
                >
                    批量导入
                </Button>
                <Modal
                    title="费用信息"
                    visible={this.state.modal}
                    // onOk={this.modalOk}
                    onCancel={this.modalCancel}
                    width={930}
                    footer={
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    下一步
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={this.importBills}>
                                    完成
                                </Button>
                            )}
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
                            <Radio.Group
                                value={this.state.type}
                                buttonStyle="solid"
                                style={{ margin: 20 }}
                                onChange={this.changeType}
                            >
                                <Radio.Button value="客户信息租">客户信息（租）</Radio.Button>
                                <Radio.Button value="客户信息售">客户信息（售）</Radio.Button>
                                <Radio.Button value="合同费用">合同费用</Radio.Button>
                                <Radio.Button value="能源费用">能源费用</Radio.Button>
                                <Radio.Button value="有偿服务费">有偿服务费</Radio.Button>
                                <Radio.Button value="物业费用">物业费用</Radio.Button>
                                <Radio.Button value="租金费用">租金费用</Radio.Button>
                                <Radio.Button value="其它综合费用">其它综合费用</Radio.Button>
                            </Radio.Group>
                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                    <IconFont type="iconxls" />
                                </p>
                                <p className="ant-upload-text">将文件拖拽至此区域或点击上传文件</p>
                                <p className="ant-upload-hint">导入说明：文件必须为XLS或XLSX格式</p>
                            </Dragger>
                            <div
                                style={{
                                    padding: '20px',
                                    display: 'flex',
                                }}
                            >
                                <div>没有模版？</div>
                                <div className={styles.templateList}>
                                    <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190821/3ab34526-f2c6-4515-bc58-a90cf6dfad95-客户信息模板（租）.xlsx">
                                        客户信息（租）模版下载
                                    </a>
                                    <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190821/17050185-d9c6-419d-b637-1e10d0ad2b2c-客户信息模板（售）.xlsx">
                                        客户信息（售）模版下载
                                    </a>
                                    <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190821/79674315-12f1-4915-9ef4-aca1052e90ba-合同费用模板.xlsx">
                                        合同费用版下载
                                    </a>
                                    <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190821/5d797a7e-5efb-4335-a32b-f5d875b119a1-能源费用模板 .xlsx">
                                        能源费模版下载
                                    </a>
                                    <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190821/daeccea4-dea9-452f-a8df-50f2f661ded6-有偿服务费模板 .xlsx">
                                        有偿服务费模版下载
                                    </a>
                                    <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190821/7e8fb278-ab5b-4d77-b5bd-4ce33f3eb205-物业费用模板.xlsx">
                                        物业费用模版下载
                                    </a>
                                    <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190821/4d2160d0-204a-4878-90c1-4f67acafdaee-租金费用模板.xlsx">
                                        租金费用模版下载
                                    </a>
                                    <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190821/18ffa972-e7f3-4211-9668-3575b8872e99-其它综合费用模板.xlsx">
                                        其它综合费用模版下载
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                    {current === 1 && (
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="正常数据" key="1">
                                <Table
                                    dataSource={importResponse.normalList}
                                    columns={columsMap[type]}
                                    scroll={{ x: 2300 }}
                                />
                            </TabPane>
                            <TabPane tab="异常数据" key="2">
                                <Table
                                    dataSource={importResponse.abnormalList}
                                    columns={columsMap[type]}
                                    scroll={{ x: 2300 }}
                                />
                            </TabPane>
                        </Tabs>
                    )}
                </Modal>
            </Fragment>
        )
    }
}
export default BatchImport
