import React, { PureComponent } from 'react'
import { YearPicker } from 'components'
import { Card, Button, Alert, Table } from 'antd'
import { BarChart } from 'components/Charts'

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
        title: '新增企业数量',
        dataIndex: 'increase',
        key: 'increase',
        align: 'center',
    },
    {
        title: '企业数量环比',
        dataIndex: 'hb',
        key: 'hb',
        align: 'center',
    },
]
const data1 = [
    {
        year: '2019',
        count: 123,
        increase: 123,
        hb: '12.12%',
    },
]
const columnsDetail = [
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
        title: '法人',
        dataIndex: 'person',
        key: 'person',
        align: 'center',
    },
    {
        title: '成立时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
    },
    {
        title: '引入时间',
        dataIndex: 'into',
        key: 'into',
        align: 'center',
    },
    {
        title: '企业地址',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
    },
]
const data2 = [
    {
        comname: '启迪智慧创新（北京）科技有限公司',
        type: '实驻企业',
        person: '张三',
        time: '2019-04-05',
        into: '2019-04-05',
        address: '石家庄科技中心润江大厦B座1302',
    },
]
const dataSource = [
    {
        name: '2015',
        value: 100,
    },
    {
        name: '2016',
        value: 182,
    },
    {
        name: '2017',
        value: 210,
    },
    {
        name: '2018',
        value: 367,
    },
    {
        name: '2019',
        value: 412,
    },
]
export default class Quantity extends PureComponent {
    render() {
        return (
            <Card title="企业数量统计" style={{ position: 'relative' }} bordered={false}>
                <div style={{ position: 'absolute', right: '30px', top: '15px' }}>
                    <b>选择年份：</b>
                    <YearPicker />
                </div>
                <div style={{ height: '400px', marginTop: '30px' }}>
                    <BarChart data={dataSource} />
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
