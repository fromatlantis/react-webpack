import React, { PureComponent } from 'react'
import { Transfer, Switch } from 'antd'

const mockData = []
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    })
}

const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key)

export default class TransferView extends React.PureComponent {
    state = {
        targetKeys: [],
        selectedKeys: [],
        disabled: false,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            const ids = nextProps.data.filter(item => item.isAssigned).map(item => item.id)
            this.setState({
                targetKeys: ids,
                selectedKeys: ids,
            })
        }
    }

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys })
        //this.props.onChange(nextTargetKeys)
        console.log('targetKeys: ', nextTargetKeys)
        console.log('direction: ', direction)
        console.log('moveKeys: ', moveKeys)
    }

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] })

        console.log('sourceSelectedKeys: ', sourceSelectedKeys)
        console.log('targetSelectedKeys: ', targetSelectedKeys)
    }

    handleScroll = (direction, e) => {
        console.log('direction:', direction)
        console.log('target:', e.target)
    }

    handleDisable = disabled => {
        this.setState({ disabled })
    }
    filterOption = (inputValue, option) => option.name.indexOf(inputValue) > -1
    render() {
        const { targetKeys, selectedKeys, disabled } = this.state
        return (
            <div>
                <Transfer
                    listStyle={{ height: 360, width: 200 }}
                    rowKey={record => record.id}
                    showSearch
                    filterOption={this.filterOption}
                    dataSource={this.props.data}
                    titles={this.props.titles}
                    operations={['添加', '移除']}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    //onScroll={this.handleScroll}
                    render={record => record.name}
                    disabled={disabled}
                />
            </div>
        )
    }
}
