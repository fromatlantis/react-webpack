import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Configure.module.css'
import { Tabs, Input, Tag, Tooltip, Icon, Modal } from 'antd'

const { TabPane } = Tabs
const { confirm } = Modal
function callback(key) {
    console.log(key)
}
export default class Configure extends PureComponent {
    state = {
        tags: ['清华控股企业', '标签一', '标签二', '标签三', '标签四', '标签五'],
        inputVisible: false,
        inputValue: '',
    }
    handleClose = (removedTag, that) => {
        confirm({
            title: '确定删除？',
            content: '标签已关联企业，删除后企业将不具有此标签',
            onOk() {
                const tags = that.state.tags.filter(tag => tag !== removedTag)
                console.log(tags)
                that.setState({ tags })
            },
            onCancel() {},
        })
    }
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus())
    }

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value })
    }

    handleInputConfirm = () => {
        const { inputValue } = this.state
        let { tags } = this.state
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue]
        }
        console.log(tags)
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        })
    }

    saveInputRef = input => (this.input = input)

    render() {
        const { tags, inputVisible, inputValue } = this.state
        return (
            <div className={styles.container}>
                <div className={styles.toalNav}>
                    <NavLink exact className={`${styles.nav} ${styles.active}`} to="/configure">
                        标签设置
                    </NavLink>
                </div>
                <div className={styles.content}>
                    <div className={styles.lable}>企业标签</div>
                    <Tabs
                        onChange={callback}
                        type="card"
                        style={{ marginTop: '15px', marginLeft: '45px' }}
                    >
                        <TabPane tab="行业标签" key="1">
                            <div style={{ display: 'inline-block' }}>
                                <span>标签：</span>
                                <Input.Search
                                    placeholder="请输入标签关键词"
                                    // onSearch={this.searchName}
                                    // onChange={data => this.changeData(data)}
                                    className={styles.search}
                                />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                {!inputVisible && (
                                    <Tag
                                        onClick={this.showInput}
                                        style={{ background: '#fff', borderStyle: 'dashed' }}
                                    >
                                        <Icon type="plus" /> 标签
                                    </Tag>
                                )}
                                {inputVisible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: 100 }}
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                )}
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                {tags.map((tag, index) => {
                                    const isLongTag = tag.length > 20
                                    const tagElem = (
                                        <Tag
                                            key={tag}
                                            closable="true"
                                            onClick={() => this.handleClose(tag, this)}
                                        >
                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                        </Tag>
                                    )
                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    )
                                })}
                            </div>
                        </TabPane>
                        <TabPane tab="资质标签" key="2">
                            <div style={{ display: 'inline-block' }}>
                                <span>标签：</span>
                                <Input.Search
                                    placeholder="请输入标签关键词"
                                    // onSearch={this.searchName}
                                    // onChange={data => this.changeData(data)}
                                    className={styles.search}
                                />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                {!inputVisible && (
                                    <Tag
                                        onClick={this.showInput}
                                        style={{ background: '#fff', borderStyle: 'dashed' }}
                                    >
                                        <Icon type="plus" /> 标签
                                    </Tag>
                                )}
                                {inputVisible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: 100 }}
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                )}
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                {tags.map((tag, index) => {
                                    const isLongTag = tag.length > 20
                                    const tagElem = (
                                        <Tag
                                            key={tag}
                                            closable="true"
                                            // onClose={() => this.handleClose(tag, this)}
                                        >
                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                        </Tag>
                                    )
                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    )
                                })}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
