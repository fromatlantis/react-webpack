import React, { PureComponent } from 'react'
import { YearPicker } from 'components'
import { Card, Button, Alert, Table } from 'antd'
import { LineChart } from 'components/Charts'

const columnsCount = [
    {
        title: '年份',
        dataIndex: 'year',
        key: 'year',
    },
    {
        title: '企业数量',
        dataIndex: 'count',
        key: 'count',
        align: 'center',
    },
    {
        title: '融资情况（元）',
        dataIndex: 'financing',
        key: 'financing',
        align: 'center',
    },
    {
        title: '新增融资（元）',
        dataIndex: 'increase',
        key: 'increase',
        align: 'center',
    },
    {
        title: '融资环比',
        dataIndex: 'ratio',
        key: 'ratio',
        align: 'center',
    },
]
const data1 = [
    {
        year: '2019',
        count: 123,
        financing: 123456789.89,
        increase: 123456789.89,
        ratio: '12.12%',
    },
]
const columnsDetail = [
    {
        title: '年份',
        dataIndex: 'year',
        key: 'year',
    },
    {
        title: '企业名称',
        dataIndex: 'comname',
        key: 'comname',
    },
    {
        title: '企业类型',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
    },
    {
        title: '所属行业',
        dataIndex: 'industry',
        key: 'industry',
        align: 'center',
    },
    {
        title: '成立时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
    },
    {
        title: '引入时间（元）',
        dataIndex: 'into',
        key: 'into',
        align: 'center',
    },
    {
        title: '融资情况（元）',
        dataIndex: 'financing',
        key: 'financing',
        align: 'center',
    },
]
const data2 = [
    {
        year: '2015',
        comname: '启迪智慧创新（北京）科技有限公司',
        type: '实驻企业',
        industry: '科学研究和技术服务业',
        time: '2019-04-05',
        into: '2019-04-05',
        financing: 1000,
    },
]
const dataSource = [
    {
        name: '2014',
        value: 13.2,
    },
    {
        name: '2015',
        value: 4.5,
    },
    {
        name: '2016',
        value: 16.7,
    },
    {
        name: '2017',
        value: 8.2,
    },
    {
        name: '2018',
        value: 13.8,
    },
    {
        name: '2019',
        value: 10.9,
    },
]
export default class Financing extends PureComponent {
    render() {
        return (
            <Card title="" bodyStyle={{ padding: '30px' }} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', right: '30px', top: '20px' }}>
                    <b>选择年份：</b>
                    <YearPicker />
                </div>
                <div style={{ height: '400px', marginTop: '50px' }}>
                    <LineChart titleTop styleFlge title="融资情况统计" data={dataSource} />
                </div>
                <div style={{ position: 'absolute', right: '10px', margin: '20px' }}>
                    <Button
                        type="primary"
                        // onClick={() => this.exportDispCount(0)}
                        style={{ marginRight: '20px' }}
                    >
                        导出当前页
                    </Button>
                    <Button
                        type="primary"
                        // onClick={() => this.exportDispCount(1)}
                        style={{ marginRight: '10px' }}
                    >
                        导出全部
                    </Button>
                </div>
                <Alert message={'共20项'} type="info" showIcon style={{ marginTop: '70px' }} />
                <div style={{ marginTop: '10px' }}>
                    <Table
                        dataSource={data1}
                        columns={columnsCount}
                        pagination={{
                            // current: dispCountPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            // pageSizeOptions: ['10', '15', '20'],
                            // total: dispatchList.totalCount,
                            // onChange: this.onChangeDispatcherCountPage,
                        }}
                    />
                </div>
                <div style={{ position: 'absolute', right: '30px' }}>
                    <Button
                        type="primary"
                        // onClick={() => this.exportDispDetail(0)}
                        style={{ marginRight: '20px' }}
                    >
                        导出当前页
                    </Button>
                    <Button
                        type="primary"
                        // onClick={() => this.exportDispDetail(1)}
                        style={{ marginRight: '10px' }}
                    >
                        导出全部
                    </Button>
                </div>
                <Alert message={'共20项'} type="info" showIcon style={{ marginTop: '50px' }} />
                <div style={{ marginTop: '10px' }}>
                    <Table
                        columns={columnsDetail}
                        dataSource={data2}
                        pagination={{
                            showSizeChanger: true,
                            // current: dispDetailPager.pageNo,
                            showQuickJumper: true,
                            // pageSizeOptions: ['10', '15', '20'],
                            // total: dispatcherDetailList.totalCount,
                            // onChange: this.onChangeDispatcherDetailPage,
                        }}
                    />
                </div>
            </Card>
        )
    }
}
