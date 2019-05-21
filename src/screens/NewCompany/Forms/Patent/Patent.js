import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker, Divider, Tooltip } from 'antd'
import moment from 'moment'
import { FormView, SearchView } from 'components'
import styles from '../index.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/patent'

const dateStr = 'YYYY.MM.DD'
const mapStateToProps = state => {
    return {
        patent: state.patent.patent,
        detail: state.patent.detail,
        searchParams: state.patent.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getPatentList: actions('getPatentList'),
            queryPatentDetail: actions('queryPatentDetail'),
            increasePatentApprove: actions('increasePatentApprove'),
            changePatentApprove: actions('changePatentApprove'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Patent extends PureComponent {
    state = {
        visible: false,
        isEdit: false,
    }
    componentDidMount = () => {
        const companyId = sessionStorage.getItem('companyId')
        if (companyId) {
            this.props.getPatentList()
        }
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
                const { changePatentApprove, increasePatentApprove, detail } = this.props
                if (values.applicationTime) {
                    values.applicationTime = moment(values.applicationTime).format(dateStr)
                }
                if (isEdit) {
                    // 编辑
                    changePatentApprove({ ...detail, ...values })
                } else {
                    // 新增
                    increasePatentApprove(values)
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
    renderForm = type => {
        const items = [
            {
                label: '专利名称',
                field: 'patentName',
                component: <Input />,
            },
            {
                label: '申请号',
                field: 'appnumber',
                component: <Input />,
            },
            {
                label: '申请日期',
                field: 'applicationTime',
                component: <DatePicker />,
            },
            {
                label: '专利发明人',
                field: 'inventor',
                component: <Input />,
            },
            {
                label: '专利申请人',
                field: 'applicantName',
                component: <Input />,
            },
            {
                label: '专利类型',
                field: 'patentType',
                component: <Input />,
            },
            {
                label: '专利代理机构',
                field: 'agency',
                component: <Input />,
            },
            {
                label: '公开号',
                field: 'pubnumber',
                component: <Input />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        }
        return (
            <SearchView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={formItemLayout}
                layout="inline"
                items={items}
                saveBtn={false}
            />
        )
    }
    renderNewForm = type => {
        const items = [
            {
                label: '专利名称',
                field: 'patentName',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '申请号',
                field: 'appnumber',
                component: <Input />,
            },
            {
                label: '申请日期',
                field: 'applicationTime',
                component: <DatePicker />,
            },
            {
                label: '专利发明人',
                field: 'inventor',
                component: <Input />,
            },
            {
                label: '专利申请人',
                field: 'applicantName',
                component: <Input />,
            },
            {
                label: '专利类型',
                field: 'patentType',
                component: <Input />,
            },
            {
                label: '专利代理机构',
                field: 'agency',
                component: <Input />,
            },
            {
                label: '公开号',
                field: 'pubnumber',
                component: <Input />,
            },
            {
                label: '专利说明',
                field: 'abstracts',
                style: { width: '90%', marginTop: '5px' },
                component: <Input.TextArea autosize={{ minRows: 3, maxRows: 6 }} />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        const { detail } = this.props
        const { isEdit } = this.state
        // 时间处理
        detail.applicationTime = moment(detail.applicationTime, dateStr)
        return (
            <FormView
                ref={form => {
                    this.newForm = form
                }}
                formItemLayout={formItemLayout}
                layout="inline"
                items={items}
                data={isEdit ? detail : {}}
                saveBtn={false}
            />
        )
    }
    // 编辑
    edit = keyId => {
        this.props.queryPatentDetail(keyId)
        this.setState({
            visible: true,
            isEdit: true,
        })
    }
    // 查询
    search = () => {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                if (values.applicationTime) {
                    values.applicationTime = moment(values.applicationTime).format(dateStr)
                }
                this.props.getPatentList(values)
            }
        })
    }
    handleReset = () => {
        this.form.resetFields()
    }
    // 分页
    onChange = pageNo => {
        this.props.getPatentList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getPatentList({ pageNo: 1, pageSize })
    }
    render() {
        const columns = [
            {
                title: '专利名称',
                dataIndex: 'patentName',
                key: 'patentName',
                fixed: 'left',
                width: 200,
            },
            {
                title: '申请号',
                dataIndex: 'appnumber',
                key: 'appnumber',
                width: '10%',
            },
            {
                title: '申请日期',
                dataIndex: 'applicationTime',
                key: 'applicationTime',
                width: '10%',
            },
            // {
            //     title: '授权日期',
            //     dataIndex: 'expire',
            //     key: 'expire',
            // },
            {
                title: '专利发明人',
                dataIndex: 'inventor',
                key: 'inventor',
                width: '10%',
            },
            {
                title: '专利申请人',
                dataIndex: 'applicantName',
                key: 'applicantName',
                width: '10%',
            },
            {
                title: '专利类型',
                dataIndex: 'patentType',
                key: 'patentType',
                width: '10%',
            },
            {
                title: '专利代理结构',
                dataIndex: 'agency',
                key: 'agency',
                width: '10%',
            },
            {
                title: '公开号',
                dataIndex: 'pubnumber',
                key: 'pubnumber',
                width: '10%',
            },
            // {
            //     title: '法律状态',
            //     dataIndex: 'status',
            //     key: 'status',
            // },
            {
                title: '专利说明',
                dataIndex: 'abstracts',
                key: 'abstracts',
                //width: '15%',
                render: abstracts => {
                    return (
                        <Tooltip placement="left" title={abstracts}>
                            <span>{abstracts.substring(0, 26)}...</span>
                        </Tooltip>
                    )
                },
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                fixed: 'right',
                width: 100,
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
        const { patent, searchParams } = this.props
        return (
            <Card title="专利信息" style={{ width: 'calc(100vw - 256px)' }} bordered={false}>
                <div className={styles.searchCard}>
                    {this.renderForm('search')}
                    <div style={{ marginTop: '10px', textAlign: 'right' }}>
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
                <Table
                    style={{ width: '100%' }}
                    bordered
                    dataSource={patent.list}
                    columns={columns}
                    scroll={{ x: 2000 }}
                    pagination={{
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '15', '20'],
                        total: patent.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onChange,
                    }}
                />
                <Modal
                    title="专利信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                    className={styles.newFormInline}
                >
                    {this.renderNewForm()}
                </Modal>
            </Card>
        )
    }
}
export default Patent
