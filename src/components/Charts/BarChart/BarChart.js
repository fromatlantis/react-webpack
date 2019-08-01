import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
import { Empty } from 'antd'
import styles from './BarChart.module.css'
export default class BarChart extends PureComponent {
    static defaultProps = {
        direction: 'column',
        data: [],
    }
    static propTypes = {
        data: PropTypes.array,
    }
    componentDidMount = () => {
        if (this.refs.barChart) {
            this.initChart()
        }
    }
    componentDidUpdate() {
        if (this.refs.barChart) {
            this.initChart()
        }
    }
    initChart = () => {
        let { data, fullLabel, title, direction, dataZoom } = this.props,
            cValues
        let names = [],
            values = []
        data.map(x => {
            names.push(x.name)
            values.push(x.value)
            return true
        })
        // 分类轴
        let categoryOption = {
            type: 'category',
            axisLine: {
                lineStyle: {
                    width: 1,
                    color: '#666',
                },
            },
            axisLabel: {},
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(115, 156, 204,0.4)',
                },
            },
            data: names,
        }
        // 数值轴
        let valueOption = {
            type: 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: '#666',
                },
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(115, 156, 204,0.4)',
                },
            },
        }
        if (fullLabel) {
            let axisLabel = categoryOption.axisLabel
            //let axisLabel1 = option.xAxis[1].axisLabel
            //axisLabel1.interval = 0
            axisLabel.interval = 0
            axisLabel.rotate = 45
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.refs.barChart)
        var option = {
            title: {
                text: title,
                textStyle: {
                    fontSize: 14,
                },
                left: 6,
            },
            legend: {
                data: [
                    {
                        name: '',
                    },
                ],
                right: 5,
                top: 5,
            },
            grid: {
                top: title ? 50 : 10,
                right: 10,
                left: 10,
                bottom: dataZoom ? 50 : 10,
                containLabel: true,
            },
            tooltip: {},
            ...(dataZoom
                ? {
                      dataZoom: [
                          {
                              type: 'slider',
                          },
                      ],
                  }
                : null),
            xAxis: direction === 'row' ? valueOption : categoryOption,
            yAxis: direction === 'row' ? categoryOption : valueOption,
            series: [
                {
                    type: 'bar',
                    barWidth: '60%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: '#4ecac8', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#4ba6f9', // 100% 处的颜色
                                    },
                                ],
                                false,
                            ),
                        },
                    },
                    data: data,
                },
            ],
        }
        if (cValues) {
            let cBar = {
                name: '比对',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: '#ffe049',
                                },
                                {
                                    offset: 1,
                                    color: '#f9b43c',
                                },
                            ],
                            false,
                        ),
                    },
                },
                data: cValues,
            }
            option.series.unshift(cBar)
            let lg = {
                name: '比对',
                textStyle: {
                    color: '#f9b43c',
                },
            }
            option.legend.data.push(lg)
        }

        // 绘制图表
        myChart.setOption(option)
        myChart.on('click', params => {
            if (this.props.handleClick) {
                this.props.handleClick(params)
            }
        })
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    render() {
        const { data } = this.props
        if (data && data.length > 0) {
            return <div ref="barChart" className={styles.root} />
        } else {
            return (
                <div className={styles.root}>
                    <Empty />
                </div>
            )
        }
    }
}
