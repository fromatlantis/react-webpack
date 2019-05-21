import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker, Divider, InputNumber } from 'antd'
import moment from 'moment'
import { FormView, SearchView } from 'components'
import styles from '../index.module.css'
import Toolbar from '../../Toolbar/Toolbar'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/outward'

const dateStr = 'x' //毫秒
const mapStateToProps = state => {
    return {
        outward: state.outward.outward,
        detail: state.outward.detail,
        searchParams: state.outward.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getInvestmentAbroadList: actions('getInvestmentAbroadList'),
            queryInvestmentAbroadDetial: actions('queryInvestmentAbroadDetial'),
            increaseInvestmentAbroadApprove: actions('increaseInvestmentAbroadApprove'),
            changeInvestmentAbroadApprove: actions('changeInvestmentAbroadApprove'),
        },
        dispatch,
    )
}

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Outward extends PureComponent {
    state = {
        visible: false,
        isEdit: false,
    }
    componentDidMount = () => {
        this.props.getInvestmentAbroadList()
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
                const {
                    changeInvestmentAbroadApprove,
                    increaseInvestmentAbroadApprove,
                    detail,
                } = this.props
                if (values.estiblishTime) {
                    values.estiblishTime = moment(values.estiblishTime.format('YYYY-MM-DD')).format(
                        dateStr,
                    )
                }
                if (isEdit) {
                    // 编辑
                    changeInvestmentAbroadApprove({ ...detail, ...values })
                } else {
                    // 新增
                    increaseInvestmentAbroadApprove(values)
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
                label: '被投资公司名称',
                field: 'name',
                component: <Input />,
            },
            {
                label: '被投资法定代表人',
                field: 'legalPersonName',
                component: <Input />,
            },
            {
                label: '注册资本',
                field: 'regCapital',
                component: <Input />,
            },
            {
                label: '投资金额',
                field: 'amount',
                component: <Input />,
            },
            {
                label: '投资比例',
                field: 'percent',
                component: (
                    <InputNumber
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                    />
                ),
            },
            {
                label: '开业时间',
                field: 'estiblishTime',
                component: <DatePicker />,
            },
            {
                label: '状态',
                field: 'regStatus',
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
    renderNewForm = () => {
        const items = [
            {
                label: '被投资公司名称',
                field: 'name',
                component: <Input />,
            },
            {
                label: '被投资法定代表人',
                field: 'legalPersonName',
                component: <Input />,
            },
            {
                label: '开业时间',
                field: 'estiblishTime',
                component: <DatePicker />,
            },
            {
                label: '注册资本',
                field: 'regCapital',
                component: <Input />,
            },
            {
                label: '投资金额',
                field: 'amount',
                component: <Input />,
            },
            {
                label: '投资比例',
                field: 'percent',
                component: (
                    <InputNumber
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                    />
                ),
            },
            {
                label: '状态',
                field: 'regStatus',
                component: <Input />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 15 },
        }
        const { isEdit } = this.state
        const { detail } = this.props
        // 时间处理
        detail.estiblishTime = moment(detail.estiblishTime, dateStr)
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
                if (values.estiblishTime) {
                    // 先转换为日期再格式化
                    values.estiblishTime = moment(values.estiblishTime.format('YYYY-MM-DD')).format(
                        dateStr,
                    )
                }
                if (values.percent) {
                    values.percent = values.percent + '.00'
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
                title: '被投资公司名称',
                dataIndex: 'name',
                key: 'name',
                width: 150,
            },
            {
                title: '被投资法定代表人',
                dataIndex: 'legalPersonName',
                key: 'legalPersonName',
                width: 110,
            },
            {
                title: '注册资本',
                dataIndex: 'regCapital',
                key: 'regCapital',
                width: 150,
            },
            {
                title: '投资金额',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: '投资比例',
                dataIndex: 'percent',
                key: 'percent',
            },
            {
                title: '开业时间',
                dataIndex: 'estiblishTime',
                key: 'estiblishTime',
                render: estiblishTime => (
                    <span>{moment(parseInt(estiblishTime)).format('YYYY-MM-DD')}</span>
                ),
            },
            {
                title: '状态',
                dataIndex: 'regStatus',
                key: 'regStatus',
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
        const { outward, searchParams } = this.props
        return (
            <Card title="对外投资" bordered={false} extra={<Toolbar />}>
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
                    dataSource={outward.resultList}
                    columns={columns}
                    pagination={{
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '15', '20'],
                        total: outward.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onChange,
                    }}
                />
                <Modal
                    title="对外投资"
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
export default Outward
