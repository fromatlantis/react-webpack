import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker, Divider } from 'antd'
import moment from 'moment'
import { FormView, SearchView } from 'components'
import styles from '../index.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/event'

const dateStr = 'x' //毫秒
const mapStateToProps = state => {
    return {
        event: state.event.event,
        detail: state.event.detail,
        searchParams: state.event.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getInvestmentEventList: actions('getInvestmentEventList'),
            queryInvestmentEventDetial: actions('queryInvestmentEventDetial'),
            increaseInvestmentEventApprove: actions('increaseInvestmentEventApprove'),
            changeInvestmentEventApprove: actions('changeInvestmentEventApprove'),
        },
        dispatch,
    )
}

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Event extends PureComponent {
    state = {
        visible: false,
    }
    componentDidMount = () => {
        this.props.getInvestmentEventList()
    }
    newInfo = () => {
        this.setState({
            visible: true,
        })
    }
    handleOk = () => {
        this.newForm.validateFields((errors, values) => {
            if (!errors) {
                console.log(values)
                this.props.increaseInvestmentEventApprove(values)
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
                label: '投资公司名称',
                field: 'organizationName',
                component: <Input />,
            },
            {
                label: '业务范围',
                field: 'yewu',
                component: <Input />,
            },
            {
                label: '投资数额',
                field: 'money',
                component: <Input />,
            },
            {
                label: '投资时间',
                field: 'tzdate',
                component: <DatePicker />,
            },
            {
                label: '轮次',
                field: 'lunci',
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
                items={items}
                formItemLayout={formItemLayout}
                layout="inline"
                saveBtn={false}
            />
        )
    }
    renderNewForm = type => {
        const items = [
            {
                label: '投资公司名称',
                field: 'organizationName',
                component: <Input />,
            },
            {
                label: '业务范围',
                field: 'yewu',
                component: <Input />,
            },
            {
                label: '投资数额',
                field: 'money',
                component: <Input />,
            },
            {
                label: '投资时间',
                field: 'tzdate',
                component: <DatePicker />,
            },
            {
                label: '轮次',
                field: 'lunci',
                component: <Input />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        }
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
                if (values.tzdate) {
                    // 先转换为日期再格式化
                    values.tzdate = moment(values.tzdate.format('YYYY-MM-DD')).format(dateStr)
                }
                this.props.getInvestmentAbroadList(values)
            }
        })
    }
    handleReset = () => {
        this.form.resetFields()
    }
    // 分页
    onChange = pageNo => {
        this.props.getInvestmentAbroadList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getInvestmentAbroadList({ pageNo: 1, pageSize })
    }
    // 编辑
    edit = keyId => {
        this.props.queryInvestmentAbroadDetial(keyId)
        this.setState({
            visible: true,
            isEdit: true,
        })
    }
    render() {
        const columns = [
            {
                title: '投资公司名称',
                dataIndex: 'organizationName',
                key: 'organizationName',
            },
            {
                title: '业务范围',
                dataIndex: 'yewu',
                key: 'yewu',
            },
            {
                title: '投资数额',
                dataIndex: 'money',
                key: 'money',
            },
            {
                title: '投资时间',
                dataIndex: 'tzdate',
                key: 'tzdate',
            },
            {
                title: '轮次',
                dataIndex: 'lunci',
                key: 'lunci',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
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
        const { event, searchParams } = this.props
        return (
            <Card title="投资事件" bordered={false}>
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
                    bordered
                    dataSource={event.list}
                    columns={columns}
                    pagination={{
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '15', '20'],
                        total: event.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onChange,
                    }}
                />
                <Modal
                    title="投资事件"
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
export default Event
