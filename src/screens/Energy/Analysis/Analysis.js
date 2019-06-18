import React, { PureComponent } from 'react'

import { Card, Divider, Row, Col } from 'antd'

import { BarChart, PieChart, LineChart } from 'components/Charts'
import styles from './Analysis.module.css'
export default class Analysis extends PureComponent {
    render() {
        return (
            <Card bordered={false} style={{ background: '#f0f2f5' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <div className={styles.chartBox}>
                            <LineChart
                                title="园区能耗趋势"
                                data={{ names: ['1', '2', 3], values: ['11', '22', '33'] }}
                            />
                        </div>
                        <div className={styles.chartBox}>
                            <PieChart
                                data={[{ name: '1', value: '11' }, { name: '2', value: '22' }]}
                            />
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
