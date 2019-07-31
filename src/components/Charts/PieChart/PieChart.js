import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/toolbox'
import { Empty } from 'antd'
import styles from './PieChart.module.css'

export default class PieChart extends PureComponent {
    static defaultProps = {
        data: [],
    }
    static propTypes = {
        data: PropTypes.array,
    }
    componentDidMount = () => {
        if (this.refs.pieChart) {
            this.initChart()
        }
    }
    componentWillReceiveProps = nextProps => {
        if (this.refs.pieChart) {
            this.initChart()
        }
    }
    initChart = props => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.refs.pieChart)
        let option = this.setOption(props ? props : this.props)
        // 绘制图表
        myChart.setOption(option)
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    setOption = props => {
        let { title, data, hollow } = props,
            names = []
        data.map(x => {
            let item = {
                name: x.name,
                icon: 'circle',
            }
            names.push(item)
            return true
        })
        var option = {
            title: {
                text: title,
                textStyle: {
                    //fontWeight: 'normal',
                    fontSize: 14,
                },
                left: 6,
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)',
            },
            // toolbox: {
            //     show: true,
            //     right: 20,
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            legend: {
                bottom: 0,
                // orient: 'vertical',
                left: 'left',
                itemWidth: 10,
                data: names,
            },
            grid: {
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
                containLabel: true,
            },
            series: [
                {
                    name: '比例',
                    type: 'pie',
                    radius: [hollow ? '40%' : '0%', '40%'],
                    color: [
                        '#ec5b48',
                        '#f48138',
                        '#fbc42e',
                        '#ebeb3b',
                        '#abc931',
                        '#69af47',
                        '#5ad478',
                        '#58e4a6',
                        '#69f7f6',
                        '#4cc3fd',
                        '#3d84f9',
                        '#4ba6f9',
                        '#4ecac8',
                    ].reverse(),
                    data: data,
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            borderColor: '#fff',
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        }
        return option
    }
    render() {
        const { data } = this.props
        if (data && data.length > 0) {
            return <div ref="pieChart" className={styles.root} />
        } else {
            return (
                <div className={styles.root}>
                    <Empty />
                </div>
            )
        }
    }
}
