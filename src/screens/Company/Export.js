import React, { PureComponent, Fragment } from 'react'
import { Button, Checkbox, Modal, Steps, Table } from 'antd'
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
const revenueChks = [
    {
        label: '营业收入',
        value: '1',
    },
    {
        label: '出口总额',
        value: '2',
    },
    {
        label: '专利产品年产值',
        value: '3',
    },
    {
        label: '研发费用',
        value: '4',
    },
    {
        label: '上缴税金',
        value: '5',
    },
    {
        label: '利润总额',
        value: '6',
    },
    {
        label: '净利润',
        value: '7',
    },
]
const personChks = [
    {
        label: '就业人员数',
        value: '11',
    },
    {
        label: '博士人数',
        value: '22',
    },
    {
        label: '留学生人数',
        value: '33',
    },
    {
        label: '本科及以上学历人数',
        value: '44',
    },
    {
        label: '大专及以上学历人数',
        value: '55',
    },
    {
        label: '本公司社保缴纳人员',
        value: '66',
    },
]
const copyrightChks = [
    {
        label: '有效知识产权数',
        value: '111',
    },
    {
        label: '软件著作数',
        value: '222',
    },
    {
        label: '有效专利数',
        value: '333',
    },
    {
        label: '发明专利数',
        value: '444',
    },
    {
        label: '集成电路布图数',
        value: '555',
    },
    {
        label: '当年新申请知识产权数',
        value: '666',
    },
    {
        label: '当年新授权专利数',
        value: '777',
    },
    {
        label: '商标数',
        value: '888',
    },
    {
        label: '技术合同交易数',
        value: '999',
    },
    {
        label: '技术合同交易额',
        value: '1000',
    },
]
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
]

export default class Export extends PureComponent {
    state = {
        current: 0,
        exportModal: false,
        checkedList: [],
        indeterminate: false,
        checkAll: false,
    }
    exportModalCancel = () => {
        this.setState({
            exportModal: false,
        })
    }
    onCheckAllChange = e => {
        const chks = [...revenueChks, ...personChks, ...copyrightChks].map(item => item.value)
        this.setState({
            checkedList: e.target.checked ? chks : [],
            checkAll: !this.state.checkAll,
            indeterminate: false,
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
        const { current } = this.state
        const { title } = this.props
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
                    {title}
                </Button>
                <Modal
                    title={title}
                    visible={this.state.exportModal}
                    onOk={this.exportModalOk}
                    onCancel={this.exportModalCancel}
                    width={930}
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
                        <div style={{ marginTop: '10px' }}>
                            <Checkbox
                                style={{ marginRight: '10px' }}
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >
                                选择全部
                            </Checkbox>
                            <YearPicker />
                            <Checkbox.Group value={this.state.checkedList} onChange={this.onChange}>
                                <p style={{ margin: '6px 0' }}>
                                    <b>营收类：</b>
                                </p>
                                <div style={{ marginLeft: '50px', display: 'flex' }}>
                                    {revenueChks.map(item => (
                                        <div style={{ margin: '5px' }}>
                                            <Checkbox value={item.value}>{item.label}</Checkbox>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ margin: '6px 0' }}>
                                    <b>人员类：</b>
                                </p>
                                <div
                                    style={{
                                        marginLeft: '50px',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {personChks.map(item => (
                                        <div style={{ margin: '5px' }}>
                                            <Checkbox value={item.value}>{item.label}</Checkbox>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ margin: '6px 0' }}>
                                    <b>知识产权类：</b>
                                </p>
                                <div
                                    style={{
                                        marginLeft: '50px',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {copyrightChks.map(item => (
                                        <div style={{ margin: '5px' }}>
                                            <Checkbox value={item.value}>{item.label}</Checkbox>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ margin: '6px 0' }}>
                                    <b>资质类：</b>
                                </p>
                                <div
                                    style={{
                                        marginLeft: '50px',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {copyrightChks.map(item => (
                                        <div style={{ margin: '5px' }}>
                                            <Checkbox value={item.value}>{item.label}</Checkbox>
                                        </div>
                                    ))}
                                </div>
                            </Checkbox.Group>
                        </div>
                    )}
                    {current === 1 && <Table dataSource={dataSource} columns={columns} />}
                </Modal>
            </Fragment>
        )
    }
}
