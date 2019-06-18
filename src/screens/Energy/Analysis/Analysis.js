import React, { PureComponent } from 'react'

import { Card, Divider, Row, Col, Statistic, Icon } from 'antd'

import { BarChart, PieChart, LineChart } from 'components/Charts'
import styles from './Analysis.module.css'
export default class Analysis extends PureComponent {
    render() {
        return (
            <Card bordered={false} style={{ background: '#f0f2f5' }}>
                <Row gutter={16}>
                    <Col span={12}>
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
                    </Col>
                </Row>
            </Card>
        )
    }
}
