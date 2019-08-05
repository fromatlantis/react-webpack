import React, { PureComponent } from 'react'
import { YearPicker } from 'components'
import { Card, Button, Alert, Table } from 'antd'
import echarts from 'echarts/lib/echarts'

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
        title: '营业收入（元）',
        dataIndex: 'income',
        key: 'income',
        align: 'center',
    },
    {
        title: '营收环比',
        dataIndex: 'chain',
        key: 'chain',
        align: 'center',
    },
    {
        title: '上缴税金（元）',
        dataIndex: 'taxes',
        key: 'taxes',
        align: 'center',
    },
    {
        title: '税金环比',
        dataIndex: 'ratio',
        key: 'ratio',
        align: 'center',
    },
]
const data1 = [
    {
        year: '2019',
        count: 123,
        income: 123456789.89,
        chain: '12.12%',
        taxes: 123456789.89,
        ratio: '12.12%',
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
        title: '营业收入（元）',
        dataIndex: 'income',
        key: 'income',
        align: 'center',
    },
    {
        title: '上缴税金（元）',
        dataIndex: 'taxes',
        key: 'taxes',
        align: 'center',
    },
]
const data2 = [
    {
        comname: '启迪智慧创新（北京）科技有限公司',
        type: '实驻企业',
        industry: '科学研究和技术服务业',
        time: '2019-04-05',
        income: 123456789.89,
        taxes: 123456789.89,
    },
]

export default class Revenue extends PureComponent {
    componentDidMount = () => {
        this.initChart()
    }
    initChart = () => {
        var myChart = echarts.init(this.refs.barChart)
        var option = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['纳税', '营收'],
                icon: 'rect',
                top: 22,
                right: 24,
                itemGap: 15,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    // padding: [0, 0, 0, 5],
                    color: 'rgba(0,0,0,0.87)',
                },
            },
            color: ['#289df5', '#fbc01b'],
            grid: {
                left: 24,
                right: 0,
                bottom: '30',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        width: 1,
                        color: '#aaa',
                    },
                },
                axisTick: {
                    length: 0,
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#666',
                    },
                },
                data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    length: 0, // 刻度线的长度
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(115, 156, 204,0.4)',
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#666',
                    },
                },
            },
            series: [
                {
                    name: '纳税',
                    type: 'line',
                    smooth: true,
                    // symbol: 'circle', // 拐点类型
                    // symbolSize: 0, // 拐点圆的大小
                    itemStyle: {
                        normal: {
                            color: '#289df5', // 折线条的颜色
                            borderColor: '#289df5', // 拐点边框颜色
                            areaStyle: {
                                type: 'default',
                                opacity: 0.1,
                            },
                        },
                    },
                    data: [31, 22, 41, 54, 26, 43, 39],
                },
                {
                    name: '营收',
                    type: 'line',
                    smooth: true,
                    // symbol: 'circle',
                    // symbolSize: 0,
                    itemStyle: {
                        normal: {
                            color: '#fbc01b',
                            borderColor: '#fbc01b',
                            areaStyle: {
                                type: 'default',
                                opacity: 0.1,
                            },
                        },
                    },
                    data: [15, 28, 51, 20, 70, 80, 66],
                },
            ],
        }
        // 使用制定的配置项和数据显示图表
        myChart.setOption(option)
    }
    render() {
        return (
            <Card title="园区营收统计" bordered={false} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', right: '30px', top: '15px' }}>
                    <b>选择年份：</b>
                    <YearPicker />
                </div>
                <div ref="barChart" style={{ height: '400px' }} />
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
