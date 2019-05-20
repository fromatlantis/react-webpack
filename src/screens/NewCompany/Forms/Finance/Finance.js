import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker } from 'antd'
import moment from 'moment'
import FormView from '../FormView2'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/finance'

const mapStateToProps = state => {
    return {
        finance: state.finance.finance,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFinancingList: actions('getFinancingList'),
            increaseFinancingApprove: actions('increaseFinancingApprove'),
        },
        dispatch,
    )
}

const columns = [
    {
        title: '时间',
        dataIndex: 'date',
        key: 'date',
        render: date => <span>{moment(date).format('YYYY-MM-DD')}</span>,
    },
    {
        title: '金额',
        dataIndex: 'money',
        key: 'money',
    },
    {
        title: '出资方',
        dataIndex: 'investorName',
        key: 'investorName',
    },
    {
        title: '更新人',
        dataIndex: 'person',
        key: 'person',
    },
    {
        title: '更新时间',
        dataIndex: 'update',
        key: 'update',
    },
]

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Finance extends PureComponent {
    state = {
        visible: false,
    }
    componentDidMount() {
        this.props.getFinancingList({
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
            if (!errors) {
                this.setState({
                    visible: false,
                })
                values.companyId = sessionStorage.getItem('companyId')
                values.date = moment(values.date).format('YYYY-MM-DD')
                console.log(values)
                this.props.increaseFinancingApprove(values)
            }
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    renderForm = () => {
        const items = [
            {
                label: '出资方',
                field: 'investorName',
                rules: [
                    {
                        required: true,
                        message: '请输入信息',
                    },
                ],
                component: <Input />,
            },
            {
                label: '金额',
                field: 'money',
                rules: [
                    {
                        required: true,
                        message: '请输入信息',
                    },
                ],
                component: <Input />,
            },
            {
                label: '时间',
                field: 'date',
                rules: [
                    {
                        required: true,
                        message: '请输入信息',
                    },
                ],
                component: <DatePicker />,
            },
            // {
            //     label: '更新人',
            //     field: 'person',
            //     component: <Input />,
            // },
            // {
            //     label: '更新时间',
            //     field: 'update',
            //     component: <DatePicker />,
            // },
        ]
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
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
        const { finance } = this.props
        return (
            <Card
                title="融资信息"
                bordered={false}
                extra={
                    <Button type="primary" onClick={this.newInfo}>
                        新增
                    </Button>
                }
            >
                <Table bordered pagination={false} dataSource={finance.list} columns={columns} />
                <Modal
                    //className={styles.modalBox}
                    title="融资信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    //footer={null}
                >
                    {this.renderForm()}
                </Modal>
            </Card>
        )
    }
}
export default Finance
