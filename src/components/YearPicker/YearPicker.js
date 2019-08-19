import React, { PureComponent } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
export default class YearPicker extends PureComponent {
    state = {
        isopen: false,
        time: null,
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // Should be a controlled component.
        if (nextProps.onChange && nextProps.value !== prevState.time) {
            return {
                time: nextProps.value,
            }
        }
        return null
    }
    handlePanelChange = value => {
        console.log('>>>>>', value)
        if (this.props.onChange) {
            this.props.onChange(value)
        }
        this.setState({
            time: value,
            isopen: false,
        })
    }
    handleOpenChange = status => {
        // console.log(status)
        if (status) {
            this.setState({ isopen: true })
        } else {
            this.setState({ isopen: false })
        }
    }
    clearValue = () => {
        this.setState({
            time: null,
        })
    }
    render() {
        console.log(this.state.time)
        return (
            <DatePicker
                value={this.state.time}
                open={this.state.isopen}
                mode="year"
                placeholder="请选择年份"
                format="YYYY"
                allowClear={false}
                onOpenChange={this.handleOpenChange}
                onPanelChange={this.handlePanelChange}
                onChange={this.clearValue}
            />
        )
    }
}
