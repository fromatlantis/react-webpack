import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import { Empty } from 'antd'
import styles from './LineChart.module.css'

export default class LineChart extends PureComponent {
    static defaultProps = {
        data: {
            timeData: [],
            currentData: [],
            basisData: [],
            title: '',
            styleFlge: false,
        },
    }
    static propTypes = {
        data: PropTypes.object,
        styleFlge: PropTypes.string,
        unit: PropTypes.string,
    }
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
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.refs.lineChart)
        let option = this.setOption(data)
        // 绘制图表
        myChart.setOption(option)
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    setOption = data => {
        let { title, styleFlge, unit, titleTop } = this.props
        let names = [],
            values = []
        data.map(x => {
            names.push(x.name)
            values.push(x.value)
            return true
        })
        var option = {
            title: {
                text: title,
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: styleFlge ? 18 : 14,
                    color: '#4991b5',
                },
                left: 6,
                top: styleFlge ? -5 : 0,
            },
            tooltip: {
                trigger: 'axis',
                // axisPointer: {
                //     lineStyle: {
                //         color: '#99617B',
                //     },
                // },
            },
            grid: {
                top: titleTop ? 50 : 0,
                right: 10,
                left: 10,
                bottom: 10,
                containLabel: true,
            },
            xAxis: [
                {
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
                },
            ],
            yAxis: [
                {
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
                },
            ],
            series: [
                {
                    type: 'line',
                    smooth: true,
                    // symbol: 'circle',
                    lineStyle: {
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
                            // width: 2,
                        },
                    },
                    // areaStyle: {
                    //     normal: {
                    //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //             offset: 0,
                    //             color: 'rgba(0, 136, 212, 1)'
                    //         }, {
                    //             offset: 1,
                    //             color: 'rgba(0, 136, 212, 0)'
                    //         }], false),
                    //     }
                    // },
                    itemStyle: {
                        normal: {
                            color: '#4ba6f9',
                            borderColor: new echarts.graphic.LinearGradient(
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
                            borderWidth: 1,
                        },
                    },
                    data: values,
                },
            ],
        }
        // 首页不加保存按钮
        if (title && !styleFlge) {
            option.toolbox = {
                show: true,
                right: 20,
                feature: {
                    saveAsImage: {},
                },
            }
        }
        return option
    }
    render() {
        let { style, data } = this.props
        if (data && data.length > 0) {
            return <div ref="lineChart" className={styles.root} style={style} />
        } else {
            return (
                <ul className={styles.root}>
                    <Empty />
                </ul>
            )
        }
    }
}
