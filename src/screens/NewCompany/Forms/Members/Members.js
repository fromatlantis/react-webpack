import React, { PureComponent } from 'react'
import { Button, Card, Divider, Modal, Input, Skeleton } from 'antd'

import FormView, { SearchView } from '../FormView2'
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
        detail: state.members.detail,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getCoreTeamList: actions('getCoreTeamList'),
            queryCoreTeamDetail: actions('queryCoreTeamDetail'),
            increaseCoreTeamApprove: actions('increaseCoreTeamApprove'),
            changeCoreTeamApprove: actions('changeCoreTeamApprove'),
        },
        dispatch,
    )
}

const { TextArea } = Input

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Members extends PureComponent {
    state = {
        visible: false,
        isEdit: false,
    }
    componentDidMount() {
        this.props.getCoreTeamList()
    }

    newInfo = () => {
        this.setState({
            visible: true,
            isEdit: false,
        })
    }
    handleOk = () => {
        this.newForm.validateFields((errors, values) => {
            if (!errors) {
                const { isEdit } = this.state
                const { changeCoreTeamApprove, increaseCoreTeamApprove, detail } = this.props
                if (isEdit) {
                    // 编辑
                    changeCoreTeamApprove({ ...detail, ...values })
                } else {
                    // 新增
                    increaseCoreTeamApprove(values)
                }
                this.setState({
                    visible: false,
                })
            }
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
                field: 'icon',
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
                field: 'title',
                component: <Input />,
            },
            {
                label: '介绍',
                field: 'description',
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
                    this.newForm = form
                }}
                items={items}
                formItemLayout={formItemLayout}
                //layout="inline"
                saveBtn={false}
            />
        )
    }
    // 查询
    search = () => {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                this.props.getCoreTeamList(values)
            }
        })
    }
    handleReset = () => {
        this.form.resetFields()
    }
    // 分页
    onChange = pageNo => {
        this.props.getCoreTeamList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getCoreTeamList({ pageNo: 1, pageSize })
    }
    // 编辑
    edit = keyId => {
        this.props.queryCoreTeamDetail(keyId)
        this.setState({
            visible: true,
            isEdit: true,
        })
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
                    <SearchView
                        ref={form => {
                            this.form = form
                        }}
                        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }}
                        items={searchItems}
                        layout="inline"
                        saveBtn={false}
                    />
                    <div className={styles.toobar}>
                        <Button type="ghost" onClick={this.handleReset}>
                            清除
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newInfo}>
                            新增
                        </Button>
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
