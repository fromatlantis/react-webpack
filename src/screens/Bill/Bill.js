import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, DatePicker, Table, Input, Select } from 'antd'
import { FormView, TagsRadio } from 'components'
import theme from 'Theme'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/bill'
const { RangePicker } = DatePicker
const { Option } = Select
const searchItems = [
    {
        label: '楼栋',
        field: 'building',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '房号',
        field: 'room',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '客户名称',
        field: 'customerName',
        component: <Input placeholder="请输入" />,
    },
    {
        label: '应收款所属期',
        field: 'receiveDate',
        component: <RangePicker />,
    },
    {
        label: '应缴截止日期',
        field: 'limitDate',
        component: <DatePicker placeholder="请选择" />,
    },
    {
        label: '状态',
        field: 'status',
        component: (
            <Select placeholder="请选择">
                <Option value="0">未确认</Option>
                <Option value="1">已确认</Option>
            </Select>
        ),
    },
]
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]
const columns = [
    {
        title: '楼栋',
        dataIndex: 'building',
        key: 'building',
    },
    {
        title: '房号',
        dataIndex: 'room',
        key: 'room',
    },
    {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: '应收款所属期',
        dataIndex: 'receiveDate',
        key: 'receiveDate',
    },
    {
        title: '合计应收款（元）',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: '应缴截止日期',
        dataIndex: 'limitDate',
        key: 'limitDate',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '已确认账单数',
        dataIndex: 'confirmedCount',
        key: 'confirmedCount',
    },
    {
        title: '未确认账单数',
        dataIndex: 'unconfirmedCount',
        key: 'unconfirmedCount',
    },
]
@connect(
    state => ({
        bill: state.bill.bill,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getCustomerBillList: actions('getCustomerBillList'),
            },
            dispatch,
        )
    },
)
class Bill extends PureComponent {
    state = {
        test: '',
        tag1v: [],
        tags2: [],
        tag2v: [],
    }
    componentDidMount() {
        this.props.getCustomerBillList()
        this.setState({
            test: 'test',
        })
    }
    render() {
        const { bill } = this.props
        const tagsFromServer = [
            { label: '全部', value: 'all' },
            { label: '知识产权', value: 'knowlage' },
            { label: '财务服务', value: 'finace' },
            { label: '法律服务', value: 'law' },
            { label: '人力服务', value: 'person' },
        ]
        console.log(this.state.tag2v)
        return (
            <div className={`${theme.content} ${theme.defaultBg}`}>
                <FormView
                    onChange={this.onChange}
                    items={searchItems}
                    layout="inline"
                    saveBtn={false}
                    formItemLayout={formItemLayout}
                />
                {this.state.test}
                <div className={theme.flex} style={{ margin: '15px 0' }}>
                    <Alert style={{ flex: 1 }} message={`共${bill.totalCount}项`} />
                    <div className={theme.btnGroup}>
                        <Button type="primary">清空</Button>
                        <Button type="primary">查询</Button>
                        <Button type="primary">
                            <Link to="/bill/newCustomer">新增</Link>
                        </Button>
                        <Button type="primary">批量导入</Button>
                        <Button type="primary">批量确认</Button>
                        <Button type="primary">批量发送</Button>
                    </div>
                </div>
                <Table
                    style={{ background: '#fff' }}
                    dataSource={bill.list}
                    columns={columns}
                    pagination={{ hideOnSinglePage: true }}
                    onRow={record => {
                        return {
                            onClick: event => {
                                this.props.push('/bill/detail')
                            }, // 点击行
                        }
                    }}
                />
            </div>
        )
    }
}
export default Bill
