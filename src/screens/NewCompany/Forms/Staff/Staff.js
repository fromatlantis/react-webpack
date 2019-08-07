import React, { PureComponent, Fragment } from 'react'
import { Button, Card, Divider, Modal, Input, InputNumber, Skeleton, Table, DatePicker } from 'antd'
import Toolbar from '../../Toolbar/Toolbar'
import { FormView, SearchView, YearPicker } from 'components'
import { UploadImg } from 'components'
import moment from 'moment'
import styles from './Staff.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/staff'

const mapStateToProps = state => {
    return {
        staff: state.staff.staff,
        detail: state.staff.detail,
        searchParams: state.staff.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getStaffEdusList: actions('getStaffEdusList'),
            getStaffsDetail: actions('getStaffsDetail'),
            addStaffEdu: actions('addStaffEdu'),
            updateStaffEdu: actions('updateStaffEdu'),
            delStaffEdu: actions('delStaffEdu'),
        },
        dispatch,
    )
}

const { TextArea } = Input

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Staff extends PureComponent {
    state = {
        visible: false,
        isEdit: false,
    }
    componentDidMount() {
        this.props.getStaffEdusList()
    }
    // 查询
    search = () => {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                values.pageNo = 1
                this.props.getStaffEdusList(values)
            }
        })
    }
    handleReset = () => {
        this.form.resetFields()
        this.search()
    }
    // 分页
    onChange = pageNo => {
        this.props.getStaffEdusList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getStaffEdusList({ pageNo: 1, pageSize })
    }
    // 新增
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
                const { updateStaffEdu, addStaffEdu, detail } = this.props
                if (isEdit) {
                    // 编辑
                    updateStaffEdu({ ...detail, ...values })
                } else {
                    // 新增
                    addStaffEdu(values)
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
        const suffix = <span style={{ marginLeft: '5px' }}>人</span>
        const items = [
            {
                label: '年份',
                field: 'years',
                formatter: years => moment(years),
                component: <YearPicker />,
                rules: [
                    {
                        required: true,
                        message: '请选择年份',
                    },
                ],
            },
            {
                label: '就业人数',
                field: 'employment',
                component: <InputNumber min={0} precision={0} />,
                suffix: () => suffix,
            },
            {
                label: '入选区、本市和国家相关人才计划的人员',
                field: 'talents',
                component: <InputNumber />,
                suffix: () => suffix,
            },
            {
                label: '留学生人员',
                field: 'overseasStudent',
                component: <InputNumber />,
                suffix: () => suffix,
            },
            {
                label: '博士人员',
                field: 'doctoral',
                component: <InputNumber />,
                suffix: () => suffix,
            },
            {
                label: '本科及以上学历人员',
                field: 'undergraduate',
                component: <InputNumber />,
                suffix: () => suffix,
            },
            {
                label: '大专及以上学历人员',
                field: 'juniorCollege',
                component: <InputNumber />,
                suffix: () => suffix,
            },
            {
                label: '本公司社保缴纳人员',
                field: 'socialPay',
                component: <InputNumber />,
                suffix: () => suffix,
            },
        ]
        const { isEdit } = this.state
        const { detail } = this.props
        return (
            <div style={{ width: '400px', margin: '0 auto' }}>
                <FormView
                    ref={form => {
                        this.newForm = form
                    }}
                    items={items}
                    layout="inline"
                    formItemLayout={{}}
                    data={isEdit ? detail : {}}
                    saveBtn={false}
                />
            </div>
        )
    }
    // 编辑
    edit = staffId => {
        this.props.getStaffsDetail(staffId)
        this.setState({
            visible: true,
            isEdit: true,
        })
    }
    render() {
        const searchItems = [
            {
                label: '年份',
                field: 'years',
                component: <YearPicker />,
            },
            {
                label: '更新日期',
                field: 'updateTime',
                component: <DatePicker />,
            },
        ]
        const columns = [
            {
                title: '年份',
                dataIndex: 'years',
                key: 'years',
                width: 80,
            },
            {
                title: '就业人员',
                dataIndex: 'employment',
                key: 'employment',
            },
            {
                title: '博士',
                dataIndex: 'doctoral',
                key: 'doctoral',
            },
            {
                title: '入选区、本市和国家相关人才计划的人员',
                dataIndex: 'talents',
                key: 'talents',
                width: 120,
            },
            {
                title: '留学生人员',
                dataIndex: 'overseasStudent',
                key: 'overseasStudent',
            },
            {
                title: '本科及以上学历人员',
                dataIndex: 'undergraduate',
                key: 'undergraduate',
                width: 110,
            },
            {
                title: '大专及以上学历人员',
                dataIndex: 'juniorCollege',
                key: 'juniorCollege',
                width: 110,
            },
            {
                title: '本公司社保缴纳人员',
                dataIndex: 'socialPay',
                key: 'socialPay',
                width: 110,
            },
            {
                title: '更新日期',
                dataIndex: 'updateTime',
                key: 'updateTime',
                width: 130,
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                width: 100,
                align: 'center',
                render: (_, record) => (
                    <Fragment>
                        <Button
                            type="link"
                            onClick={() => {
                                this.edit(record.staffId)
                            }}
                        >
                            编辑
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                this.props.delStaffEdu({ staffId: record.staffId })
                            }}
                        >
                            删除
                        </Button>
                    </Fragment>
                ),
            },
        ]
        const { staff, searchParams } = this.props
        return (
            <Card title="人员情况" bordered={false} extra={<Toolbar />}>
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

                <Skeleton loading={staff.list ? false : true} active avatar>
                    <Table
                        bordered
                        dataSource={staff.list}
                        columns={columns}
                        pagination={{
                            current: searchParams.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: staff.totalCount,
                            onShowSizeChange: this.onShowSizeChange,
                            onChange: this.onChange,
                        }}
                    />
                </Skeleton>
                <Modal
                    title="人员情况"
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
export default Staff
