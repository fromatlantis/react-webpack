import React, { PureComponent } from 'react'
import { YearPicker } from 'components'
import { Card, Button, Alert, Table } from 'antd'
import { BarChart } from 'components/Charts'

const dataSource = [
    {
        name: '高新技术企业',
        value: 10.7,
    },
    {
        name: '专利试点示范企业',
        value: 8.3,
    },
    {
        name: '企业技术中心',
        value: 11.2,
    },
    {
        name: '专精特新企业',
        value: 16.8,
    },
    {
        name: '上海市科技小巨人',
        value: 15.9,
    },
]
const columnsCount = [
    {
        title: '资质名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '累计数量',
        dataIndex: 'count',
        key: 'count',
        align: 'center',
    },
    {
        title: '占比',
        dataIndex: 'zb',
        key: 'zb',
        align: 'center',
    },
    {
        title: '当年新增数量',
        dataIndex: 'new',
        key: 'new',
        align: 'center',
    },
    {
        title: '环比',
        dataIndex: 'hb',
        key: 'hb',
        align: 'center',
    },
]
const data1 = [
    {
        name: '小巨人计划',
        count: 500,
        zb: '30%',
        new: 145,
        hb: '14.4%',
    },
]
const columnsDetail = [
    {
        title: '资质名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '企业名称',
        dataIndex: 'comname',
        key: 'comname',
        align: 'center',
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
]
const data2 = [
    {
        name: '专精特新企业',
        comname: '启迪智慧创新（北京）科技有限公司',
        type: '实驻企业',
        industry: '科学研究和技术服务业',
        time: '2019-04-05',
    },
]
export default class Qualifications extends PureComponent {
    render() {
        return (
            <Card title="企业资质统计" style={{ position: 'relative' }} bordered={false}>
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
