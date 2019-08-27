import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/overview'
import styles from './Overview.module.css'
import { Select, Divider } from 'antd'
import { BarChart } from 'components/Charts'

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
        range: '3',
    }
    componentDidMount() {
        const range = this.state.range
        this.renderData({ range })
    }
    renderData = params => {
        const { chargeAmountStatistic, chargeTypeStatistic } = this.props
        chargeAmountStatistic(params)
        chargeTypeStatistic(params)
    }
    onChange(value) {
        console.log(`selected ${value}`)
    }
    onBlur() {
        console.log('blur')
    }
    onFocus() {
        console.log('focus')
    }
    onSearch(val) {
        console.log('search:', val)
    }
    render() {
        const { amountStatistic, typeStatistic } = this.props
        return (
            <div>
                <div className={styles.selectTime}>
                    <div style={{ marginTop: '6px' }}>选择时间：</div>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择"
                        optionFilterProp="children"
                        onChange={() => this.onChange()}
                        // onFocus={() => this.onFocus()}
                        // onBlur={() => this.onBlur()}
                        onSearch={() => this.onSearch()}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="1">近一个月</Option>
                        <Option value="2">近六个月</Option>
                        <Option value="3">近一年</Option>
                    </Select>
                </div>
                <div className={styles.body}>
                    <div className={styles.amountStatistic}>
                        <div className={styles.bluerec}>
                            <div className={styles.blueFont}>{amountStatistic.shouldReceive}</div>
                            <div className={styles.smalltitle}>应收/元</div>
                        </div>
                        <div className={styles.pinkrec}>
                            <div className={styles.pinkFont}>{amountStatistic.realReceive}</div>
                            <div className={styles.smalltitle}>实收/元</div>
                        </div>
                        <div className={styles.bluerec}>
                            <div className={styles.blueFont}>{amountStatistic.squaredUpCount}</div>
                            <div className={styles.smalltitle}>已结清笔数/笔</div>
                        </div>
                        <div className={styles.pinkrec}>
                            <div className={styles.pinkFont}>
                                {amountStatistic.notSquaredUpCount}
                            </div>
                            <div className={styles.smalltitle}>未结清笔数/笔</div>
                        </div>
                    </div>
                    <div className={styles.title}>
                        <Divider className={styles.driver} type="vertical" />
                        费用类型统计
                    </div>
                    <div style={{ height: '400px', marginTop: '50px' }}>
                        <BarChart data={typeStatistic} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Overview
