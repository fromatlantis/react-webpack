/**
 * 企服首页/企业详情==> Relation 企业关系
 */
import React, { PureComponent, Fragment } from 'react'
import { Card } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/companyDetails'
import { Graph } from 'components'
import styles from '../CompanyDetails.module.css'

@connect(
    state => {
        return {
            FirmGraph: state.companyDetails.FirmGraph, //指定企业投资图谱
            BasicInfoDetial: state.companyDetails.BasicInfoDetial, //企业详情信息
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getFirmGraph: actions('getFirmGraph'),
            },
            dispatch,
        )
    },
)
class Relation extends PureComponent {
    state = {
        elements: {},
    }
    //生命周期
    componentDidMount = () => {
        let company_id = this.props.match
            ? this.props.match.params.company_id
            : this.props.company_id
        //投资图谱
        this.props.getFirmGraph(company_id)

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
        // console.log('this.props.FirmGraph', this.props.FirmGraph)
        // 2353058204
        let company_id = this.props.match
            ? this.props.match.params.company_id
            : this.props.company_id
        const FirmGraph = this.props.FirmGraph
        const nodes =
            FirmGraph.nodes &&
            FirmGraph.nodes.map(node => ({
                data: node,
            }))
        const edges =
            FirmGraph.relationships &&
            FirmGraph.relationships.map(rs => ({
                data: {
                    id: rs.id,
                    source: rs.startNode,
                    target: rs.endNode,
                },
            }))
        const upFirmGraph = { nodes, edges }
        let company_Id = 0
        let elementscompany_Id = 0
        for (let i in upFirmGraph.nodes) {
            if (upFirmGraph.nodes[i].data.properties.name == this.props.BasicInfoDetial.name) {
                company_Id = upFirmGraph.nodes[i].data.id
            }
        }
        // for (let i in this.state.elements.nodes) {
        //     console.log(this.state.elements.nodes[i].data.properties.name)
        //     if (
        //         this.state.elements.nodes[i].data.properties.name == this.props.BasicInfoDetial.name
        //     ) {
        //         elementscompany_Id = this.state.elements.nodes[i].data.id
        //     }
        // }
        // console.log(
        //     elementscompany_Id,
        //     'elementscompany_Idelementscompany_Idelementscompany_Idelementscompany_Id',
        // )
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="relation:1"
                        tabList={[{ key: '企业图谱', tab: '企业图谱' }]}
                        className={styles.cardSty}
                    >
                        <div style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
                            {/* <Graph elements={this.state.elements} company_Id={elementscompany_Id} /> */}
                        </div>
                    </Card>
                    <Card
                        id="relation:2"
                        tabList={[{ key: '投资图谱', tab: '投资图谱' }]}
                        className={styles.cardSty}
                    >
                        <div style={{ height: '750px', display: 'flex', flexDirection: 'column' }}>
                            <Graph elements={upFirmGraph} company_Id={company_Id} />
                        </div>
                    </Card>
                </div>
            </Fragment>
        )
    }
}
export default Relation
