import React, { PureComponent } from 'react'
import { Card, DatePicker, Divider, Input, InputNumber, Select, message } from 'antd'
import { FormView, UploadImg } from 'components'
import moment from 'moment'
import styles from './RecordCreate.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/meterRecord'
import { actions as meterActions } from 'reduxDir/meter'

const { Option } = Select

const mapStateToProps = state => {
    return {
        user: state.authUser.user,
        meterNos: state.meter.meterNos,
        meterDetail: state.meter.meterDetail,
        taskDetail: state.meterRecord.taskDetail,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getMeterNoByCategory: meterActions('getMeterNoByCategory'),
            getMeterDetail: meterActions('getMeterDetail'),
            getReadingTaskDetail: actions('getReadingTaskDetail'),
            saveRecord: actions('saveRecord'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class RecordCreate extends PureComponent {
    state = {
        values: {
            category: 'water',
        },
    }
    componentDidMount() {
        this.props.getMeterNoByCategory({
            category: 'water',
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.meterDetail !== nextProps.meterDetail) {
            if (nextProps.meterDetail.meterNo) {
                this.props.getReadingTaskDetail({ meterId: nextProps.meterDetail.id })
            }
        }
    }
    changeCategory = category => {
        this.setState({
            values: { ...this.state.values, category: category },
        })
        this.props.getMeterNoByCategory({
            category,
        })
    }
    changeMeter = id => {
        this.props.getMeterDetail({ id })
    }
    onSubmit = values => {
        const { taskDetail, user } = this.props
        if (taskDetail.id) {
            values.recordId = taskDetail.id
            // 抄表人
            values.transcriberId = user.id
            values.transcriberName = user.name
            // 时间
            values.readingTime = values.readingTime.format('YYYY-MM-DD HH:mm:ss')
            this.props.saveRecord(values)
        } else {
            message.error('请选择表编号')
        }
    }
    render() {
        const { meterNos, meterDetail } = this.props
        const { values } = this.state
        const data = { ...values, ...meterDetail }
        const detailItems = [
            {
                label: '表类型',
                field: 'category',
                component: (
                    <Select
                        placeholder="表类型"
                        style={{ width: 175 }}
                        onChange={this.changeCategory}
                    >
                        <Option value="water">水表</Option>
                        <Option value="ammeter">电表</Option>
                        <Option value="fuelgas">燃气表</Option>
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                        message: '请选择表类型',
                    },
                ],
            },
            {
                label: '表编号',
                field: 'meterNo',
                component: (
                    <Select
                        placeholder="表编号"
                        style={{ width: 175 }}
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={this.changeMeter}
                    >
                        {meterNos.map(item => (
                            <Option value={item.id} key={item.id}>
                                {item.meterNo}
                            </Option>
                        ))}
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                        message: '请填写编号',
                    },
                ],
            },
            {
                label: '安装地址',
                field: 'location',
                component: <Input readOnly />,
            },
            {
                label: '类型',
                field: 'areaType',
                component: (
                    <Select placeholder="类型" style={{ width: 175 }} disabled>
                        <Option value={1}>公区</Option>
                        <Option value={2}>企业</Option>
                        <Option value={3}>个人</Option>
                        <Option value={4}>其他</Option>
                    </Select>
                ),
            },
            {
                label: '企业名称',
                field: 'customerName',
                visible: data.areaType !== 2 ? false : true,
                component: <Input readOnly />,
            },
            {
                label: '企业地址',
                field: 'customerAddr',
                visible: data.areaType !== 2 ? false : true,
                component: <Input readOnly />,
            },
            {
                label: '客户地址',
                field: 'customerAddr',
                visible: data.areaType !== 3 ? false : true,
                component: <Input readOnly />,
            },
            {
                label: '联系人',
                field: 'contacts',
                component: <Input readOnly />,
            },
            {
                label: '联系电话',
                field: 'contactsWay',
                component: <Input readOnly />,
            },
            {
                label: '备注说明',
                field: 'remarks',
                component: <Input readOnly />,
            },
        ]
        const items = [
            {
                label: '上期读数',
                field: 'preValues',
                initialValue: this.props.taskDetail.lastNumeric || '--',
                component: <Input disabled />,
            },
            {
                label: '抄表人',
                field: 'transcriberId',
                component: (
                    <Select placeholder="抄表人" style={{ width: 175 }}>
                        <Option value="water">水表</Option>
                        <Option value="ammeter">电表</Option>
                        <Option value="fuelgas">燃气表</Option>
                    </Select>
                ),
            },
            {
                label: '本期读数',
                field: 'numericValue',
                component: <InputNumber min={0} />,
                rules: [
                    {
                        required: true,
                        message: '请填写本期读数',
                    },
                ],
            },
            {
                label: '抄表时间',
                field: 'readingTime',
                initialValue: moment(),
                component: <DatePicker showTime />,
            },
            {
                label: '抄表说明',
                field: 'description',
                component: (
                    <Input.TextArea autosize={{ minRows: 4 }} style={{ marginTop: '6px' }} />
                ),
            },
            {
                label: '抄表图片',
                field: 'images',
                component: <UploadImg style={{ marginTop: '6px' }} />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        }
        return (
            <Card bordered={false} className={styles.root}>
                <FormView
                    layout="inline"
                    formItemLayout={formItemLayout}
                    items={detailItems}
                    data={data}
                    saveBtn={false}
                />
                <Divider />
                <FormView
                    layout="inline"
                    formItemLayout={formItemLayout}
                    items={items}
                    onSubmit={this.onSubmit}
                />
            </Card>
        )
    }
}
export default RecordCreate
