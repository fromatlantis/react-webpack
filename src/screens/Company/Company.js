import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

import { Alert, Button, Input, List, Tag, Modal, Divider, Steps, message } from 'antd'
import { IconFont } from 'components'
import TransferView from './TransferView'
import styles from './Company.module.css'

import avatar from 'assets/hz.png'

const Search = Input.Search
const Step = Steps.Step

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
]
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

@connect(
    state => ({}),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
            },
            dispatch,
        )
    },
)
class Home extends PureComponent {
    state = {
        batchAssign: false,
        assign: false,
        importList: false,
        current: 0,
    }
    batchAssign = () => {
        this.setState({
            batchAssign: true,
        })
    }
    batchAssignOk = () => {
        this.setState({
            batchAssign: false,
        })
    }
    batchAssignCancel = () => {
        this.setState({
            batchAssign: false,
        })
    }
    assign = () => {
        this.setState({
            assign: true,
        })
    }
    assignOk = () => {
        this.setState({
            assign: false,
        })
    }
    assignCancel = () => {
        this.setState({
            assign: false,
        })
    }
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
    renderItem = () => {
        return (
            <div className={styles.itemCard}>
                <img src={avatar} alt="logo" />
                <div className={styles.intro}>
                    <div className={styles.title}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>润江物业服务有限公司</span>
                            <Tag color="orange">实驻企业</Tag>
                        </div>
                        <div className={styles.toobar}>
                            <a href>
                                <IconFont type="iconicon_zhipai" onClick={this.assign} />
                            </a>
                            <Link to={`/companyDetails/information`}>
                                <IconFont type="icondetails" />
                            </Link>
                            <Link to={`/newCompany/info`}>
                                <IconFont type="iconbianji" />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div>
                            <p>
                                <b>法人：</b>
                                <span>婉如</span>
                            </p>
                            <p>
                                <b>邮箱：</b>
                                <span>123456@qq.com</span>
                            </p>
                            <p>
                                <b>公司类型：</b>
                                <span>123456@qq.com</span>
                            </p>
                            <p>
                                <b>企服负责人：</b>
                                <span>王权富贵</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>注册资本：</b>
                                <span>5000万元人民币</span>
                            </p>
                            <p>
                                <b>电话：</b>
                                <span>010-123456</span>
                            </p>
                            <p>
                                <b>所属行业：</b>
                                <span>123456@qq.com</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>成立时间：</b>
                                <span>2019-10-23</span>
                            </p>
                            <p>
                                <b>官网：</b>
                                <a href="http://www.hzpark.com">http://www.hzpark.com</a>
                            </p>
                            <p>
                                <b>企业地址：</b>
                                <span>123456@qq.com</span>
                            </p>
                        </div>
                        <ul className={styles.status}>
                            <Tag color="green">在线</Tag>
                            <Tag color="volcano">已指派</Tag>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        let { current } = this.state
        return (
            <div className={styles.root}>
                <div className={styles.searchBox}>
                    <Search
                        placeholder="请输入企业名称"
                        onSearch={value => console.log(value)}
                        enterButton
                        size="large"
                    />
                </div>
                <div className={styles.titleChip}>
                    <Alert message="总计25个企业" type="info" showIcon />
                    <div className={styles.toolbar}>
                        <Button onClick={this.batchAssign}>批量指派</Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.props.push('newCompany/info')
                            }}
                        >
                            新增
                        </Button>
                        <Button onClick={this.importList}>导入</Button>
                    </div>
                </div>
                <List dataSource={data} renderItem={this.renderItem} />
                <Modal
                    title="批量指派企服人员"
                    visible={this.state.batchAssign}
                    onOk={this.batchAssignOk}
                    onCancel={this.batchAssignCancel}
                    //footer={null}
                >
                    <TransferView titles={['选择企业', '已选企业']} />
                    <Divider dashed />
                    <TransferView titles={['选择人员', '已选人员']} />
                </Modal>
                <Modal
                    title="指派企服人员"
                    visible={this.state.assign}
                    onOk={this.assignOk}
                    onCancel={this.assignCancel}
                    //footer={null}
                >
                    <TransferView titles={['选择人员', '已选人员']} />
                </Modal>
                <Modal
                    title="导入"
                    visible={this.state.importList}
                    onOk={this.importListOk}
                    onCancel={this.importListCancel}
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
                                    onClick={() => message.success('Processing complete!')}
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
                    <div className={styles.stepCard}>{steps[current].content}</div>
                </Modal>
            </div>
        )
    }
}
export default Home
