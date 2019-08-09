import React, { PureComponent } from 'react'
import { Button, Input, Select } from 'antd'
import styles from './Company.module.css'
const { Option, OptGroup } = Select
export default class SearchChip extends PureComponent {
    state = {
        column: 'name',
    }
    change = column => {
        this.setState({ column })
    }
    changeName = e => {
        this.setState({ name: e.target.value })
    }
    changePerson = e => {
        this.setState({ legal_person_name: e.target.value })
    }
    changeIndustry = e => {
        this.setState({ industry: e.target.value })
    }
    changeTags = tags => {
        this.setState({ tags })
    }
    changeGrade = grade => {
        this.setState({
            grade,
        })
    }
    renderInput = () => {
        const { column, name, person, industry, tags, grade } = this.state
        if (column === 'name') {
            return (
                <Input
                    size="large"
                    placeholder="请输入企业名称"
                    value={name}
                    onChange={this.changeName}
                />
            )
        } else if (column === 'legal_person_name') {
            return (
                <Input
                    size="large"
                    placeholder="请输入法人名称"
                    value={person}
                    onChange={this.changePerson}
                />
            )
        } else if (column === 'industry') {
            return (
                <Input
                    size="large"
                    placeholder="请输入行业名称"
                    value={industry}
                    onChange={this.changeIndustry}
                />
            )
        } else if (column === 'tags') {
            return (
                <Select
                    size="large"
                    placeholder="请选择标签"
                    mode="multiple"
                    value={tags}
                    onChange={this.changeTags}
                >
                    <OptGroup label="行业标签">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </OptGroup>
                    <OptGroup label="资质标签">
                        <Option value="Yiminghe">yiminghe</Option>
                    </OptGroup>
                </Select>
            )
        } else if (column === 'grade') {
            return (
                <Select
                    size="large"
                    placeholder="请选择等级"
                    mode="multiple"
                    value={grade}
                    onChange={this.changeGrade}
                >
                    <Option value="A">A级</Option>
                    <Option value="B">B级</Option>
                    <Option value="C">C级</Option>
                    <Option value="D">D级</Option>
                </Select>
            )
        }
    }
    handleSearch = () => {
        const { column } = this.state
        this.props.onSearch({
            column,
            keyWord: this.state[column],
        })
    }
    render() {
        const { column } = this.state
        return (
            <div className={styles.searchChip}>
                <Select value={column} size="large" style={{ width: 110 }} onChange={this.change}>
                    <Option value="name">查公司</Option>
                    <Option value="legal_person_name">查法人</Option>
                    <Option value="industry">查行业</Option>
                    <Option value="tags">查标签</Option>
                    <Option value="grade">查分级</Option>
                </Select>
                <div className={styles.input}>{this.renderInput()}</div>
                <Button
                    type="primary"
                    icon="search"
                    size="large"
                    style={{ width: '0.8rem' }}
                    onClick={this.handleSearch}
                />
            </div>
        )
    }
}
