import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, InputNumber, DatePicker, Divider, Radio } from 'antd'
import moment from 'moment'
import { FormView } from 'components'
import Toolbar from '../../Toolbar/Toolbar'
import styles from '../index.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/finance'

const dateStr = 'x' //毫秒
const mapStateToProps = state => {
    return {
        finance: state.finance.finance,
        searchParams: state.finance.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFinancingList: actions('getFinancingList'),
            increaseFinancing: actions('increaseFinancing'),
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
        title: '轮次',
        dataIndex: 'round',
        key: 'round',
    },
    {
        title: '更新人',
        dataIndex: 'editorName',
        key: 'editorName',
    },
    {
        title: '更新时间',
        dataIndex: 'sourceTime',
        key: 'sourceTime',
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
        this.props.getFinancingList()
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
                values.date = moment(values.date.format('YYYY-MM-DD')).format(dateStr)
                // console.log(values)
                this.props.increaseFinancing(values)
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
                component: <Input />,
                rules: [
                    {
                        required: true,
                        message: '请填写出资方',
                    },
                ],
            },
            {
                label: '金额',
                field: 'money',
                component: <InputNumber style={{ width: 200 }} />,
                rules: [
                    {
                        required: true,
                        message: '请填写金额',
                    },
                ],
            },
            {
                label: '时间',
                field: 'date',
                component: <DatePicker />,
            },
            {
                label: '轮次',
                field: 'round',
                component: <Input />,
            },
            {
                label: '是否公示',
                field: 'isShow',
                initialValue: '1',
                component: (
                    <Radio.Group>
                        <Radio value="0">不公示</Radio>
                        <Radio value="1">公示</Radio>
                    </Radio.Group>
                ),
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
    // 分页
    onChange = pageNo => {
        this.props.getFinancingList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getFinancingList({ pageNo: 1, pageSize })
    }
    render() {
        const { finance, searchParams } = this.props
        return (
            <div className={styles.contianer} style={{ background: 'rgba(240,242,245,1)' }}>
                <div className={styles.titleSty}>
                    <div className={styles.titleName}>融资信息</div>
                    <div style={{ display: 'flex' }}>
                        <Button
                            type="primary"
                            onClick={this.newInfo}
                            style={{ marginRight: '15px' }}
                        >
                            新增
                        </Button>
                        <Toolbar />
                    </div>
                </div>
                <div className={styles.tableSty}>
                    <Table
                        dataSource={finance.list}
                        columns={columns}
                        pagination={{
                            current: searchParams.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: finance.totalCount,
                            onShowSizeChange: this.onShowSizeChange,
                            onChange: this.onChange,
                        }}
                    />
                </div>
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
            </div>
        )
    }
}
export default Finance
