import React, { PureComponent, Fragment } from 'react'
import { Button, Checkbox, Modal, Steps, Table, message } from 'antd'
import { YearPicker, IconFont } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/configure'
import { actions as companyActions } from 'reduxDir/company'
import moment from 'moment'
const Step = Steps.Step
const steps = [
    {
        title: '导出设置',
        content: 'First-content',
        icon: <IconFont type="icondaochu" />,
    },
    {
        title: '导出预览',
        content: 'Second-content',
        icon: <IconFont type="icondetails" />,
    },
]
const revenueChks = [
    {
        label: '营业收入',
        key: 'operating_revenue',
        type: 'revenue',
    },
    {
        label: '出口总额',
        key: 'gross_export',
        type: 'revenue',
    },
    {
        label: '专利产品年产值',
        key: 'patent_year_value',
        type: 'revenue',
    },
    {
        label: '研发费用',
        key: 'research_expenditure',
        type: 'revenue',
    },
    {
        label: '上缴税金',
        key: 'taxes',
        type: 'revenue',
    },
    {
        label: '利润总额',
        key: 'total_profit',
        type: 'revenue',
    },
    {
        label: '净利润',
        key: 'retained_profits',
        type: 'revenue',
    },
]
const personChks = [
    {
        label: '就业人员数',
        key: 'employment',
        type: 'staff',
    },
    {
        label: '博士人数',
        key: 'doctoral',
        type: 'staff',
    },
    {
        label: '留学生人数',
        key: 'overseas_student',
        type: 'staff',
    },
    {
        label: '本科及以上学历人数',
        key: 'undergraduate',
        type: 'staff',
    },
    {
        label: '大专及以上学历人数',
        key: 'junior_college',
        type: 'staff',
    },
    {
        label: '本公司社保缴纳人员',
        key: 'social_pay',
        type: 'staff',
    },
]
const copyrightChks = [
    {
        label: '有效知识产权数',
        key: 'validRights',
        type: 'rights',
    },
    {
        label: '软件著作数',
        key: 'copyright',
        type: 'rights',
    },
    {
        label: '有效专利数',
        key: 'patent',
        type: 'rights',
    },
    {
        label: '发明专利数',
        key: 'inventionPatent',
        type: 'rights',
    },
    {
        label: '集成电路布图数',
        key: 'icLayout',
        type: 'rights',
    },
    {
        label: '当年新申请知识产权数',
        key: 'newRights',
        type: 'rights',
    },
    {
        label: '当年新授权专利数',
        key: 'social_pay',
        type: 'rights',
    },
    {
        label: '商标数',
        key: 'trademark',
        type: 'rights',
    },
    {
        label: '技术合同交易数',
        key: 'social_pay',
        type: 'rights',
    },
    {
        label: '技术合同交易额',
        key: 'social_pay',
        type: 'rights',
    },
]
const columns = [
    {
        title: '企业名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '统一社会信用代码',
        dataIndex: 'credit_code',
        key: 'credit_code',
    },
    {
        title: '企服负责人',
        dataIndex: 'enterprise_name',
        key: 'enterprise_name',
    },
    {
        title: '招商负责人',
        dataIndex: 'commerce_name',
        key: 'commerce_name',
    },
]
let otherColumns = []
const mapStateToProps = state => {
    return {
        qualityList: state.configure.qualityList.map(item => ({
            label: `是否${item.label}`,
            key: item.label,
            type: 'aptitude',
        })),
        previewExport: state.company.previewExport,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getLabelList: actions('getLabelList'),
            exportPreview: companyActions('exportPreview'),
            exportCompanyData: companyActions('exportCompanyData'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Export extends PureComponent {
    state = {
        current: 0,
        exportModal: false,
        checkedList: [],
        indeterminate: false,
        checkAll: false,
        years: moment(),
    }
    componentDidMount() {
        this.props.getLabelList({ type: 'qualification' })
    }
    // 打开弹窗
    openModal = () => {
        const { ids } = this.props
        if (ids && ids.length === 0) {
            message.warning('请选择企业')
        } else {
            this.setState({
                exportModal: true,
            })
        }
    }
    exportModalCancel = () => {
        this.setState({
            exportModal: false,
        })
    }
    onCheckAllChange = e => {
        const { qualityList } = this.props
        const chks = [...revenueChks, ...personChks, ...copyrightChks, ...qualityList]
        this.setState({
            checkedList: e.target.checked ? chks : [],
            checkAll: !this.state.checkAll,
            indeterminate: false,
        })
    }
    // 选择
    onCheck = checkedList => {
        const { qualityList } = this.props
        const chks = [...revenueChks, ...personChks, ...copyrightChks, ...qualityList]
        // console.log(checkedList)
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < chks.length,
            checkAll: checkedList.length === chks.length,
        })
    }
    next() {
        const current = this.state.current + 1
        const { checkedList, years } = this.state
        const { exportPreview, ids } = this.props
        if (checkedList.length === 0) {
            message.warning('请选择导出项')
        } else {
            otherColumns = checkedList.map(item => ({
                title: item.label,
                dataIndex: item.key,
                key: item.key,
            }))
            exportPreview({
                years: years.format('YYYY'),
                ...(ids ? { companyIds: ids.join(',') } : null),
                revenue: checkedList
                    .filter(item => item.type === 'revenue')
                    .map(item => item.key)
                    .join(','),
                staff: checkedList
                    .filter(item => item.type === 'staff')
                    .map(item => item.key)
                    .join(','),
                rights: checkedList
                    .filter(item => item.type === 'rights')
                    .map(item => item.key)
                    .join(','),
                aptitude: checkedList
                    .filter(item => item.type === 'aptitude')
                    .map(item => item.key)
                    .join(','),
            })
            this.setState({ current })
        }
    }
    prev() {
        const current = this.state.current - 1
        this.setState({ current })
    }
    exportXls = () => {
        const { checkedList, years } = this.state
        const { exportCompanyData, previewExport } = this.props
        exportCompanyData({
            years: years.format('YYYY'),
            dataJson: JSON.stringify(previewExport),
            revenue: checkedList
                .filter(item => item.type === 'revenue')
                .map(item => item.key)
                .join(','),
            staff: checkedList
                .filter(item => item.type === 'staff')
                .map(item => item.key)
                .join(','),
            rights: checkedList
                .filter(item => item.type === 'rights')
                .map(item => item.key)
                .join(','),
            aptitude: checkedList
                .filter(item => item.type === 'aptitude')
                .map(item => item.key)
                .join(','),
        })
        this.setState({
            exportModal: false,
        })
    }
    render() {
        const { current, years } = this.state
        const { title, qualityList, previewExport } = this.props
        return (
            <Fragment>
                <Button type="primary" onClick={this.openModal}>
                    {title}
                </Button>
                <Modal
                    title={title}
                    visible={this.state.exportModal}
                    onOk={this.exportModalOk}
                    onCancel={this.exportModalCancel}
                    width={930}
                    footer={
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    下一步
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={this.exportXls}>
                                    完成
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    上一步
                                </Button>
                            )}
                        </div>
                    }
                >
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} icon={item.icon} />
                        ))}
                    </Steps>
                    {current === 0 && (
                        <div style={{ marginTop: '10px' }}>
                            <Checkbox
                                style={{ marginRight: '10px' }}
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >
                                选择全部
                            </Checkbox>
                            <b>选择年份：</b>
                            <YearPicker
                                value={years}
                                onChange={year => {
                                    this.setState({
                                        years: year,
                                    })
                                }}
                            />
                            <Checkbox.Group value={this.state.checkedList} onChange={this.onCheck}>
                                <p style={{ margin: '6px 0' }}>
                                    <b>营收类：</b>
                                </p>
                                <div style={{ marginLeft: '50px', display: 'flex' }}>
                                    {revenueChks.map(item => (
                                        <div style={{ margin: '5px' }}>
                                            <Checkbox value={item}>{item.label}</Checkbox>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ margin: '6px 0' }}>
                                    <b>人员类：</b>
                                </p>
                                <div
                                    style={{
                                        marginLeft: '50px',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {personChks.map(item => (
                                        <div style={{ margin: '5px' }}>
                                            <Checkbox value={item}>{item.label}</Checkbox>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ margin: '6px 0' }}>
                                    <b>知识产权类：</b>
                                </p>
                                <div
                                    style={{
                                        marginLeft: '50px',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {copyrightChks.map(item => (
                                        <div style={{ margin: '5px' }}>
                                            <Checkbox value={item}>{item.label}</Checkbox>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ margin: '6px 0' }}>
                                    <b>资质类：</b>
                                </p>
                                <div
                                    style={{
                                        marginLeft: '50px',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {qualityList.map(item => (
                                        <div style={{ margin: '5px' }}>
                                            <Checkbox value={item}>{item.label}</Checkbox>
                                        </div>
                                    ))}
                                </div>
                            </Checkbox.Group>
                        </div>
                    )}
                    {current === 1 && (
                        <Table
                            dataSource={previewExport}
                            columns={[...columns, ...otherColumns]}
                            scroll={{ x: 1300 }}
                        />
                    )}
                </Modal>
            </Fragment>
        )
    }
}
export default Export
