import React, { PureComponent } from 'react'
import { Card, Col, Divider, Row, Statistic } from 'antd'
import { YearPicker } from 'components'
import { BarChart, LineChart, PieChart } from 'components/Charts'
import RevenueChart from './RevenueChart'
import styles from '../Stats.module.css'
const data = [
    {
        name: '网站域名',
        value: 100,
    },
    {
        name: '软件著作权',
        value: 100,
    },
    {
        name: '作品著作权',
        value: 100,
    },
    {
        name: '专利',
        value: 100,
    },
    {
        name: '商标',
        value: 100,
    },
]
export default class Overview extends PureComponent {
    render() {
        return (
            <Card
                bordered={false}
                title=""
                style={{ background: '#f0f2f5' }}
                bodyStyle={{ padding: '12px' }}
            >
                <b>统计时间段：</b>
                <YearPicker />
                <Row style={{ marginTop: '12px' }} gutter={12}>
                    <Col span={16}>
                        <Card bordered={false} title="企业分析">
                            <div className={styles.nums}>
                                <Statistic title="Feedback" value={1128} />
                                <Statistic title="Feedback" value={1128} />
                                <Statistic title="Feedback" value={1128} />
                                <Statistic title="Feedback" value={1128} />
                            </div>
                            <div className={styles.nums}>
                                <Statistic title="Feedback" value={1128} />
                                <Statistic title="Feedback" value={1128} />
                                <Statistic title="Feedback" value={1128} />
                                <Statistic title="Feedback" value={1128} />
                            </div>
                            <Row>
                                <Col span={12} className={styles.card}>
                                    <div className={styles.title}>
                                        <Divider
                                            style={{ background: '#1890ff', width: '2px' }}
                                            type="vertical"
                                        />
                                        引进企业数量统计
                                    </div>
                                    <BarChart data={[{ name: '123', value: '123' }]} />
                                </Col>
                                <Col span={12} className={styles.card}>
                                    <div className={styles.title}>
                                        <Divider
                                            style={{ background: '#1890ff', width: '2px' }}
                                            type="vertical"
                                        />
                                        知识产权分布
                                    </div>
                                    <PieChart data={data} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} title="融资趋势">
                            <div style={{ height: '230px', display: 'flex' }}>
                                <LineChart data={data} />
                            </div>
                        </Card>
                        <Card
                            bordered={false}
                            title="企业资质"
                            style={{ marginTop: '12px', height: '280px' }}
                        >
                            123
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginTop: '12px' }} gutter={12}>
                    <Col span={8}>
                        <Card bordered={false} title="人才建设">
                            <div className={styles.card}>
                                <PieChart data={data} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} title="行业分布">
                            <div className={styles.card}>
                                <PieChart data={data} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} title="营收和纳税情况">
                            <div className={styles.card}>
                                <RevenueChart data={data} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Card>
        )
    }
}
