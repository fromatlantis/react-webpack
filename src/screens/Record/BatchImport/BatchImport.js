import React, { PureComponent, Fragment } from 'react'
import { Button, Upload, Modal, Steps, Alert, Tabs, Table, message } from 'antd'
import { IconFont } from 'components'
import styles from './BatchImport.module.css'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/records'
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

const columns = [
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
        title: '账单编号',
        dataIndex: 'billNo',
        key: 'billNo',
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
        dataIndex: 'receiveDates',
        key: 'receiveDates',
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
    {
        title: '收款所属期',
        dataIndex: 'realReceiveDate',
        key: 'realReceiveDate',
    },
    {
        title: '收款日期',
        dataIndex: 'receiveDate',
        key: 'receiveDate',
    },
    {
        title: '实收金额（元）',
        dataIndex: 'realAmount',
        key: 'realAmount',
    },
    {
        title: '凭证',
        dataIndex: 'license',
        key: 'license',
    },
    {
        title: '未收余额（元）',
        dataIndex: 'restAmount',
        key: 'restAmount',
    },
]

@connect(
    state => ({}),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                operateBatchLoadCharges: actions('operateBatchLoadCharges'),
            },
            dispatch,
        )
    },
)
class BatchImport extends PureComponent {
    state = {
        current: 0,
        modal: false,
        importResponse: {},
    }
    importBills = () => {
        const {
            importResponse: { normalList },
        } = this.state
        if (normalList.length > 0) {
            this.props.operateBatchLoadCharges({
                dataJson: JSON.stringify(normalList),
            })
            this.setState({
                modal: false,
            })
        }
    }
    modalCancel = () => {
        this.setState({
            modal: false,
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
        const { current, importResponse } = this.state
        const uploadProps = {
            name: 'chargeFile',
            multiple: false,
            action:
                process.env.NODE_ENV === 'production'
                    ? '/houzai/charge/batchImportCharge'
                    : '/charge/batchImportCharge',
            onChange: info => {
                const status = info.file.status
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList)
                }
                if (status === 'done') {
                    const { response } = info.file
                    if (response.code === 1000) {
                        message.success(`${info.file.name}上传成功`)
                        this.setState({
                            importResponse: response.data,
                        })
                    } else {
                        message.error(response.message)
                    }
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
                                    <a href="https://houzai-prod-1257833666.cos.ap-beijing.myqcloud.com/20190821/c5337927-27fc-4d52-acba-a0dcdd647b58-费用信息模板.xlsx">
                                        费用信息模板下载
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                    {current === 1 && (
                        <Fragment>
                            <Alert
                                message={`共 ${parseInt(importResponse.normalList) +
                                    parseInt(importResponse.abnormalList)} 项，正常数据 ${
                                    importResponse.normalList
                                } 项，异常数据 ${importResponse.abnormalList} 项`}
                            />
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="正常数据" key="1">
                                    <Table
                                        dataSource={importResponse.normalList}
                                        columns={columns}
                                        defaultPageSize={5}
                                        scroll={{ x: 2300 }}
                                    />
                                </TabPane>
                                <TabPane tab="异常数据" key="2">
                                    <Table
                                        dataSource={importResponse.abnormalList}
                                        defaultPageSize={5}
                                        columns={[
                                            ...columns,
                                            {
                                                title: '异常原因',
                                                dataIndex: 'reason',
                                                key: 'reason',
                                            },
                                        ]}
                                        scroll={{ x: 2300 }}
                                    />
                                </TabPane>
                            </Tabs>
                        </Fragment>
                    )}
                </Modal>
            </Fragment>
        )
    }
}
export default BatchImport
