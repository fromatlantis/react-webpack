import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import styles from './LineChart.css'

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
        this.initChart()
    }
    componentDidUpdate() {
        this.initChart()
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
        let { index, timeData, currentData, basisData } = data
        let { title, styleFlge, unit } = this.props

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
                axisPointer: {
                    lineStyle: {
                        color: '#99617B',
                    },
                },
            },
            legend: {
                icon: 'rect',
                itemWidth: 18,
                itemHeight: 2,
                itemGap: 10,
                data: [
                    {
                        name: '当前',
                        textStyle: {
                            color: '#00febc',
                        },
                    },
                    {
                        name: '比对',
                        textStyle: {
                            color: '#f9b43c',
                        },
                    },
                ],
                right: 45,
                top: 5,
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3',
                },
            },
            grid: {
                top: 45,
                left: 10,
                right: 30,
                bottom: 0,
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: styleFlge ? 18 : 14,
                            color: '#557492',
                            fontWeight: 'normal',
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            width: 1,
                            color: '#477eab',
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(115, 156, 204,0.4)',
                        },
                    },
                    data: timeData,
                },
            ],
            yAxis: [
                {
                    name: styleFlge ? unit : '',
                    type: 'value',
                    // name: '单位（%）',
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            width: 1,
                            color: '#477eab',
                        },
                    },
                    axisLabel: {
                        //margin: 10,
                        textStyle: {
                            fontSize: styleFlge ? 16 : 12,
                            color: '#557492',
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
                    name: '当前',
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            color: '#00febc',
                            width: 4,
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
                            color: '#00EBE7',
                            borderColor: 'rgba(0,136,212,0.2)',
                            borderWidth: 12,
                        },
                    },
                    data: currentData,
                },
                {
                    name: '比对',
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            color: '#f9b43c',
                            width: 4,
                        },
                    },
                    // areaStyle: {
                    //     normal: {
                    //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //             offset: 0,
                    //             color: 'rgba(137, 189, 27, 1)'
                    //         }, {
                    //             offset: 1,
                    //             color: 'rgba(137, 189, 27, 0)'
                    //         }], false),
                    //     }
                    // },
                    itemStyle: {
                        normal: {
                            color: '#f9b43c',
                            borderColor: 'rgba(137,189,2,0.27)',
                            borderWidth: 12,
                        },
                    },
                    data: basisData,
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
        let { style } = this.props
        return <div ref="lineChart" className={styles.root} style={style} />
    }
}
