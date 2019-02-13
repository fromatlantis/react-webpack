import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import styles from './BarChart.module.css';
export default class BarChart extends PureComponent {
    static defaultProps = {
        data: {}
    }
    static propTypes = {
        // data: PropTypes.object,
    }
    componentDidMount = () => {
        this.initChart();
    }
    componentDidUpdate() {
        this.initChart();
    }
    initChart = () => {
        let { data, fullLabel, title } = this.props, cValues, bldata = [];
        let { names, values, } = data;
       
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.refs.barChart);
        var option = {
            title: {
                text: title,
                textStyle: {
                    fontSize: 14,
                },
                left: 6
            },
            legend: {
                data: [{
                    name: '当前',
                    textStyle: {
                        color: '#00ffef'
                    }
                }],
                right: 5,
                top: 5,
            },
            grid: {
                top: 45,
                right: 0,
                left: 10,
                bottom: 0,
                containLabel: true
            },
            tooltip: {},
            xAxis: [{
                type: 'category',
                axisLabel: {
                    formatter: function (label) {
                        return label
                    },
                    margin: 18,
                    textStyle: {
                        color: 'rgb(91, 139, 176)',
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 1,
                        color: '#477eab',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(115, 156, 204,0.4)'
                    }
                },
                data: names,
            },
            {// 比例x轴
                type: 'category',
                axisLabel: {
                    formatter: function (label) {
                        return label
                    },
                    margin: 2,
                    textStyle: {
                        color: 'rgb(91, 139, 176)',
                        fontSize: 10,
                    },
                },
                position: 'bottom',
                data: bldata
            },],
            yAxis: {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#477eab',
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgb(91, 139, 176)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(115, 156, 204,0.4)'
                    }
                }
            },
            series: [{
                name: '当前',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#ffe049' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#f9b43c' // 100% 处的颜色
                        }], false)
                    },
                },
                data: values
            },]
        }
        if (cValues) {
            let cBar = {
                name: '比对',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#ffe049'
                        }, {
                            offset: 1,
                            color: '#f9b43c'
                        }], false)
                    },
                },
                data: cValues
            }
            option.series.unshift(cBar)
            let lg = {
                name: '比对',
                textStyle: {
                    color: '#f9b43c'
                }
            }
            option.legend.data.push(lg)
        }
        if (fullLabel) {
            let axisLabel = option.xAxis[0].axisLabel
            let axisLabel1 = option.xAxis[1].axisLabel
            axisLabel1.interval = 0
            axisLabel.interval = 0
            axisLabel.rotate = 45
        }
        // 绘制图表
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    render() {
        return (
            <div ref="barChart" className={ styles.root } >
            </div>
        )
    }
};
