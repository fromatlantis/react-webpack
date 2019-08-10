import React, { PureComponent, Fragment } from 'react'
import { Button, Card, DatePicker, Divider, Modal, Input, InputNumber, Skeleton, Table } from 'antd'
import Toolbar from '../../Toolbar/Toolbar'
import { FormView, YearPicker } from 'components'
import { UploadImg } from 'components'
import moment from 'moment'
import styles from './Revenue.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/revenue'

const mapStateToProps = state => {
    return {
        revenue: state.revenue.revenue,
        detail: state.revenue.detail,
        searchParams: state.revenue.searchParams,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFinanceInfosList: actions('getFinanceInfosList'),
            getFinanceDetail: actions('getFinanceDetail'),
            addFinanceInfo: actions('addFinanceInfo'),
            updateFinanceInfo: actions('updateFinanceInfo'),
            delFinanceInfo: actions('delFinanceInfo'),
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
        this.props.getFinanceInfosList()
    }
    // 查询
    search = () => {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                values.pageNo = 1
                this.props.getFinanceInfosList(values)
            }
        })
    }
    handleReset = () => {
        this.form.resetFields()
        this.search()
    }
    // 分页
    onChange = pageNo => {
        this.props.getFinanceInfosList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getFinanceInfosList({ pageNo: 1, pageSize })
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
                const { updateFinanceInfo, addFinanceInfo, detail } = this.props
                if (isEdit) {
                    // 编辑
                    updateFinanceInfo({ ...detail, ...values })
                } else {
                    // 新增
                    addFinanceInfo(values)
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
        const InputMoney = (
            <InputNumber
                style={{ width: '160px' }}
                min={0}
                precision={2}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
        )
        const suffix = <span style={{ marginLeft: '5px' }}>元</span>
        const items = [
            {
                label: '年份',
                field: 'years',
                formatter: years => moment(years),
                component: <YearPicker />,
            },
            {
                label: '营业收入',
                field: 'operatingRevenue',
                component: InputMoney,
                suffix: () => suffix,
            },
            {
                label: '出口总额',
                field: 'grossExport',
                component: InputMoney,
                suffix: () => suffix,
            },
            {
                label: '专利产品年产值',
                field: 'patentYearValue',
                component: InputMoney,
                suffix: () => suffix,
            },
            {
                label: '研发费用',
                field: 'researchExpenditure',
                component: InputMoney,
                suffix: () => suffix,
            },
            {
                label: '上缴税金',
                field: 'taxes',
                component: InputMoney,
                suffix: () => suffix,
            },
            {
                label: '利润总额',
                field: 'totalProfit',
                component: InputMoney,
                suffix: () => suffix,
            },
            {
                label: '净利润',
                field: 'retainedProfits',
                component: InputMoney,
                suffix: () => suffix,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        }
        const { isEdit } = this.state
        const { detail } = this.props
        return (
            <FormView
                ref={form => {
                    this.newForm = form
                }}
                items={items}
                layout="inline"
                formItemLayout={{ formItemLayout }}
                data={isEdit ? detail : {}}
                saveBtn={false}
            />
        )
    }
    // 编辑
    edit = financeId => {
        this.props.getFinanceDetail(financeId)
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
            },
            {
                title: '更新日期',
                dataIndex: 'updateTime',
                key: 'updateTime',
            },
            {
                title: '营业收入/元',
                dataIndex: 'operatingRevenue',
                key: 'operatingRevenue',
                width: 100,
            },
            {
                title: '出口总额/元',
                dataIndex: 'grossExport',
                key: 'grossExport',
                width: 100,
            },
            {
                title: '专利产品年产值/元',
                dataIndex: 'patentYearValue',
                key: 'patentYearValue',
                width: 100,
            },
            {
                title: '研发费用/元',
                dataIndex: 'researchExpenditure',
                key: 'researchExpenditure',
            },
            {
                title: '上缴税金/元',
                dataIndex: 'taxes',
                key: 'taxes',
                width: 100,
            },
            {
                title: '利润总额/元',
                dataIndex: 'totalProfit',
                key: 'totalProfit',
                width: 100,
            },
            {
                title: '净利润/元',
                dataIndex: 'retainedProfits',
                key: 'retainedProfits',
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
                                this.edit(record.financeId)
                            }}
                        >
                            编辑
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                this.props.delFinanceInfo({ financeId: record.financeId })
                            }}
                        >
                            删除
                        </Button>
                    </Fragment>
                ),
            },
        ]
        const { revenue, searchParams } = this.props
        return (
            <div className={styles.contianer} style={{ background: 'rgba(240,242,245,1)' }}>
                <div className={styles.titleSty}>
                    <div className={styles.titleName}>财务信息</div>
                    <Toolbar />
                </div>
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

                <div className={styles.tableSty}>
                    <Skeleton loading={revenue.list ? false : true} active avatar>
                        <Table
                            bordered
                            dataSource={revenue.list}
                            columns={columns}
                            pagination={{
                                current: searchParams.pageNo,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                pageSizeOptions: ['10', '15', '20'],
                                total: revenue.totalCount,
                                onShowSizeChange: this.onShowSizeChange,
                                onChange: this.onChange,
                            }}
                        />
                    </Skeleton>
                </div>
                <Modal
                    title="财务信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className={styles.modal}
                >
                    {this.renderNewForm()}
                </Modal>
            </div>
        )
    }
}
export default Revenue
