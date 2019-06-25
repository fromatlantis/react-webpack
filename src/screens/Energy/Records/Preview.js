import React, { PureComponent } from 'react'
import { Alert, Table, Tabs, Tooltip } from 'antd'
import { IconFont } from 'components'
const { TabPane } = Tabs

const categoryStr = {
    water: '水表',
    ammeter: '电表',
    fuelgas: '燃气表',
}
const allColumns = [
    {
        title: '表类型',
        dataIndex: 'category',
        key: 'category',
        render: category => <span>{categoryStr[category]}</span>,
        type: [1, 2, 3, 4],
    },
    {
        title: '表编号',
        dataIndex: 'meterNo',
        key: 'meterNo',
        type: [1, 2, 3, 4],
    },
    {
        title: '安装地址',
        dataIndex: 'location',
        key: 'location',
        type: [1, 2, 3, 4],
    },
    {
        title: '企业名称',
        dataIndex: 'customerName',
        key: 'customerName',
        type: [2],
    },
    {
        title: '企业地址',
        dataIndex: 'customerAddr',
        key: 'customerAddr',
        type: [2],
    },
    {
        title: '客户地址',
        dataIndex: 'customerAddr',
        key: 'customerAddr',
        type: [3],
    },
    {
        title: '联系人',
        dataIndex: 'contacts',
        key: 'contacts',
        type: [1, 2, 3, 4],
    },
    {
        title: '联系电话',
        dataIndex: 'contactsWay',
        key: 'contactsWay',
        type: [1, 2, 3, 4],
    },
]
export default class Preview extends PureComponent {
    state = {
        activeKey: '1',
    }
    changeTab = active => {
        this.setState({
            activeKey: active,
        })
    }
    render() {
        const { type, data } = this.props
        const columns = allColumns.filter(item => item.type.includes(type))
        if (this.state.activeKey === '2') {
            columns.push({
                title: '异常原因',
                dataIndex: 'cause',
                key: 'cause',
                align: 'center',
                render: cause => (
                    <Tooltip title={cause}>
                        <IconFont style={{ color: 'red', fontSize: '16px' }} type="iconyichang" />
                    </Tooltip>
                ),
            })
        }
        return (
            <div style={{ paddingTop: '15px' }}>
                <Alert
                    message={`正常数据${data.unreadMeters.length}项，异常数据${
                        [...data.readMeters, ...data.exceptRecords].length
                    }项`}
                    type="info"
                />
                <Tabs activeKey={this.state.activeKey} onChange={this.changeTab}>
                    <TabPane tab="正常数据" key="1">
                        <Table
                            dataSource={data.unreadMeters}
                            columns={columns}
                            pagination={false}
                        />
                    </TabPane>
                    <TabPane tab="异常数据" key="2">
                        <Table
                            dataSource={[...data.readMeters, ...data.exceptRecords]}
                            columns={columns}
                            pagination={false}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
