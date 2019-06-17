import React, { PureComponent } from 'react'

import { Card, Row, Col } from 'antd'

import { BarChart, PieChart, LineChart } from 'components/Charts'
import styles from './Analysis.module.css'
export default class Analysis extends PureComponent {
    render() {
        return (
            <Card bordered={false} style={{ background: '#f0f2f5' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <div style={{ height: '260px', display: 'flex', marginBottom: '15px' }}>
                            <LineChart
                                data={{ names: ['1', '2', 3], values: ['11', '22', '33'] }}
                            />
                        </div>
                        <div className={styles.chartBox}>
                            <PieChart />
                        </div>
                        <div style={{ height: '260px', display: 'flex' }}>
                            <BarChart data={{ names: ['1', '2', 3], values: ['11', '22', '33'] }} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="gutter-box">col-6</div>
                    </Col>
                </Row>
            </Card>
        )
    }
}
