import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/overview'
import styles from './Overview.module.css'
import { Select, Divider } from 'antd'
import { BarChart, LineChart } from 'components/Charts'
import SettleChart from '../Settle/SettleChart'

const { Option } = Select
const mapStateToProps = state => {
    return {
        amountStatistic: state.overview.amountStatistic,
        typeStatistic: state.overview.typeStatistic.map(item => {
            item.name = item.type
            item.value = item.count
            return item
        }),
        upStatusStatistic: state.overview.upStatusStatistic,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            chargeAmountStatistic: actions('chargeAmountStatistic'),
            chargeTypeStatistic: actions('chargeTypeStatistic'),
            squareUpStatusStatistic: actions('squareUpStatusStatistic'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Overview extends PureComponent {
    state = {
        range: '0',
    }
    componentDidMount() {
        const range = this.state.range
        this.renderData({ range })
    }
    renderData = params => {
        const { chargeAmountStatistic, chargeTypeStatistic, squareUpStatusStatistic } = this.props
        chargeAmountStatistic(params)
        chargeTypeStatistic(params)
        squareUpStatusStatistic(params)
    }
    handleChange = value => {
        this.setState({ range: value })
        this.renderData({ range: value })
    }

    render() {
        const { amountStatistic, typeStatistic, upStatusStatistic } = this.props
        return (
            <div>
                <div className={styles.selectTime}>
                    <div style={{ marginTop: '6px' }}>选择时间：</div>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择"
                        onChange={this.handleChange}
                    >
                        <Option value="1">近一个月</Option>
                        <Option value="2">近六个月</Option>
                        <Option value="3">近一年</Option>
                    </Select>
                </div>
                <div className={styles.body}>
                    <div className={styles.amountStatistic}>
                        {amountStatistic.shouldReceive == '0' ? (
                            <div className={styles.grey}>
                                <div className={styles.zero}>0</div>
                                <div className={styles.zerotitle}>应收/元</div>
                            </div>
                        ) : (
                            <div className={styles.bluerec}>
                                <div className={styles.blueFont}>
                                    {new Number(amountStatistic.shouldReceive).toFixed(2)}
                                </div>
                                <div className={styles.smalltitle}>应收/元</div>
                            </div>
                        )}
                        {amountStatistic.realReceive == '0' ? (
                            <div className={styles.grey}>
                                <div className={styles.zero}>0</div>
                                <div className={styles.zerotitle}>实收/元</div>
                            </div>
                        ) : (
                            <div className={styles.pinkrec}>
                                <div className={styles.pinkFont}>
                                    {new Number(amountStatistic.realReceive).toFixed(2)}
                                </div>
                                <div className={styles.smalltitle}>实收/元</div>
                            </div>
                        )}
                        {amountStatistic.squaredUpCount == '0' ? (
                            <div className={styles.grey}>
                                <div className={styles.zero}>0</div>
                                <div className={styles.zerotitle}>已结清笔数/笔</div>
                            </div>
                        ) : (
                            <div className={styles.bluerec}>
                                <div className={styles.blueFont}>
                                    {amountStatistic.squaredUpCount}
                                </div>
                                <div className={styles.smalltitle}>已结清笔数/笔</div>
                            </div>
                        )}
                        {amountStatistic.notSquaredUpCount == '0' ? (
                            <div className={styles.grey}>
                                <div className={styles.zero}>0</div>
                                <div className={styles.zerotitle}>未结清笔数/笔</div>
                            </div>
                        ) : (
                            <div className={styles.pinkrec}>
                                <div className={styles.pinkFont}>
                                    {amountStatistic.notSquaredUpCount}
                                </div>
                                <div className={styles.smalltitle}>未结清笔数/笔</div>
                            </div>
                        )}
                    </div>
                    <div className={styles.title}>
                        <Divider className={styles.driver} type="vertical" />
                        费用类型统计
                    </div>
                    <div style={{ height: '400px', marginTop: '30px' }}>
                        <BarChart direction="row" data={typeStatistic} />
                    </div>
                    <div className={styles.title} style={{ marginTop: '40px' }}>
                        <Divider className={styles.driver} type="vertical" />
                        结清情况统计
                    </div>
                    <div style={{ height: '400px' }}>
                        <SettleChart titleTop data={upStatusStatistic} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Overview
