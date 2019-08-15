import React, { PureComponent } from 'react'
import { Avatar, Button, Card, Divider, Modal, Input, Skeleton, Table, Select } from 'antd'
import Toolbar from '../../Toolbar/Toolbar'
import { FormView, SearchView } from 'components'
import { UploadImg } from 'components'
import styles from '../index.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/members'
const { Option } = Select
const mapStateToProps = state => {
    return {
        team: state.members.team,
        detail: state.members.detail,
        searchParams: state.members.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getCoreTeamList: actions('getCoreTeamList'),
            queryCoreTeamDetail: actions('queryCoreTeamDetail'),
            increaseCoreTeam: actions('increaseCoreTeam'),
            changeCoreTeam: actions('changeCoreTeam'),
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
                const { changeCoreTeam, increaseCoreTeam, detail } = this.props
                if (isEdit) {
                    // 编辑
                    changeCoreTeam({ ...detail, ...values })
                } else {
                    // 新增
                    increaseCoreTeam(values)
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
                component: <UploadImg />,
                rules: [
                    {
                        required: true,
                        message: '请上传头像',
                    },
                ],
            },
            {
                label: '姓名',
                field: 'name',
                component: <Input />,
                rules: [
                    {
                        required: true,
                        message: '请填写姓名',
                    },
                ],
            },
            {
                label: '职务',
                field: 'title',
                component: <Input />,
                rules: [
                    {
                        required: true,
                        message: '请填写职务',
                    },
                ],
            },
            {
                label: '介绍',
                field: 'description',
                component: <TextArea autosize={{ minRows: 5 }} />,
            },
            {
                label: '学历',
                field: 'education',
                initialValue: '博士',
                component: (
                    <Select>
                        <Option value="博士">博士</Option>
                        <Option value="入选区、本市和国家相关人才计划的人员">
                            入选区、本市和国家相关人才计划的人员
                        </Option>
                        <Option value="留学生">留学生</Option>
                        <Option value="本科及以上学历">本科及以上学历</Option>
                        <Option value="大专及以上学历">大专及以上学历</Option>
                    </Select>
                ),
            },
            {
                label: '职称',
                field: 'jobTitle',
                initialValue: '初级职称',
                component: (
                    <Select>
                        <Option value="初级职称">初级职称</Option>
                        <Option value="中级职称">中级职称</Option>
                        <Option value="高级职称">高级职称</Option>
                    </Select>
                ),
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        const { isEdit } = this.state
        const { detail } = this.props
        return (
            <FormView
                ref={form => {
                    this.newForm = form
                }}
                items={items}
                formItemLayout={formItemLayout}
                data={isEdit ? detail : {}}
                saveBtn={false}
            />
        )
    }
    // 查询
    search = () => {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                values.pageNo = 1
                this.props.getCoreTeamList(values)
            }
        })
    }
    handleReset = () => {
        this.form.resetFields()
        this.search()
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
        const columns = [
            {
                title: '形象照片',
                dataIndex: 'icon',
                key: 'icon',
                align: 'center',
                width: 150,
                render: icon => <Avatar src={icon} size={120} />,
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 100,
            },
            {
                title: '职务',
                dataIndex: 'title',
                key: 'title',
                width: 100,
            },
            {
                title: '学历',
                dataIndex: 'education',
                key: 'education',
                width: 100,
            },
            {
                title: '职称',
                dataIndex: 'jobTitle',
                key: 'jobTitle',
                width: 100,
            },
            {
                title: '介绍',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                width: 100,
                align: 'center',
                render: (_, record) => (
                    <Button
                        type="link"
                        onClick={() => {
                            this.edit(record.keyId)
                        }}
                    >
                        编辑
                    </Button>
                ),
            },
        ]
        const { team, searchParams } = this.props
        return (
            <div className={styles.contianer} style={{ background: 'rgba(240,242,245,1)' }}>
                <div className={styles.titleSty}>
                    <div className={styles.titleName}>核心人员</div>
                    <Toolbar />
                </div>
                <div className={styles.searchBox}>
                    <FormView
                        ref={form => {
                            this.form = form
                        }}
                        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }}
                        items={searchItems}
                        data={searchParams}
                        layout="inline"
                        saveBtn={false}
                    />
                    <div className={styles.toobar}>
                        <Button type="ghost" onClick={this.handleReset}>
                            清除
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            type="primary"
                            onClick={this.search}
                            style={{ background: 'rgb(50,200,100)' }}
                        >
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newInfo}>
                            新增
                        </Button>
                    </div>
                </div>
                <div className={styles.tableSty}>
                    <Skeleton loading={team.list ? false : true} active avatar>
                        <Table
                            dataSource={team.list}
                            columns={columns}
                            pagination={{
                                current: searchParams.pageNo,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                pageSizeOptions: ['10', '15', '20'],
                                total: team.totalCount,
                                onShowSizeChange: this.onShowSizeChange,
                                onChange: this.onChange,
                            }}
                        />
                    </Skeleton>
                </div>
                <Modal
                    title="核心人员"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    //footer={null}
                >
                    {this.renderNewForm()}
                </Modal>
            </div>
        )
    }
}
export default Members
