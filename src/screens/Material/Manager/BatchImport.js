/**
 * 物料管理 ==> 物料管理/批量导入
 */
import React, { PureComponent } from 'react'
import {
    Form,
    Button,
    Modal,
    Avatar,
    Alert,
    Input,
    Select,
    Tag,
    Divider,
    Steps,
    message,
    Upload,
    Pagination,
} from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { FormView, UploadImg } from 'components'

import { IconFont } from 'components'
import ImportTable from './ImportTable'
import styles from '../Material.module.css'

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

@connect(
    state => {
        return {}
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                addMaterial: actions('addMaterial'),
                readModelFile: actions('readModelFile'),
            },
            dispatch,
        )
    },
)
class BatchImport extends PureComponent {
    state = {
        // “新增”的对话框-参数
        visible: false,
        current: 0,
        importResponse: [],
    }
    //daoru
    importList = () => {
        this.setState({
            importList: true,
        })
    }
    importListOk = () => {
        this.setState({
            importList: false,
        })
    }
    importListCancel = () => {
        this.setState({
            importList: false,
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

    render() {
        const uploadProps = {
            name: 'excelFile',
            multiple: false,
            action: '/houzai/property/readModelFile',
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
        let { current, importResponse } = this.state
        return (
            <div>
                <Button type="primary" onClick={this.importList}>
                    批量导入
                </Button>
                <Modal
                    title="批量导入"
                    visible={this.state.importList}
                    onOk={this.importListOk}
                    onCancel={this.importListCancel}
                    width={660}
                    footer={
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    下一步
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            importList: false,
                                        })
                                        this.props.readModelFile(importResponse)
                                    }}
                                >
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
                            <div style={{ padding: '20px', textAlign: 'right' }}>
                                没有模版？<a href="">下载模版</a>
                            </div>
                        </div>
                    )}
                    {current === 1 && (
                        <div className={styles.stepCard}>
                            <ImportTable dataSource={importResponse} />
                        </div>
                    )}
                </Modal>
            </div>
        )
    }
}
export default Form.create()(BatchImport)
