import React, { PureComponent } from 'react'
import { Alert, Table, Tabs, Tooltip } from 'antd'
import { IconFont } from 'components'
const { TabPane } = Tabs

const allColumns = [
    {
        title: '表类型',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: '表编号',
        dataIndex: 'meterNo',
        key: 'meterNo',
    },
    {
        title: '本期读数',
        dataIndex: 'numericValue',
        key: 'numericValue',
    },
    {
        title: '抄表人',
        dataIndex: 'transcriberName',
        key: 'transcriberName',
    },
    {
        title: '抄表时间',
        dataIndex: 'readingTime',
        key: 'readingTime',
    },
    {
        title: '抄表说明',
        dataIndex: 'description',
        key: 'description',
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
        let columns = []
        if (this.state.activeKey === '2') {
            columns = [
                ...allColumns,
                {
                    title: '异常原因',
                    dataIndex: 'cause',
                    key: 'cause',
                    align: 'center',
                    render: cause => (
                        <Tooltip title={cause}>
                            <IconFont
                                style={{ color: 'red', fontSize: '16px' }}
                                type="iconyichang"
                            />
                        </Tooltip>
                    ),
                },
            ]
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
                            columns={allColumns}
                            // pagination={false}
                        />
                    </TabPane>
                    <TabPane tab="异常数据" key="2">
                        <Table
                            dataSource={[...data.readMeters, ...data.exceptRecords]}
                            columns={columns}
                            // pagination={false}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
