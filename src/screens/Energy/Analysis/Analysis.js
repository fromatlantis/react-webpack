import React, { PureComponent } from 'react'

import { Card, Divider, Row, Col, Statistic, Icon, List, Select, Form } from 'antd'
import { IconFont } from 'components'
import { BarChart, PieChart, LineChart } from 'components/Charts'
import styles from './Analysis.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/meterAnalysis'

const { Option } = Select

const mapStateToProps = state => {
    return {
        latestConsumption: state.meterAnalysis.latestConsumption.map(item => ({
            name: item.month,
            value: item.value,
        })),
        consumption: state.meterAnalysis.consumption,
        topList: state.meterAnalysis.topList,
        taskStatus: state.meterAnalysis.taskStatus,
        latestTask: state.meterAnalysis.latestTask,
        warnings: state.meterAnalysis.warnings,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getLatestConsumption: actions('getLatestConsumption'),
            getConsumptionDistribution: actions('getConsumptionDistribution'),
            getConsumptionTopList: actions('getConsumptionTopList'),
            getTaskStatus: actions('getTaskStatus'),
            getLatestTask: actions('getLatestTask'),
            consumptionWarning: actions('consumptionWarning'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Analysis extends PureComponent {
    state = {
        category: 'water',
        range: '1',
    }
    componentDidMount() {
        const { category, range } = this.state
        this.getChartData({ category, range })
        this.props.getTaskStatus()
        this.props.getLatestTask()
        this.props.consumptionWarning()
    }
    getChartData = params => {
        const { category, range } = params
        this.props.getLatestConsumption({
            category,
            range,
        })
        this.props.getConsumptionDistribution({
            category,
            range,
        })
        this.props.getConsumptionTopList({
            category,
            range,
            limit: 10,
        })
    }
    categoryChange = category => {
        const { range } = this.state
        this.getChartData({ category, range })
        this.setState({
            category,
        })
    }
    rangeChange = range => {
        const { category } = this.state
        this.getChartData({ category, range })
        this.setState({
            range,
        })
    }
    render() {
        const { taskStatus } = this.props
        return (
            <Card bordered={false} style={{ background: '#f0f2f5' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form layout="inline" style={{ marginBottom: '10px' }}>
                            <Form.Item label="类型">
                                <Select
                                    placeholder="表类型"
                                    style={{ width: 160 }}
                                    defaultValue={this.state.category}
                                    onChange={this.categoryChange}
                                >
                                    <Option value="water">水表</Option>
                                    <Option value="ammeter">电表</Option>
                                    <Option value="fuelgas">燃气表</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="时间">
                                <Select
                                    placeholder="时间"
                                    style={{ width: 160 }}
                                    defaultValue={this.state.range}
                                    onChange={this.rangeChange}
                                >
                                    <Option value="1">近一季度</Option>
                                    <Option value="2">近半年</Option>
                                    <Option value="3">近一年</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                        <div className={styles.chartBox}>
                            <div className={styles.chartTitle}>
                                <Divider
                                    style={{ background: '#1890ff', width: '2px' }}
                                    type="vertical"
                                />
                                园区能耗趋势
                            </div>
                            <LineChart data={this.props.latestConsumption} />
                        </div>
                        <div className={styles.chartBox}>
                            <div className={styles.chartTitle}>
                                <Divider
                                    style={{ background: '#1890ff', width: '2px' }}
                                    type="vertical"
                                />
                                用量分布
                            </div>
                            <PieChart data={this.props.consumption} />
                        </div>
                        <div className={styles.chartBox}>
                            <div className={styles.chartTitle}>
                                <Divider
                                    style={{ background: '#1890ff', width: '2px' }}
                                    type="vertical"
                                />
                                用量排名
                            </div>
                            <BarChart data={this.props.topList} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <Row style={{ backgroundColor: '#fff', padding: '25px 0' }}>
                            <Col span={8} style={{ textAlign: 'center' }}>
                                <Statistic
                                    title="抄表任务/项"
                                    value={taskStatus.task}
                                    valueStyle={{ color: '#4098FF' }}
                                    prefix={<IconFont type="iconriji" />}
                                />
                            </Col>
                            <Col span={8} style={{ textAlign: 'center' }}>
                                <Statistic
                                    title="已抄表数/项"
                                    value={taskStatus.taskDone}
                                    valueStyle={{ color: '#FF7792' }}
                                    prefix={<Icon type="like" />}
                                />
                            </Col>
                            <Col span={8} style={{ textAlign: 'center' }}>
                                <Statistic
                                    title="未抄表数/项"
                                    value={taskStatus.taskToDo}
                                    valueStyle={{ color: '#BC79F9' }}
                                    prefix={<IconFont type="iconweiwancheng" />}
                                />
                            </Col>
                        </Row>
                        <div style={{ backgroundColor: '#fff', marginTop: '15px' }}>
                            <div className={styles.chartTitle}>
                                <Divider
                                    style={{ background: '#1890ff', width: '2px' }}
                                    type="vertical"
                                />
                                抄表动态
                            </div>
                            <List
                                style={{ padding: '10px' }}
                                dataSource={this.props.latestTask}
                                renderItem={item => (
                                    <List.Item>
                                        <div style={{ display: 'flex', width: '100%' }}>
                                            <div
                                                style={{
                                                    flex: 1,
                                                    textAlign: 'right',
                                                    padding: '0 20px',
                                                }}
                                            >
                                                {item.description}
                                            </div>
                                            <div>{item.time}</div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                        <div style={{ backgroundColor: '#fff', marginTop: '15px' }}>
                            <div className={styles.chartTitle}>
                                <Divider
                                    style={{ background: '#1890ff', width: '2px' }}
                                    type="vertical"
                                />
                                用量预警
                            </div>
                            <List
                                style={{ padding: '10px' }}
                                dataSource={this.props.warnings}
                                renderItem={item => (
                                    <List.Item>
                                        <div style={{ display: 'flex', width: '100%' }}>
                                            <div>
                                                <b>{item.meter}</b>
                                            </div>
                                            <div
                                                style={{
                                                    flex: 1,
                                                    textAlign: 'right',
                                                    padding: '0 20px',
                                                }}
                                            >
                                                {item.description}
                                            </div>
                                            <div>{item.time}</div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                </Row>
            </Card>
        )
    }
}
export default Analysis
