import React, { PureComponent, Fragment } from 'react'
import { Button, Checkbox, Modal, Steps } from 'antd'
import { YearPicker, IconFont } from 'components'
const Step = Steps.Step
const CheckboxGroup = Checkbox.Group
const steps = [
    {
        title: '导出设置',
        content: 'First-content',
        icon: <IconFont type="icondaochu" />,
    },
    {
        title: '导出预览',
        content: 'Second-content',
        icon: <IconFont type="icondetails" />,
    },
]
export default class Export extends PureComponent {
    state = {
        current: 0,
        exportModal: false,
    }
    exportModalCancel = () => {
        this.setState({
            exportModal: false,
        })
    }
    render() {
        const { current } = this.state
        return (
            <Fragment>
                <Button
                    type="primary"
                    onClick={() => {
                        this.setState({
                            exportModal: true,
                        })
                    }}
                >
                    批量导出
                </Button>
                <Modal
                    title="导入"
                    visible={this.state.exportModal}
                    onOk={this.exportModalOk}
                    onCancel={this.exportModalCancel}
                    width={660}
                    footer={
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    下一步
                                </Button>
                            )}
                            {current === steps.length - 1 && <Button type="primary">完成</Button>}
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
                        <div>
                            <Checkbox>选择全部</Checkbox>
                            <YearPicker />
                        </div>
                    )}
                    {current === 1 && <div>table</div>}
                </Modal>
            </Fragment>
        )
    }
}
