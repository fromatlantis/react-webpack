import React, { PureComponent } from 'react'
import { Button, Card, Divider, Modal, Input, Skeleton } from 'antd'

import FormView from '../FormView2'
import { UploadImg } from 'components'

import styles from './Members.module.css'
import avatar from 'assets/avatar.png'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/members'

const mapStateToProps = state => {
    return {
        team: state.members.team,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getCoreTeamList: actions('getCoreTeamList'),
        },
        dispatch,
    )
}

const { TextArea } = Input
const dataSource = [
    {
        key: '1',
        avatar: avatar,
        name: '马云',
        duty: '董事会主席',
        intro:
            '1988年毕业于杭州师范学院外语系，同年担任杭州电子工业学院英文及国际贸易教师，1995年创办中国第一家互联网商业信息发布网站“中国黄页”，1998年出任中国国际电子商务中心国富通信息技术发展有限公司总经理，1999年创办阿里巴巴，并担任阿里集团CEO、董事局主席。',
    },
    {
        key: '2',
        avatar: avatar,
        name: '马化腾',
        duty: '腾讯科技创始人',
        intro:
            '2017年8月7日，腾讯股价盘中再创历史新高价320.6港元，马化腾身家361亿美元成为中国首富。 [3]  2018年4月，获《时代周刊》2018年全球最具影响力人物荣誉。 [4]  2018年10月25日，2019年3月，马化腾以388亿美元财富排名2019年福布斯全球亿万富豪榜第20位。',
    },
]

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Members extends PureComponent {
    state = {
        visible: false,
    }
    componentDidMount() {
        this.props.getCoreTeamList({
            companyId: sessionStorage.getItem('companyId'),
            pageNo: 1,
            pageSize: 10,
        })
    }

    newInfo = () => {
        this.setState({
            visible: true,
        })
    }
    handleOk = () => {
        this.form.validateFields((errors, values) => {
            console.log(values)
        })
        this.setState({
            visible: false,
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    renderNewForm = () => {
        const items = [
            {
                label: '形象照片',
                field: 'avatar',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <UploadImg />,
            },
            {
                label: '姓名',
                field: 'name',
                component: <Input />,
            },
            {
                label: '职务',
                field: 'duty',
                component: <Input />,
            },
            {
                label: '介绍',
                field: 'person',
                component: <TextArea />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        //const FormView = formView({ items, data: {} })
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                items={items}
                formItemLayout={formItemLayout}
                //layout="inline"
                saveBtn={false}
            />
        )
    }
    render() {
        const { team } = this.props
        const searchItems = [
            {
                label: '姓名',
                field: 'name',
                component: <Input />,
            },
            {
                label: '职务',
                field: 'title',
                component: <Input />,
            },
        ]
        return (
            <Card
                title="核心人员"
                bordered={false}
                extra={
                    <Button type="primary" onClick={this.newInfo}>
                        新增
                    </Button>
                }
            >
                <div className={styles.searchBox}>
                    <FormView
                        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }}
                        items={searchItems}
                        layout="inline"
                        saveBtn={false}
                    />
                    <div className={styles.toobar}>
                        <Button type="ghost">清除</Button>
                        <Divider type="vertical" />
                        <Button type="primary">查询</Button>
                        <Divider type="vertical" />
                        <Button type="primary">新增</Button>
                    </div>
                </div>

                <Skeleton loading={team.list ? false : true} active avatar>
                    {(team.list || []).map(item => {
                        return (
                            <div className={styles.card} key={item.key}>
                                <img src={item.icon} alt="" />
                                <div className={styles.base}>
                                    <p>
                                        <b>姓名：</b>
                                        {item.name}
                                    </p>
                                    <p>
                                        <b>职务：</b>
                                        {item.title}
                                    </p>
                                </div>
                                <div className={styles.intro}>{item.intro}</div>
                                <div>
                                    <Button size="small" type="link">
                                        编辑
                                    </Button>
                                    <Divider type="vertical" />
                                    <Button size="small" type="link">
                                        删除
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </Skeleton>
                <Modal
                    title="核心人员"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    //footer={null}
                >
                    {this.renderNewForm()}
                </Modal>
            </Card>
        )
    }
}
export default Members
