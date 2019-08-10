import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../Configure.module.css'
import { Card, Tabs, Input, Tag, Tooltip, Icon, Modal } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux/configure'
import { relative } from 'path'

const { TabPane } = Tabs
const { confirm } = Modal

const mapStateToProps = state => {
    return {
        industryList: state.configure.industryList,
        qualityList: state.configure.qualityList,
        addLabelList: state.configure.addLabelList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getLabelList: actions('getLabelList'),
            addLabel: actions('addLabel'),
            updateLabel: actions('updateLabel'),
            deleteLabel: actions('deleteLabel'),
            closeLabelList: actions('closeLabelList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Tags extends PureComponent {
    state = {
        inputVisible: false,
        inputValue: '',
        type: 'industry',
        industryTags: [],
        qualityTags: [],
        butType: '0',
    }
    componentDidMount = () => {
        const type = this.state.type
        this.renderData({ type })
    }
    componentWillReceiveProps = nextProps => {
        if (
            (nextProps.industryList !== this.props.industryList ||
                nextProps.addLabelList !== this.props.addLabelList) &&
            this.state.type === 'industry'
        ) {
            this.setState({ industryTags: nextProps.industryList })
        }
        if (
            (nextProps.qualityList !== this.props.qualityList ||
                nextProps.addLabelList !== this.props.addLabelList) &&
            this.state.type === 'qualification'
        ) {
            this.setState({ qualityTags: nextProps.qualityList })
        }
    }
    renderData = (type, label) => {
        this.props.getLabelList(type, label)
    }

    callback = flag => {
        if (flag === 0) {
            this.setState({ type: 'industry' })
            this.props.closeLabelList()
            this.props.getLabelList({ type: 'industry' })
        } else if (flag === 1) {
            this.setState({ type: 'qualification' })
            this.props.closeLabelList()
            this.props.getLabelList({ type: 'qualification' })
        }
    }

    handleClose = (removedTag, that) => {
        confirm({
            title: '确定删除？',
            content: '标签已关联企业，删除后企业将不具有此标签',
            onOk() {
                that.props.deleteLabel({ id: removedTag.id })
            },
            onCancel() {
                let { industryTags, qualityTags } = that.state
                if (that.state.type === 'industry') {
                    setTimeout(() => {
                        that.setState({ industryTags: [...industryTags, removedTag] })
                    }, 0)
                } else if (that.state.type === 'qualification') {
                    setTimeout(() => {
                        that.setState({ qualityTags: [...qualityTags, removedTag] })
                    }, 0)
                }
            },
        })
    }
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus())
    }

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value })
    }

    handleInputConfirm = () => {
        const { inputValue, type } = this.state
        let { industryTags, qualityTags } = this.state
        if (type === 'industry') {
            if (inputValue && industryTags.indexOf(inputValue) === -1) {
                this.props.addLabel({ type: type, label: inputValue })
            }
            this.setState({
                inputVisible: false,
                inputValue: '',
            })
        } else if (type === 'qualification') {
            if (inputValue && qualityTags.indexOf(inputValue) === -1) {
                this.props.addLabel({ type: type, label: inputValue })
                qualityTags = [...qualityTags, inputValue]
            }
            this.setState({
                inputVisible: false,
                inputValue: '',
            })
        }
    }

    saveInputRef = input => (this.input = input)

    render() {
        const { inputVisible, inputValue, industryTags, qualityTags, butType } = this.state
        return (
            <div className={styles.outerLayer}>
                <div className={styles.labelNav}>企业标签</div>
                <div style={{ display: 'flex' }}>
                    <div
                        onClick={() => {
                            this.setState({ butType: '0' })
                            this.callback(0)
                        }}
                        className={`${styles.industyAndquality} ${
                            butType === '0' ? styles.industyAndqualityActive : null
                        }`}
                    >
                        行业标签
                    </div>
                    <div
                        onClick={() => {
                            this.setState({ butType: '1' })
                            this.callback(1)
                        }}
                        className={`${styles.industyAndquality} ${
                            butType === '1' ? styles.industyAndqualityActive : null
                        }`}
                    >
                        资质标签
                    </div>
                </div>
                <div
                    style={{ display: butType === '0' ? 'block' : 'none' }}
                    className={styles.rectangle}
                >
                    <div style={{ display: 'inline-block' }}>
                        <span className={styles.spanStyle}>标签：</span>
                        <Input.Search
                            placeholder="请输入标签关键词"
                            onSearch={value =>
                                this.renderData({ type: this.state.type, label: value })
                            }
                            className={styles.search}
                        />
                    </div>
                    <div className={styles.labelCont}>
                        {!inputVisible && (
                            <Tag onClick={this.showInput} className={styles.tagLabel}>
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
                        {industryTags.map((tag, index) => {
                            const isLongTag = tag.length > 20
                            const tagElem = (
                                <Tag
                                    className={styles.tagCont}
                                    key={tag.id}
                                    closable="true"
                                    onClose={() => this.handleClose(tag, this)}
                                >
                                    {isLongTag ? `${tag.label.slice(0, 20)}...` : tag.label}
                                </Tag>
                            )
                            return isLongTag ? (
                                <Tooltip title={tag.label} key={tag.id}>
                                    {tagElem}
                                </Tooltip>
                            ) : (
                                tagElem
                            )
                        })}
                    </div>
                </div>
                <div
                    style={{ display: butType === '1' ? 'block' : 'none' }}
                    className={styles.rectangle}
                >
                    <div style={{ display: 'inline-block' }}>
                        <span className={styles.spanStyle}>标签：</span>
                        <Input.Search
                            placeholder="请输入标签关键词"
                            onSearch={value =>
                                this.renderData({ type: this.state.type, label: value })
                            }
                            className={styles.search}
                        />
                    </div>
                    <div className={styles.labelCont}>
                        {!inputVisible && (
                            <Tag onClick={this.showInput} className={styles.tagLabel}>
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
                        {qualityTags.length
                            ? qualityTags.map((tag, index) => {
                                  const isLongTag = tag.length > 20
                                  const tagElem = (
                                      <Tag
                                          className={styles.tagCont}
                                          key={tag.id}
                                          closable="true"
                                          onClose={() => this.handleClose(tag, this)}
                                      >
                                          {isLongTag ? `${tag.label.slice(0, 20)}...` : tag.label}
                                      </Tag>
                                  )
                                  return isLongTag ? (
                                      <Tooltip title={tag.label} key={tag.id}>
                                          {tagElem}
                                      </Tooltip>
                                  ) : (
                                      tagElem
                                  )
                              })
                            : null}
                    </div>
                </div>
            </div>
        )
    }
}
export default Tags
