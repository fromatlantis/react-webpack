import React, { PureComponent } from 'react'
import { DatePicker } from 'antd'

export default class YearPicker extends PureComponent {
    state = {
        isopen: false,
        time: null,
    }
    handlePanelChange = value => {
        console.log('>>>>>', value)
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
        return (
            <DatePicker
                value={this.state.time}
                open={this.state.isopen}
                mode="year"
                placeholder="请选择年份"
                format="YYYY"
                onOpenChange={this.handleOpenChange}
                onPanelChange={this.handlePanelChange}
                onChange={this.clearValue}
            />
        )
    }
}
