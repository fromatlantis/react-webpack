import React, { PureComponent } from 'react'
import { Button, Card, Divider, Modal, Input, Skeleton, Table } from 'antd'
import Toolbar from '../../Toolbar/Toolbar'
import { FormView, SearchView } from 'components'
import { UploadImg } from 'components'
import styles from './Revenue.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/members'

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
class Revenue extends PureComponent {
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
                component: <TextArea autosize={{ minRows: 5 }} />,
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
                label: '年份',
                field: 'name',
                component: <Input />,
            },
            {
                label: '更新日期',
                field: 'title',
                component: <Input />,
            },
        ]
        const columns = [
            {
                title: '形象照片',
                dataIndex: 'icon',
                key: 'icon',
                width: 150,
                render: icon => <img src={icon} alt="" style={{ width: '120px' }} />,
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
            <Card title="财务信息" bordered={false} extra={<Toolbar />}>
                <div className={styles.searchBox}>
                    <FormView
                        ref={form => {
                            this.form = form
                        }}
                        formItemLayout={{}}
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

                <Skeleton loading={team.list ? false : true} active avatar>
                    <Table
                        bordered
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
                <Modal
                    title="财务信息"
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
export default Revenue
