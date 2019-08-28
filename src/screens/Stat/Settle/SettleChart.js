import React, { PureComponent } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import { Empty } from 'antd'

export default class SettleChart extends PureComponent {
    componentDidMount = () => {
        if (this.refs.lineChart) {
            this.initChart()
        }
    }
    componentDidUpdate() {
        if (this.refs.lineChart) {
            this.initChart()
        }
    }
    initChart = () => {
        let { data } = this.props
        let dataSeries = [],
            done = [],
            todo = []
        data.map(item => {
            dataSeries.push(item.month)
            done.push(item.squareUpCount)
            todo.push(item.notSquaredUpCount)
        })
        var myChart = echarts.init(this.refs.lineChart)
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
                    // interval: 0,
                    textStyle: {
                        color: '#666',
                    },
                },
                data: dataSeries,
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
                    name: '已结清',
                    type: 'line',
                    // smooth: true,
                    // symbol: 'circle', // 拐点类型
                    // symbolSize: 0, // 拐点圆的大小
                    itemStyle: {
                        normal: {
                            color: '#188FFD', // 折线条的颜色
                            borderColor: '#188FFD', // 拐点边框颜色
                            // areaStyle: {
                            //     type: 'default',
                            //     opacity: 0.2,
                            // }, //面积
                        },
                    },
                    data: done,
                },
                {
                    name: '未结清',
                    type: 'line',
                    // smooth: true,
                    // symbol: 'circle',
                    // symbolSize: 0,
                    itemStyle: {
                        normal: {
                            color: '#BC79F9',
                            borderColor: '#BC79F9',
                            // areaStyle: {
                            //     type: 'default',
                            //     opacity: 0.2,
                            // }, //面积
                        },
                    },
                    data: todo,
                },
            ],
        }
        // 使用制定的配置项和数据显示图表
        myChart.setOption(option)
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    render() {
        const { data } = this.props
        if (data && data.length > 0) {
            return <div ref="lineChart" style={{ flex: 1, padding: '5px', height: '100%' }} />
        } else {
            return (
                <div
                    style={{
                        flex: 1,
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Empty />
                </div>
            )
        }
    }
}
