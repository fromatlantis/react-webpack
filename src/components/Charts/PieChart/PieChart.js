import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/toolbox';
import styles from './PieChart.module.css';

export default class PieChart extends PureComponent {
    static defaultProps = {
        data: []
    }
    static propTypes = {
        data: PropTypes.array
    }
    componentDidMount = () => {
        this.initChart()
    }
    componentWillReceiveProps = (nextProps) => {
        this.initChart(nextProps)
    }
    initChart = (props) => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.refs.pieChart);
        let option = this.setOption(props ? props : this.props);
        // 绘制图表
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    setOption = (props) => {
        let { title, data, hollow } = props, names = []
        data.map((x) => {
            names.push(x.name)
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

                // "{a} <br/>{b} : {c} ({d}%)"
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
                left: 'center',
                data: names
            },
            grid: {
                top: 45,
                right: 0,
                left: 10,
                bottom: 0,
                containLabel: true
            },
            series: [
                {
                    name: '比例',
                    type: 'pie',
                    radius: [hollow ? '40%' : '0%', '60%'],
                    color: ['#ec5b48', '#f48138', '#fbc42e', '#ebeb3b', '#abc931', '#69af47', '#5ad478', '#58e4a6', '#69f7f6', '#4cc3fd', '#3d84f9'].reverse(),
                    data: data,
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            borderColor: '#fff'
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                }
            ]
        };
        return option
    }
    render() {
        return (
            <div ref="pieChart" className={styles.root}>
            </div>
        )
    }
};
