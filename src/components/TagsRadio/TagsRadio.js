import React from 'react'
import { Tag } from 'antd'

const { CheckableTag } = Tag

export default class TagsRadio extends React.Component {
    state = {
        selectedTags: ['all'],
    }
    static getDerivedStateFromProps(props, state) {
        const { tags } = props
        if (tags !== state.tags) {
            return {
                tags,
            }
        }
        return null
    }
    handleChange(tag, checked) {
        const { selectedTags } = this.state
        const { onChange } = this.props
        if (checked) {
            if (tag.value === 'all') {
                if (onChange) onChange(['all'])
                this.setState({
                    selectedTags: ['all'],
                })
            } else {
                const nextSelectedTags = [...selectedTags, tag.value].filter(t => t !== 'all')
                if (onChange) onChange(nextSelectedTags)
                this.setState({ selectedTags: nextSelectedTags })
            }
        } else {
            const nextSelectedTags = selectedTags.filter(t => t !== tag.value)
            if (onChange) onChange(nextSelectedTags)
            this.setState({
                selectedTags: nextSelectedTags,
            })
        }
    }
    render() {
        const { selectedTags, tags } = this.state
        return (
            <div>
                <h6 style={{ marginRight: 8, display: 'inline' }}>{this.props.title}：</h6>
                {tags.map(tag => (
                    <CheckableTag
                        key={tag.label}
                        checked={selectedTags.includes(tag.value)}
                        onChange={checked => this.handleChange(tag, checked)}
                    >
                        {tag.label}
                    </CheckableTag>
                ))}
            </div>
        )
    }
}
