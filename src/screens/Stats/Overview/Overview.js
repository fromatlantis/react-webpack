import React, { PureComponent } from 'react'
import { Card, Col, Row, Statistic } from 'antd'
import { YearPicker } from 'components'
import styles from '../Stats.module.css'
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
                                <Col span={12}>123</Col>
                                <Col span={12}>456</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Card bordered={false} title="融资趋势" style={{ flex: 1 }}>
                                123
                            </Card>
                            <Card
                                bordered={false}
                                title="企业资质"
                                style={{ marginTop: '12px', flex: 1 }}
                            >
                                123
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: '12px' }} gutter={12}>
                    <Col span={8}>
                        <Card bordered={false} title="人才建设">
                            123
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} title="行业分布">
                            456
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} title="营收和纳税情况">
                            789
                        </Card>
                    </Col>
                </Row>
            </Card>
        )
    }
}
