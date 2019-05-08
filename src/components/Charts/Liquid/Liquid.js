import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts-liquidfill'
import styles from './Liquid.module.css'
export default class Liquid extends PureComponent {
    static defaultProps = {
        data: {
            bl: 0,
            color: 'green',
        },
    }
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.object,
    }
    componentDidMount() {
        // liquidFill颜色不动态刷新bug
        this.initChart()
    }
    componentDidUpdate() {
        this.initChart()
    }
    initChart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.refs.liquidPie)
        // 绘制图
        let option = this.getOption()
        myChart.setOption(option)
        window.addEventListener('resize', () => {
            myChart.resize()
        })
    }
    getOption = () => {
        let { title } = this.props
        let liquidColor = ['rgba(75,165,250,.5)', 'rgba(75,165,250,1)']
        let option = {
            title: {
                text: title,
                textStyle: {
                    fontSize: 14,
                },
                left: 6,
            },
            grid: {
                left: '50%',
            },
            series: [
                {
                    type: 'liquidFill',
                    radius: '65%',
                    tooltip: {
                        show: true,
                    },
                    backgroundStyle: {
                        //borderWidth: 1,
                        //borderColor: 'rgb(75,165,250)',
                        color: '#ffffff',
                    },
                    center: ['50%', '50%'],
                    color: [
                        new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    // 0% 处的颜色
                                    offset: 0,
                                    color: liquidColor[0],
                                },
                                {
                                    // 100% 处的颜色
                                    offset: 1,
                                    color: liquidColor[1],
                                },
                            ],
                            false,
                        ),
                    ],
                    data: [
                        {
                            name: 'CPU已占用',
                            value: 0.35,
                        },
                    ],
                    label: {
                        normal: {
                            formatter: '{b}:\n{c}',
                            textStyle: {
                                fontSize: 14,
                            },
                        },
                    },
                    outline: {
                        borderDistance: 3,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: 'rgb(75,165,250)',
                        },
                    },
                },
            ],
        }
        return option
    }
    render() {
        return <div ref="liquidPie" className={styles.root} />
    }
}
