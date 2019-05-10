/**
 * 企服首页/企业详情==> Relation 企业关系
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Button } from 'antd'
import { Graph } from 'components'
import styles from '../CompanyDetails.module.css'

export default class Relation extends PureComponent {
    state = {
        elements: {},
    }
    componentDidMount() {
        import('./mock').then(data => {
            let result = data.default
            const nodes = result.nodes.map(node => ({
                data: node,
            }))
            const edges = result.relationships.map(rs => ({
                data: {
                    id: rs.id,
                    source: rs.startNode,
                    target: rs.endNode,
                },
            }))
            this.setState({
                elements: { nodes, edges },
            })
        })
    }

    render() {
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="relation:1"
                        title={<span style={{ color: '#1890ff' }}>企业图谱</span>}
                        extra={<Button type="link">展开更多>></Button>}
                        className={styles.cardSty}
                    >
                        <div style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
                            <Graph elements={this.state.elements} />
                        </div>
                    </Card>
                    <Card
                        id="relation:2"
                        title={<span style={{ color: '#1890ff' }}>投资图谱</span>}
                        extra={<Button type="link">展开更多>></Button>}
                        className={styles.cardSty}
                    />
                </div>
            </Fragment>
        )
    }
}
