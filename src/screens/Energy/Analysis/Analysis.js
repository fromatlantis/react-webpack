import React, { PureComponent } from 'react'

import { Card, Divider, Row, Col, Statistic, Icon, List, Select, Form } from 'antd'

import { BarChart, PieChart, LineChart } from 'components/Charts'
import styles from './Analysis.module.css'

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
]
const { Option } = Select

export default class Analysis extends PureComponent {
    render() {
        return (
            <Card bordered={false} style={{ background: '#f0f2f5' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form layout="inline" style={{ marginBottom: '10px' }}>
                            <Form.Item label="类型">
                                <Select
                                    placeholder="表类型"
                                    style={{ width: 160 }}
                                    defaultValue="2"
                                >
                                    <Option value="2">水表</Option>
                                    <Option value="3">电表</Option>
                                    <Option value="4">燃气表</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="时间">
                                <Select placeholder="时间" style={{ width: 160 }} defaultValue="2">
                                    <Option value="2">近一季度</Option>
                                    <Option value="3">近半年</Option>
                                    <Option value="4">近一年</Option>
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
                            <LineChart
                                data={{ names: ['1', '2', 3], values: ['11', '22', '33'] }}
                            />
                        </div>
                        <div className={styles.chartBox}>
                            <div className={styles.chartTitle}>
                                <Divider
                                    style={{ background: '#1890ff', width: '2px' }}
                                    type="vertical"
                                />
                                用量分布
                            </div>
                            <PieChart
                                data={[
                                    { name: '1', value: '11' },
                                    { name: '2', value: '22' },
                                    { name: '3', value: '33' },
                                ]}
                            />
                        </div>
                        <div className={styles.chartBox}>
                            <div className={styles.chartTitle}>
                                <Divider
                                    style={{ background: '#1890ff', width: '2px' }}
                                    type="vertical"
                                />
                                用量排名
                            </div>
                            <BarChart data={{ names: ['1', '2', 3], values: ['11', '22', '33'] }} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <Row style={{ backgroundColor: '#fff', padding: '25px 0' }}>
                            <Col span={8} style={{ textAlign: 'center' }}>
                                <Statistic
                                    title="抄表任务/项"
                                    value={1128}
                                    valueStyle={{ color: '#4098FF' }}
                                    prefix={<Icon type="like" />}
                                />
                            </Col>
                            <Col span={8} style={{ textAlign: 'center' }}>
                                <Statistic
                                    title="已抄表数/项"
                                    value={93}
                                    valueStyle={{ color: '#FF7792' }}
                                />
                            </Col>
                            <Col span={8} style={{ textAlign: 'center' }}>
                                <Statistic
                                    title="未抄表数/项"
                                    value={93}
                                    valueStyle={{ color: '#BC79F9' }}
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
                                dataSource={data}
                                renderItem={item => <List.Item>{item}</List.Item>}
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
                                dataSource={data}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </div>
                    </Col>
                </Row>
            </Card>
        )
    }
}
