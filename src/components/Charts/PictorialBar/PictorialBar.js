import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pictorialBar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import styles from './PictorialBar.module.css'
export default class PictorialBar extends PureComponent {
    static defaultProps = {
        data: {
            names: [],
            values: [],
        },
    }
    static propTypes = {
        data: PropTypes.object,
    }
    componentDidMount = () => {
        this.initChart()
    }
    componentDidUpdate() {
        this.initChart()
    }
    initChart = () => {
        let { names, values } = this.props.data
        let { title } = this.props
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.refs.barChart)
        var option = {
            title: {
                text: title,
                textStyle: {
                    //fontWeight: 'normal',
                    fontSize: 14,
                    //color: '#4991b5',
                },
                left: 6,
            },
            grid: {
                top: 20,
                left: 0,
                //right: 0,
                bottom: 1,
                containLabel: true,
            },
            tooltip: {
                trigger: 'axis',
                //backgroundColor: 'transparent',
                position: function(point, params, dom, rect, size) {
                    // 固定在顶部
                    if (params[0].value > 0) {
                        return [
                            point[0] - size.contentSize[0] / 2,
                            point[1] - size.contentSize[1] - 15,
                        ]
                    } else if (params[0].value < 0) {
                        return [
                            point[0] - size.contentSize[0] / 2,
                            point[1] - size.contentSize[1] + 50,
                        ]
                    }
                },
                formatter: function(params) {
                    var box
                    if (params[0].value > 0) {
                        box =
                            '<div class="tooltipBoxAfter tooltipBoxBlue bottom">' +
                            params[0].name +
                            ':' +
                            params[0].value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') +
                            '</div>'
                    } else if (params[0].value < 0) {
                        box =
                            '<div class="tooltipBoxAfter tooltipBoxRed top">' +
                            params[0].name +
                            ':' +
                            params[0].value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') +
                            '</div>'
                    }
                    return box
                },
                axisPointer: {
                    animation: false,
                    type: 'shadow',
                },
            },
            yAxis: [
                {
                    data: names,
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 1,
                            color: '#477eab',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        formatter: function(label) {
                            //   return chartLableInLine(label)
                            return label.substring(0, 7)
                        },
                        textStyle: {
                            color: '#00B7FD', //rgb(91, 139, 176)
                        },
                    },
                },
            ],
            xAxis: [
                {
                    //min: minNum, //引起x轴问题
                    type: 'value',
                    splitLine: {
                        show: false,
                        interval: 180,
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(115, 156, 204,0.4)',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 1,
                            color: '#477eab',
                        },
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: 'rgb(91, 139, 176)',
                        },
                    },
                },
            ],
            series: [
                {
                    type: 'pictorialBar',
                    symbol: 'rect',
                    symbolClip: 'true',
                    symbolRepeat: 'fixed',
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,254,255,.75)',
                        },
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: '#03f3d0',
                            },
                            formatter: function(label) {
                                return label.value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                            },
                        },
                    },
                    symbolOffset: [3, 0],
                    symbolSize: [2, 10],
                    symbolMargin: 1,
                    z: 10,
                    data: values,
                },
                {
                    type: 'pictorialBar',
                    symbol: 'rect',
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,254,255,.75)',
                            opacity: 0.3,
                        },
                    },
                    symbolRepeat: 'fixed',
                    symbolOffset: [3, 0],
                    symbolMargin: 1,
                    symbolSize: [2, 10],
                    data: values,
                    z: 5,
                },
            ],
        }
        // 绘制图表
        myChart.setOption(option)
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    render() {
        let { style } = this.props
        return <div ref="barChart" className={styles.root} style={style} />
    }
}
