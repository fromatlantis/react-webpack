import React, { PureComponent } from 'react'
import { Table } from 'antd'
import theme from 'Theme'
export default class Changes extends PureComponent {
    render() {
        return (
            <div className={theme.detailCard}>
                <div className={theme.titleChip}>
                    <div>
                        <span className={theme.divider}>|</span>
                        <span className={theme.title}>操作记录</span>
                    </div>
                </div>
                <Table
                    bordered={true} //边框
                    rowKey={(record, index) => `complete${record.id}${index}`}
                    columns={[
                        {
                            title: '标题',
                            dataIndex: 'title',
                            key: 'title',
                            align: 'center',
                        },
                        {
                            title: '新闻来源',
                            dataIndex: 'website',
                            key: 'website',
                            align: 'center',
                        },
                        {
                            title: '发布时间',
                            dataIndex: 'time',
                            key: 'time',
                            align: 'center',
                        },
                    ]}
                    dataSource={[]}
                />
            </div>
        )
    }
}
