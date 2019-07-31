import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import { Empty } from 'antd'
import styles from './RevenueChart.module.css'

export default class RevenueChart extends PureComponent {
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
        let { title, styleFlge, unit } = this.props
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
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {},
                },
                {
                    data: [420, 332, 501, 334, 690, 730, 920],
                    type: 'line',
                    areaStyle: {},
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
                <div className={styles.root}>
                    <Empty />
                </div>
            )
        }
    }
}
